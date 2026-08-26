import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  X, 
  ChefHat, 
  Flame, 
  Star, 
  Clock, 
  ArrowUpDown, 
  Search, 
  RotateCcw 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';
import { RecipeFilterSidebar } from './RecipeFilterSidebar';
import { Recipe } from '../types';

interface RecipeGridProps {
  title?: string;
  subtitle?: string;
  forcedFilterCategory?: string;
  initialSort?: 'popular' | 'rating' | 'newest' | 'quickest';
  showSidebar?: boolean;
}

export const RecipeGrid: React.FC<RecipeGridProps> = ({
  title = 'Explore Discoveries',
  subtitle = 'Find your next favorite culinary adventure',
  showSidebar = true
}) => {
  const { 
    recipes, 
    filterState, 
    setFilterState, 
    resetFilters 
  } = useApp();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and Sort Engine
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search query matching: title, description, ingredients, cuisine, tags
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(q);
        const matchesDesc = recipe.description.toLowerCase().includes(q);
        const matchesCuisine = recipe.cuisine.toLowerCase().includes(q);
        const matchesTags = recipe.tags.some(t => t.toLowerCase().includes(q));
        const matchesIngredients = recipe.ingredients.some(i => i.name.toLowerCase().includes(q));
        const matchesFoodType = recipe.foodTypes.some(f => f.toLowerCase().includes(q));
        const matchesDiet = recipe.dietaryType.toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesCuisine && !matchesTags && !matchesIngredients && !matchesFoodType && !matchesDiet) {
          return false;
        }
      }

      // Dietary match (OR within dietary if multiple, e.g. Vegan OR Vegetarian)
      if (filterState.dietary.length > 0) {
        if (!filterState.dietary.includes(recipe.dietaryType)) {
          return false;
        }
      }

      // Extra Dietary match (AND condition)
      if (filterState.extraDietary.length > 0) {
        const matchesAllExtra = filterState.extraDietary.every(extra => recipe.extraDietary.includes(extra));
        if (!matchesAllExtra) return false;
      }

      // Food type match (OR condition)
      if (filterState.foodTypes.length > 0) {
        const matchesAnyFood = filterState.foodTypes.some(type => recipe.foodTypes.includes(type));
        if (!matchesAnyFood) return false;
      }

      // Protein match
      if (filterState.proteins.length > 0) {
        const matchesAnyProtein = filterState.proteins.some(p => recipe.proteins.includes(p));
        if (!matchesAnyProtein) return false;
      }

      // Beverages match
      if (filterState.beverages.length > 0) {
        if (!recipe.beverageCategory || !filterState.beverages.includes(recipe.beverageCategory)) {
          return false;
        }
      }

      // Cuisine match
      if (filterState.cuisines.length > 0) {
        if (!filterState.cuisines.includes(recipe.cuisine)) {
          return false;
        }
      }

      // Max total cooking time match
      if (filterState.maxTime !== null) {
        if (recipe.totalTime > filterState.maxTime) {
          return false;
        }
      }

      // Difficulty match
      if (filterState.difficulty.length > 0) {
        if (!filterState.difficulty.includes(recipe.difficulty)) {
          return false;
        }
      }

      // Min Rating match
      if (filterState.minRating !== null) {
        if (recipe.rating < filterState.minRating) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'quickest':
          return a.totalTime - b.totalTime;
        case 'calories-low':
          return a.calories - b.calories;
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'popular':
        default:
          return b.reviewsCount - a.reviewsCount;
      }
    });
  }, [recipes, filterState]);

  // Remove individual active filter pills
  const removeFilterTag = (type: string, val: any) => {
    switch (type) {
      case 'dietary':
        setFilterState(prev => ({ ...prev, dietary: prev.dietary.filter(d => d !== val) }));
        break;
      case 'extraDietary':
        setFilterState(prev => ({ ...prev, extraDietary: prev.extraDietary.filter(d => d !== val) }));
        break;
      case 'foodTypes':
        setFilterState(prev => ({ ...prev, foodTypes: prev.foodTypes.filter(d => d !== val) }));
        break;
      case 'proteins':
        setFilterState(prev => ({ ...prev, proteins: prev.proteins.filter(d => d !== val) }));
        break;
      case 'cuisines':
        setFilterState(prev => ({ ...prev, cuisines: prev.cuisines.filter(d => d !== val) }));
        break;
      case 'difficulty':
        setFilterState(prev => ({ ...prev, difficulty: prev.difficulty.filter(d => d !== val) }));
        break;
      case 'maxTime':
        setFilterState(prev => ({ ...prev, maxTime: null }));
        break;
      case 'minRating':
        setFilterState(prev => ({ ...prev, minRating: null }));
        break;
      case 'searchQuery':
        setFilterState(prev => ({ ...prev, searchQuery: '' }));
        break;
    }
  };

  const activeFilterCount = 
    filterState.dietary.length +
    filterState.extraDietary.length +
    filterState.foodTypes.length +
    filterState.proteins.length +
    filterState.cuisines.length +
    filterState.difficulty.length +
    (filterState.maxTime !== null ? 1 : 0) +
    (filterState.minRating !== null ? 1 : 0) +
    (filterState.searchQuery ? 1 : 0);

  return (
    <div id="recipe-catalog-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header & Sort Control */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
            {title}
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Showing <strong className="text-stone-900 font-bold">{filteredRecipes.length}</strong> of {recipes.length} curated recipes
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Mobile Filter Trigger Button */}
          {showSidebar && (
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-amber-500 text-stone-950 font-bold rounded-full flex items-center justify-center text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-700 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="font-semibold text-stone-500">Sort by:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer pr-2"
            >
              <option value="popular">Most Popular & Reviewed</option>
              <option value="rating">Highest Rated (5.0 ★)</option>
              <option value="quickest">Quickest Cook Time</option>
              <option value="calories-low">Lowest Calories</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap py-4">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1">
            Active Filters:
          </span>

          {filterState.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white text-xs font-medium">
              <span>"{filterState.searchQuery}"</span>
              <button onClick={() => removeFilterTag('searchQuery', null)} className="hover:text-amber-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.dietary.map(d => (
            <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold">
              <span>{d}</span>
              <button onClick={() => removeFilterTag('dietary', d)} className="hover:text-emerald-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filterState.extraDietary.map(e => (
            <span key={e} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-900 border border-green-300 text-xs font-semibold">
              <span>{e}</span>
              <button onClick={() => removeFilterTag('extraDietary', e)} className="hover:text-green-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filterState.foodTypes.map(f => (
            <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
              <span>{f}</span>
              <button onClick={() => removeFilterTag('foodTypes', f)} className="hover:text-amber-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filterState.proteins.map(p => (
            <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-300 text-xs font-semibold">
              <span>{p}</span>
              <button onClick={() => removeFilterTag('proteins', p)} className="hover:text-orange-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filterState.cuisines.map(c => (
            <span key={c} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 text-xs font-semibold">
              <span>{c}</span>
              <button onClick={() => removeFilterTag('cuisines', c)} className="hover:text-indigo-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filterState.maxTime !== null && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-200 text-stone-900 text-xs font-semibold">
              <span>Under {filterState.maxTime}m</span>
              <button onClick={() => removeFilterTag('maxTime', null)} className="hover:text-amber-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filterState.minRating !== null && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-stone-950 text-xs font-semibold">
              <span>{filterState.minRating}+ Stars</span>
              <button onClick={() => removeFilterTag('minRating', null)} className="hover:text-amber-800">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-xs text-amber-600 font-bold hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sticky Sidebar */}
        {showSidebar && (
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <RecipeFilterSidebar />
            </div>
          </div>
        )}

        {/* Recipe Cards Grid */}
        <div className={showSidebar ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif]">
                No matching recipes found
              </h3>
              <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
                We couldn't find any recipes matching your combination of filters. Try relaxing your dietary or time criteria.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-all flex items-center gap-2 shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs sm:max-w-md bg-white h-full overflow-y-auto p-4 shadow-2xl z-10">
            <RecipeFilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}

    </div>
  );
};
