import React from 'react';
import { 
  X, 
  Clock, 
  Flame, 
  Star, 
  ChefHat, 
  Heart, 
  Check, 
  ArrowRight, 
  UtensilsCrossed, 
  Globe2,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewRecipe, 
    closeQuickView, 
    openRecipe, 
    openCookingMode, 
    toggleFavorite, 
    isFavorite,
    addIngredientsToShoppingList
  } = useApp();

  if (!quickViewRecipe) return null;

  const favorited = isFavorite(quickViewRecipe.id);

  const handleOpenFull = () => {
    openRecipe(quickViewRecipe);
    closeQuickView();
  };

  const handleStartCooking = () => {
    openCookingMode(quickViewRecipe);
    closeQuickView();
  };

  const handleAddShopping = () => {
    addIngredientsToShoppingList(quickViewRecipe);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50 duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
        onClick={closeQuickView} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-stone-200 z-10 my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/80 backdrop-blur-md text-white hover:bg-stone-900 flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
          aria-label="Close quick view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image and Key Badges */}
          <div className="relative aspect-video md:aspect-auto h-64 md:h-full bg-stone-100 overflow-hidden">
            <img
              src={quickViewRecipe.image}
              alt={quickViewRecipe.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-stone-950/20" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs z-10">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 font-bold backdrop-blur-md">
                {quickViewRecipe.cuisine}
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-900/80 backdrop-blur-md font-semibold">
                {quickViewRecipe.dietaryType}
              </span>
            </div>
          </div>

          {/* Right Column: Recipe Snapshot Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            
            <div>
              {/* Rating and Reviews */}
              <div className="flex items-center gap-2 text-xs mb-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-bold text-stone-900">{quickViewRecipe.rating.toFixed(1)}</span>
                </div>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500 font-medium">{quickViewRecipe.reviewsCount} reviews</span>
                <span className="text-stone-400">•</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                  {quickViewRecipe.difficulty}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Outfit',sans-serif] leading-snug">
                {quickViewRecipe.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                {quickViewRecipe.description}
              </p>

              {/* Quick Info Grid */}
              <div className="mt-5 grid grid-cols-3 gap-2 bg-stone-50 p-3 rounded-2xl border border-stone-100 text-center">
                <div className="p-1">
                  <span className="text-[11px] text-stone-400 font-medium block">Total Time</span>
                  <strong className="text-xs sm:text-sm font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {quickViewRecipe.totalTime}m
                  </strong>
                </div>
                <div className="p-1 border-x border-stone-200">
                  <span className="text-[11px] text-stone-400 font-medium block">Servings</span>
                  <strong className="text-xs sm:text-sm font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    {quickViewRecipe.servings}
                  </strong>
                </div>
                <div className="p-1">
                  <span className="text-[11px] text-stone-400 font-medium block">Calories</span>
                  <strong className="text-xs sm:text-sm font-bold text-stone-800 flex items-center justify-center gap-1 mt-0.5">
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    {quickViewRecipe.calories}
                  </strong>
                </div>
              </div>

              {/* Ingredients Quick Glance */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Ingredients ({quickViewRecipe.ingredients.length})
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddShopping}
                    className="text-[11px] font-semibold text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    + Add to Shopping List
                  </button>
                </div>
                <ul className="space-y-1 text-xs text-stone-700 max-h-32 overflow-y-auto pr-1">
                  {quickViewRecipe.ingredients.slice(0, 6).map((ing) => (
                    <li key={ing.id} className="flex items-center justify-between py-1 border-b border-stone-100">
                      <span>• {ing.name}</span>
                      <span className="font-semibold text-stone-900">{ing.quantity} {ing.unit}</span>
                    </li>
                  ))}
                  {quickViewRecipe.ingredients.length > 6 && (
                    <li className="text-stone-400 italic pt-1 text-[11px]">
                      + {quickViewRecipe.ingredients.length - 6} more ingredients...
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartCooking}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>Start Cooking Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorite(quickViewRecipe.id)}
                  className={`p-3 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                    favorited
                      ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-[0_0_10px_rgba(244,63,94,0.3)] animate-heart-pop'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-rose-50/50'
                  }`}
                  title="Favorite Recipe"
                >
                  <Heart className={`w-4 h-4 transition-transform duration-200 ${favorited ? 'fill-rose-600 scale-110' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleOpenFull}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition-all duration-200 hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>View Full Page & Nutrition</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
