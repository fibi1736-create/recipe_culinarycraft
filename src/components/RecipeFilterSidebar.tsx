import React from 'react';
import { 
  Filter, 
  X, 
  RotateCcw, 
  Clock, 
  Sparkles, 
  ChefHat, 
  Leaf, 
  Globe2, 
  Flame, 
  Star 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  FOOD_TYPES_DATA, 
  DIETARY_CATEGORIES_DATA, 
  PROTEIN_CATEGORIES_DATA, 
  CUISINES_DATA, 
  EXTRA_DIETARY_DATA 
} from '../data/categories';
import { 
  FoodType, 
  DietaryType, 
  ExtraDietary, 
  ProteinCategory, 
  CuisineType, 
  DifficultyLevel 
} from '../types';

interface RecipeFilterSidebarProps {
  onCloseMobile?: () => void;
}

export const RecipeFilterSidebar: React.FC<RecipeFilterSidebarProps> = ({ onCloseMobile }) => {
  const { filterState, setFilterState, resetFilters } = useApp();

  const toggleFoodType = (type: FoodType) => {
    setFilterState(prev => ({
      ...prev,
      foodTypes: prev.foodTypes.includes(type)
        ? prev.foodTypes.filter(t => t !== type)
        : [...prev.foodTypes, type]
    }));
  };

  const toggleDietary = (type: DietaryType) => {
    setFilterState(prev => ({
      ...prev,
      dietary: prev.dietary.includes(type)
        ? prev.dietary.filter(t => t !== type)
        : [...prev.dietary, type]
    }));
  };

  const toggleExtraDietary = (type: ExtraDietary) => {
    setFilterState(prev => ({
      ...prev,
      extraDietary: prev.extraDietary.includes(type)
        ? prev.extraDietary.filter(t => t !== type)
        : [...prev.extraDietary, type]
    }));
  };

  const toggleProtein = (type: ProteinCategory) => {
    setFilterState(prev => ({
      ...prev,
      proteins: prev.proteins.includes(type)
        ? prev.proteins.filter(t => t !== type)
        : [...prev.proteins, type]
    }));
  };

  const toggleCuisine = (type: CuisineType) => {
    setFilterState(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(type)
        ? prev.cuisines.filter(t => t !== type)
        : [...prev.cuisines, type]
    }));
  };

  const toggleDifficulty = (level: DifficultyLevel) => {
    setFilterState(prev => ({
      ...prev,
      difficulty: prev.difficulty.includes(level)
        ? prev.difficulty.filter(l => l !== level)
        : [...prev.difficulty, level]
    }));
  };

  const setMaxTime = (time: number | null) => {
    setFilterState(prev => ({
      ...prev,
      maxTime: prev.maxTime === time ? null : time
    }));
  };

  const setMinRating = (rating: number | null) => {
    setFilterState(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? null : rating
    }));
  };

  const hasActiveFilters = 
    filterState.foodTypes.length > 0 ||
    filterState.dietary.length > 0 ||
    filterState.extraDietary.length > 0 ||
    filterState.proteins.length > 0 ||
    filterState.cuisines.length > 0 ||
    filterState.difficulty.length > 0 ||
    filterState.maxTime !== null ||
    filterState.minRating !== null ||
    Boolean(filterState.searchQuery);

  return (
    <aside id="recipe-filter-sidebar" className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm space-y-6">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 font-bold text-stone-900 text-base font-['Outfit',sans-serif]">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filter Recipes</span>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All</span>
            </button>
          )}

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Dietary Type Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5 flex items-center gap-1.5">
          <Leaf className="w-3.5 h-3.5 text-emerald-500" />
          <span>Dietary Type</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DIETARY_CATEGORIES_DATA.map((diet) => {
            const isSelected = filterState.dietary.includes(diet.type);
            return (
              <button
                key={diet.type}
                onClick={() => toggleDietary(diet.type)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                  isSelected
                    ? `${diet.bg} ${diet.color} ${diet.border} font-bold shadow-sm`
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{diet.badge}</span>
                {isSelected && <span className="text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Cooking Time Filter */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Max Cooking Time</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Under 15m', val: 15 },
            { label: 'Under 30m', val: 30 },
            { label: 'Under 45m', val: 45 },
            { label: 'Under 1 hour', val: 60 },
          ].map((t) => {
            const isSelected = filterState.maxTime === t.val;
            return (
              <button
                key={t.val}
                onClick={() => setMaxTime(t.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Difficulty Level */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5 flex items-center gap-1.5">
          <ChefHat className="w-3.5 h-3.5 text-orange-500" />
          <span>Difficulty</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Easy', 'Medium', 'Hard'] as DifficultyLevel[]).map((diff) => {
            const isSelected = filterState.difficulty.includes(diff);
            return (
              <button
                key={diff}
                onClick={() => toggleDifficulty(diff)}
                className={`py-1.5 text-center rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {diff}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Lifestyle / Extra Dietary */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
          Lifestyle & Health
        </label>
        <div className="flex flex-wrap gap-1.5">
          {EXTRA_DIETARY_DATA.map((item) => {
            const isSelected = filterState.extraDietary.includes(item.type);
            return (
              <button
                key={item.type}
                onClick={() => toggleExtraDietary(item.type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 font-semibold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Food Type Category */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
          Food Types / Courses
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {FOOD_TYPES_DATA.map((food) => {
            const isSelected = filterState.foodTypes.includes(food.type);
            return (
              <button
                key={food.type}
                onClick={() => toggleFoodType(food.type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{food.icon}</span>
                <span>{food.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Main Protein / Ingredient */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          <span>Key Proteins & Ingredients</span>
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
          {PROTEIN_CATEGORIES_DATA.map((item) => {
            const isSelected = filterState.proteins.includes(item.type);
            return (
              <button
                key={item.type}
                onClick={() => toggleProtein(item.type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. International Cuisines */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5 flex items-center gap-1.5">
          <Globe2 className="w-3.5 h-3.5 text-indigo-500" />
          <span>Cuisines</span>
        </label>
        <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
          {CUISINES_DATA.map((cuisine) => {
            const isSelected = filterState.cuisines.includes(cuisine.type);
            return (
              <button
                key={cuisine.type}
                onClick={() => toggleCuisine(cuisine.type)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>{cuisine.flag}</span>
                <span>{cuisine.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Minimum Rating */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Minimum Rating</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '4.5+ ★★★★★', val: 4.5 },
            { label: '4.8+ Top Rated', val: 4.8 },
          ].map((r) => {
            const isSelected = filterState.minRating === r.val;
            return (
              <button
                key={r.val}
                onClick={() => setMinRating(r.val)}
                className={`py-1.5 px-2 text-center rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
