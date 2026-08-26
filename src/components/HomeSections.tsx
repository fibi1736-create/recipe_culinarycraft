import React from 'react';
import { 
  Sparkles, 
  Zap, 
  Flame, 
  ArrowRight, 
  Clock, 
  Award, 
  ChefHat, 
  Utensils 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';

export const HomeSections: React.FC = () => {
  const { recipes, setActiveView, setFilterState, resetFilters } = useApp();

  // Featured Masterpieces
  const featuredRecipes = recipes.filter(r => r.isFeatured).slice(0, 3);
  
  // Quick & Easy (Under 30 minutes)
  const quickRecipes = recipes.filter(r => r.isQuickEasy || r.totalTime <= 30).slice(0, 4);

  // Trending Highest Rated
  const topRatedRecipes = [...recipes].sort((a, b) => b.rating - a.rating).slice(0, 4);

  const handleExploreQuick = () => {
    resetFilters();
    setFilterState(prev => ({ ...prev, maxTime: 30 }));
    setActiveView('recipes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplorePopular = () => {
    resetFilters();
    setFilterState(prev => ({ ...prev, sortBy: 'rating' }));
    setActiveView('recipes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-featured-sections" className="space-y-16 py-12">
      
      {/* 1. Featured Chef's Selection Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Chef's Choice Masterpieces</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
              Featured Recipes of the Week
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Top curated global dishes perfected with step-by-step master techniques
            </p>
          </div>

          <button
            onClick={() => {
              resetFilters();
              setActiveView('recipes');
            }}
            className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 group"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 2. Banner: Quick & Easy Under 30-Minute Dinners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 sm:p-12 text-stone-950 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-repeat bg-center pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/20 text-stone-950 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5 fill-stone-950" />
              <span>Fast, Nutritious & Effortless</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
              Short on Time? Cook Gourmet in Under 30 Minutes
            </h3>
            <p className="mt-3 text-sm sm:text-base font-medium opacity-90 leading-relaxed">
              No need to compromise on flavor when busy. Discover stir-fries, 15-minute pasta dishes, fresh bowls, and rapid pan-seared delights.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={handleExploreQuick}
                className="px-6 py-3 rounded-2xl bg-stone-950 text-white hover:bg-stone-900 font-bold text-xs sm:text-sm transition-transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Show Quick & Easy Recipes</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick & Easy Recipe Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              Quick 30-Minute Dinners & Lunches
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Speedy weeknight meals requiring minimal prep
            </p>
          </div>
          <button
            onClick={handleExploreQuick}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <span>See all {quickRecipes.length}+ quick recipes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 4. Top Rated Dishes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Community Highest Rated</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              5-Star Trending Favorites
            </h3>
          </div>
          <button
            onClick={handleExplorePopular}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            <span>View all top rated</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topRatedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

    </div>
  );
};
