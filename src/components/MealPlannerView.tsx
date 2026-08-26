import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ChefHat, 
  Flame, 
  CheckCircle2, 
  X, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MealPlanDay, Recipe } from '../types';

export const MealPlannerView: React.FC = () => {
  const { 
    mealPlan, 
    recipes, 
    addMealToPlan, 
    removeMealFromPlan, 
    generateShoppingListFromMealPlan,
    clearMealPlan,
    openRecipe,
    setActiveView
  } = useApp();

  const [pickerModal, setPickerModal] = useState<{
    day: MealPlanDay['day'];
    slot: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  } | null>(null);

  const [generatedShoppingToast, setGeneratedShoppingToast] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const daysOfWeek: MealPlanDay['day'][] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handleOpenPicker = (day: MealPlanDay['day'], slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setPickerModal({ day, slot });
    setSearchTerm('');
  };

  const handleSelectRecipe = (recipeId: string) => {
    if (pickerModal) {
      addMealToPlan(pickerModal.day, pickerModal.slot, recipeId);
      setPickerModal(null);
    }
  };

  const handleGenerateShopping = () => {
    generateShoppingListFromMealPlan();
    setGeneratedShoppingToast(true);
    setTimeout(() => setGeneratedShoppingToast(false), 3500);
  };

  // Filter recipes inside the picker modal
  const filteredPickerRecipes = recipes.filter(r => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return r.title.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q) || r.foodTypes.some(f => f.toLowerCase().includes(q));
  });

  // Calculate total weekly meals planned
  const totalMealsPlanned = mealPlan.reduce((acc, d) => {
    return acc + (d.breakfast ? 1 : 0) + (d.lunch ? 1 : 0) + (d.dinner ? 1 : 0) + (d.snack ? 1 : 0);
  }, 0);

  return (
    <div id="meal-planner-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <CalendarIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>Weekly Culinary Schedule</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
            Weekly Meal Planner
          </h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Organize breakfast, lunch, dinner, and snacks for the week and auto-generate your grocery list.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleGenerateShopping}
            disabled={totalMealsPlanned === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all ${
              totalMealsPlanned === 0
                ? 'opacity-40 cursor-not-allowed bg-stone-200 text-stone-500'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 shadow-amber-500/20'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Generate Week Grocery List</span>
          </button>

          {totalMealsPlanned > 0 && (
            <button
              type="button"
              onClick={clearMealPlan}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 text-xs font-semibold transition-colors"
              title="Clear all weekly meals"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Generated Shopping Toast */}
      {generatedShoppingToast && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between animate-in fade-in-50">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>All ingredients for your {totalMealsPlanned} planned meals have been consolidated into your Shopping List!</span>
          </div>
          <button
            onClick={() => setActiveView('shopping')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shrink-0"
          >
            Open Shopping List →
          </button>
        </div>
      )}

      {/* 7-Day Interactive Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {daysOfWeek.map((dayName) => {
          const dayPlan = mealPlan.find(d => d.day === dayName) || { day: dayName };

          // Find recipes for each slot
          const breakfastRecipe = recipes.find(r => r.id === dayPlan.breakfast);
          const lunchRecipe = recipes.find(r => r.id === dayPlan.lunch);
          const dinnerRecipe = recipes.find(r => r.id === dayPlan.dinner);
          const snackRecipe = recipes.find(r => r.id === dayPlan.snack);

          // Daily estimated calories
          const dayCalories = 
            (breakfastRecipe?.calories || 0) +
            (lunchRecipe?.calories || 0) +
            (dinnerRecipe?.calories || 0) +
            (snackRecipe?.calories || 0);

          return (
            <div 
              key={dayName}
              className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex flex-col justify-between"
            >
              {/* Day Header */}
              <div className="pb-3 border-b border-stone-100 mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base font-['Outfit',sans-serif] text-stone-900">
                    {dayName}
                  </h3>
                  {dayCalories > 0 && (
                    <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                      <Flame className="w-3 h-3" /> {dayCalories} kcal
                    </span>
                  )}
                </div>
              </div>

              {/* 4 Meal Slots */}
              <div className="space-y-2.5 flex-1">
                
                {/* 1. Breakfast Slot */}
                <MealSlotCard
                  label="Breakfast"
                  recipe={breakfastRecipe}
                  onAdd={() => handleOpenPicker(dayName, 'breakfast')}
                  onRemove={() => removeMealFromPlan(dayName, 'breakfast')}
                  onViewRecipe={() => breakfastRecipe && openRecipe(breakfastRecipe)}
                />

                {/* 2. Lunch Slot */}
                <MealSlotCard
                  label="Lunch"
                  recipe={lunchRecipe}
                  onAdd={() => handleOpenPicker(dayName, 'lunch')}
                  onRemove={() => removeMealFromPlan(dayName, 'lunch')}
                  onViewRecipe={() => lunchRecipe && openRecipe(lunchRecipe)}
                />

                {/* 3. Dinner Slot */}
                <MealSlotCard
                  label="Dinner"
                  recipe={dinnerRecipe}
                  onAdd={() => handleOpenPicker(dayName, 'dinner')}
                  onRemove={() => removeMealFromPlan(dayName, 'dinner')}
                  onViewRecipe={() => dinnerRecipe && openRecipe(dinnerRecipe)}
                />

                {/* 4. Snack Slot */}
                <MealSlotCard
                  label="Snack"
                  recipe={snackRecipe}
                  onAdd={() => handleOpenPicker(dayName, 'snack')}
                  onRemove={() => removeMealFromPlan(dayName, 'snack')}
                  onViewRecipe={() => snackRecipe && openRecipe(snackRecipe)}
                />

              </div>
            </div>
          );
        })}
      </div>

      {/* Recipe Picker Modal */}
      {pickerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50">
          <div 
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setPickerModal(null)} 
          />

          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 z-10 p-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-stone-900">
                  Select {pickerModal.slot.toUpperCase()} for {pickerModal.day}
                </h3>
                <span className="text-xs text-stone-500">
                  Choose from your curated master recipe catalog
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPickerModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipe by name, ingredient, or cuisine..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-sm bg-stone-50"
              />
            </div>

            {/* Recipes Selection List */}
            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {filteredPickerRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe.id)}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 group-hover:text-amber-600 transition-colors">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <span>{recipe.cuisine}</span>
                        <span>•</span>
                        <span>{recipe.totalTime}m</span>
                        <span>•</span>
                        <span>{recipe.calories} kcal</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-xl bg-stone-100 group-hover:bg-amber-500 text-stone-800 group-hover:text-stone-950 font-bold text-xs transition-colors"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

interface MealSlotCardProps {
  label: string;
  recipe?: Recipe;
  onAdd: () => void;
  onRemove: () => void;
  onViewRecipe: () => void;
}

const MealSlotCard: React.FC<MealSlotCardProps> = ({
  label,
  recipe,
  onAdd,
  onRemove,
  onViewRecipe
}) => {
  if (!recipe) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="w-full p-2.5 rounded-xl border border-dashed border-stone-200 hover:border-amber-400 hover:bg-amber-50/30 text-stone-400 hover:text-amber-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-left group"
      >
        <Plus className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
        <span>+ {label}</span>
      </button>
    );
  }

  return (
    <div className="relative group rounded-xl p-2 bg-stone-50 border border-stone-200 hover:border-amber-400 transition-all flex items-center justify-between gap-2">
      <div 
        onClick={onViewRecipe} 
        className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
        title="View recipe details"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-lg object-cover shrink-0"
        />
        <div className="min-w-0">
          <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 block">
            {label}
          </span>
          <h5 className="font-bold text-xs text-stone-900 truncate group-hover:text-amber-600 transition-colors">
            {recipe.title}
          </h5>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="p-1 text-stone-400 hover:text-rose-600 transition-colors shrink-0"
        title="Remove meal"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
