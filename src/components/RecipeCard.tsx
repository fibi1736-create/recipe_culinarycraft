import React, { useState } from 'react';
import { 
  Clock, 
  Flame, 
  Star, 
  Eye, 
  Heart, 
  Sparkles, 
  Globe, 
  ChefHat,
  Bookmark,
  Check
} from 'lucide-react';
import { Recipe } from '../types';
import { useApp } from '../context/AppContext';

interface RecipeCardProps {
  recipe: Recipe;
  showCollectionAdd?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { 
    openRecipe, 
    openQuickView, 
    toggleFavorite, 
    isFavorite,
    setFilterState,
    resetFilters,
    setActiveView
  } = useApp();

  const [justFavorited, setJustFavorited] = useState(false);
  const favorited = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
    if (!favorited) {
      setJustFavorited(true);
      setTimeout(() => setJustFavorited(false), 600);
    }
  };

  const handleDietaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetFilters();
    setFilterState(prev => ({ ...prev, dietary: [recipe.dietaryType] }));
    setActiveView('recipes');
    setTimeout(() => {
      const el = document.getElementById('recipe-catalog-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleCuisineClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetFilters();
    setFilterState(prev => ({ ...prev, cuisines: [recipe.cuisine] }));
    setActiveView('recipes');
    setTimeout(() => {
      const el = document.getElementById('recipe-catalog-container');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Dietary badge styling
  const getDietaryBadge = () => {
    switch (recipe.dietaryType) {
      case 'Vegan':
        return {
          label: 'Vegan',
          badge: '🟢 Vegan',
          bg: 'bg-emerald-500/90 text-white hover:bg-emerald-600',
          dot: 'bg-emerald-400'
        };
      case 'Vegetarian':
        return {
          label: 'Vegetarian',
          badge: '🟢 Vegetarian',
          bg: 'bg-green-600/90 text-white hover:bg-green-700',
          dot: 'bg-green-400'
        };
      case 'Non-Vegetarian':
        return {
          label: 'Non-Vegetarian',
          badge: '🔴 Non-Veg',
          bg: 'bg-rose-600/90 text-white hover:bg-rose-700',
          dot: 'bg-rose-400'
        };
      case 'Seafood':
        return {
          label: 'Seafood',
          badge: '🔵 Seafood',
          bg: 'bg-sky-600/90 text-white hover:bg-sky-700',
          dot: 'bg-sky-400'
        };
      default:
        return {
          label: recipe.dietaryType,
          badge: recipe.dietaryType,
          bg: 'bg-stone-700 text-white hover:bg-stone-800',
          dot: 'bg-stone-400'
        };
    }
  };

  const dietary = getDietaryBadge();

  // Difficulty badge colors
  const getDifficultyColor = () => {
    switch (recipe.difficulty) {
      case 'Easy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Medium':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Hard':
        return 'text-rose-700 bg-rose-50 border-rose-200';
    }
  };

  return (
    <div
      id={`recipe-card-${recipe.id}`}
      onClick={() => openRecipe(recipe)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 ease-smooth flex flex-col justify-between cursor-pointer select-none"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80';
          }}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-smooth"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Dietary Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <button
            type="button"
            onClick={handleDietaryClick}
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide backdrop-blur-md shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${dietary.bg}`}
            title={`Filter by ${recipe.dietaryType}`}
          >
            {dietary.badge}
          </button>
          {recipe.isQuickEasy && (
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-stone-950 shadow-sm backdrop-blur-sm">
              ⚡ &lt;30m
            </span>
          )}
        </div>

        {/* Action Buttons (Top Right) */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Quick View Button */}
          <button
            type="button"
            id={`quick-view-btn-${recipe.id}`}
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(recipe);
            }}
            className="w-9 h-9 rounded-full bg-stone-900/80 backdrop-blur-md text-stone-200 hover:text-amber-400 hover:bg-stone-900 flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110 active:scale-90"
            title="Quick Preview"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Favorite Heart Button with Pop Micro-Interaction */}
          <button
            type="button"
            id={`favorite-btn-${recipe.id}`}
            onClick={handleFavoriteClick}
            className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-md hover:scale-115 active:scale-90 cursor-pointer ${
              favorited
                ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                : 'bg-stone-900/80 text-stone-200 hover:text-rose-400 hover:bg-stone-900'
            } ${justFavorited ? 'animate-heart-pop' : ''}`}
            title={favorited ? 'Remove from favorites' : 'Save to favorites'}
          >
            <Heart className={`w-4 h-4 transition-transform duration-200 ${favorited ? 'fill-white scale-110' : ''}`} />
          </button>
        </div>

        {/* Bottom Banner on Image (Cuisine & Cook Time) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-200 z-10">
          <button
            type="button"
            onClick={handleCuisineClick}
            className="inline-flex items-center gap-1 font-semibold bg-stone-900/80 hover:bg-amber-400 hover:text-stone-950 backdrop-blur-sm px-2.5 py-1 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            title={`Filter by ${recipe.cuisine} cuisine`}
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{recipe.cuisine}</span>
          </button>
          <span className="inline-flex items-center gap-1 font-semibold bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded-xl">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{recipe.totalTime} min total</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Rating & Review Count */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(recipe.rating) 
                        ? 'fill-amber-400 text-amber-400' 
                        : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-stone-800 font-semibold">{recipe.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal">({recipe.reviewsCount})</span>
            </div>

            {/* Difficulty Badge */}
            <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${getDifficultyColor()}`}>
              {recipe.difficulty}
            </span>
          </div>

          {/* Recipe Title */}
          <h3 
            onClick={() => openRecipe(recipe)}
            className="font-['Outfit',sans-serif] text-lg font-bold text-stone-900 group-hover:text-amber-600 transition-colors duration-200 line-clamp-1 cursor-pointer"
          >
            {recipe.title}
          </h3>

          {/* Short Description */}
          <p className="mt-1 text-xs sm:text-sm text-stone-500 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Footer Meta & Stats */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-3">
            <span title="Preparation & Cooking time">
              Prep: <strong className="text-stone-700 font-semibold">{recipe.prepTime}m</strong> • Cook: <strong className="text-stone-700 font-semibold">{recipe.cookTime}m</strong>
            </span>
          </div>

          <div className="flex items-center gap-1 text-stone-700 font-medium bg-stone-100 px-2.5 py-1 rounded-lg">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>{recipe.calories} kcal</span>
          </div>
        </div>

        {/* View Recipe Button with Micro-Interaction */}
        <button
          type="button"
          onClick={() => openRecipe(recipe)}
          className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-800 font-bold text-xs transition-all duration-200 ease-smooth flex items-center justify-center gap-1.5 group/btn shadow-xs hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)] active:scale-98 cursor-pointer"
        >
          <span>View Full Recipe</span>
          <ChefHat className="w-3.5 h-3.5 text-stone-500 group-hover/btn:text-stone-950 group-hover/btn:translate-x-0.5 transition-all" />
        </button>

      </div>
    </div>
  );
};
