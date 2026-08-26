import React, { useState } from 'react';
import { 
  Clock, 
  Flame, 
  Users, 
  ChefHat, 
  Star, 
  Heart, 
  Share2, 
  Printer, 
  Check, 
  ShoppingBag, 
  Timer as TimerIcon, 
  Play, 
  Sparkles, 
  ArrowLeft, 
  Globe2, 
  Leaf, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Minus,
  RotateCcw,
  Copy
} from 'lucide-react';
import { Recipe, Ingredient } from '../types';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';
import { IngredientSubstituteModal } from './IngredientSubstituteModal';
import { NutritionBreakdown } from './NutritionBreakdown';
import { SuggestedVariations } from './SuggestedVariations';
import { RecipeReviewsSection } from './RecipeReviewsSection';

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const { 
    setActiveView, 
    openCookingMode, 
    toggleFavorite, 
    isFavorite,
    addIngredientsToShoppingList,
    startTimer,
    recipes,
    collections,
    addRecipeToCollection
  } = useApp();

  const [currentServings, setCurrentServings] = useState<number>(recipe.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedShoppingToast, setAddedShoppingToast] = useState(false);
  const [showCollectionPicker, setShowCollectionPicker] = useState(false);
  const [substituteModalOpen, setSubstituteModalOpen] = useState(false);
  const [substituteTargetIngredient, setSubstituteTargetIngredient] = useState<Ingredient | null>(null);

  const favorited = isFavorite(recipe.id);
  const servingsScale = currentServings / (recipe.servings || 1);

  // Toggle individual step completed
  const toggleStepCompleted = (stepNum: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const totalStepsCount = recipe.instructions.length;
  const stepsProgressPercent = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;
  const allStepsDone = completedStepsCount === totalStepsCount && totalStepsCount > 0;

  // Open substitution modal for a specific ingredient
  const handleOpenSubstitute = (ing?: Ingredient) => {
    setSubstituteTargetIngredient(ing || recipe.ingredients[0] || null);
    setSubstituteModalOpen(true);
  };

  // Toggle individual ingredient checklist
  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Format scaled quantity nicely
  const formatQuantity = (baseQty: number): string => {
    const scaled = baseQty * servingsScale;
    if (scaled <= 0) return '0';
    if (Number.isInteger(scaled)) return scaled.toString();
    if (scaled < 1) {
      if (Math.abs(scaled - 0.5) < 0.05) return '1/2';
      if (Math.abs(scaled - 0.25) < 0.05) return '1/4';
      if (Math.abs(scaled - 0.75) < 0.05) return '3/4';
      if (Math.abs(scaled - 0.33) < 0.05) return '1/3';
    }
    return (Math.round(scaled * 10) / 10).toString();
  };

  const handleAddAllToShopping = () => {
    addIngredientsToShoppingList(recipe, servingsScale);
    setAddedShoppingToast(true);
    setTimeout(() => setAddedShoppingToast(false), 3000);
  };

  // Deep Link Share with fallback
  const handleShare = async () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const shareUrl = `${origin}${pathname}?recipe=${encodeURIComponent(recipe.id)}`;
    
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback input copy
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3500);
    } catch (err) {
      console.warn('Failed to copy share link:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Related recipes by same cuisine or foodType
  const relatedRecipes = recipes
    .filter(r => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.foodTypes.some(f => recipe.foodTypes.includes(f))))
    .slice(0, 3);

  return (
    <article id={`recipe-detail-${recipe.id}`} className="min-h-screen bg-stone-50 pb-20">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-stone-200 py-3 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => setActiveView('recipes')}
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-950 text-xs sm:text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Recipes</span>
          </button>

          {/* Quick Actions Header */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openCookingMode(recipe)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all"
            >
              <ChefHat className="w-4 h-4" />
              <span>Start Cooking Mode</span>
            </button>

            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`p-2 rounded-xl border transition-colors ${
                favorited 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-stone-200 text-stone-600 hover:text-rose-600'
              }`}
              title="Save recipe"
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-600' : ''}`} />
            </button>

            {/* Share Deep Link Button */}
            <div className="relative">
              <button
                id="recipe-share-btn-header"
                onClick={handleShare}
                className={`px-3 py-2 rounded-xl border font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  copiedLink
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-xs'
                    : 'bg-white text-stone-700 hover:text-stone-950 border-stone-200'
                }`}
                title="Copy shareable link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
              title="Print ink-saving recipe card"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Print Recipe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative bg-stone-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src={recipe.heroImage || recipe.image}
            alt={recipe.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
          
          {/* Dietary & Cuisine Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-md">
              {recipe.cuisine} Cuisine
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white backdrop-blur-md">
              {recipe.dietaryType}
            </span>
            {recipe.extraDietary.map(item => (
              <span key={item} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-800/80 text-stone-300 border border-stone-700">
                {item}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit',sans-serif] tracking-tight text-white max-w-4xl leading-tight">
            {recipe.title}
          </h1>

          {/* Short Narrative Description */}
          <p className="mt-4 text-base sm:text-lg text-stone-300 max-w-3xl leading-relaxed">
            {recipe.description}
          </p>

          {/* Author & Meta Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-800/80 text-xs sm:text-sm text-stone-300">
            <div className="flex items-center gap-3">
              <img
                src={recipe.author.avatar}
                alt={recipe.author.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <span className="font-bold text-white block">{recipe.author.name}</span>
                <span className="text-stone-400 text-xs">{recipe.author.role} • {recipe.publishDate}</span>
              </div>
            </div>

            {/* Rating Stars Summary & Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              <div 
                onClick={() => {
                  const el = document.getElementById('recipe-reviews-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 bg-stone-900/80 hover:bg-stone-800/90 px-4 py-2 rounded-2xl border border-stone-800 backdrop-blur-sm cursor-pointer transition-colors"
                title="View reviews & ratings"
              >
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(recipe.rating) ? 'fill-amber-400' : 'text-stone-600'}`} />
                  ))}
                </div>
                <strong className="text-white font-bold">{recipe.rating.toFixed(1)}</strong>
                <span className="text-stone-400">({recipe.reviewsCount} reviews)</span>
              </div>

              {/* Hero Share Button */}
              <button
                id="recipe-share-btn-hero"
                type="button"
                onClick={handleShare}
                className={`px-4 py-2 rounded-2xl font-bold text-xs border backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer ${
                  copiedLink
                    ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-md scale-105'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border-stone-700'
                }`}
                title="Share direct recipe link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-stone-950 stroke-[3]" /> : <Share2 className="w-4 h-4 text-amber-400" />}
                <span>{copiedLink ? 'Copied Link!' : 'Share Recipe'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Visual Quick Specs Cards Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
          
          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Prep Time</span>
            <div className="flex items-center justify-center gap-1.5 text-stone-900 font-bold text-base">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{recipe.prepTime}m</span>
            </div>
          </div>

          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Cook Time</span>
            <div className="flex items-center justify-center gap-1.5 text-stone-900 font-bold text-base">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{recipe.cookTime}m</span>
            </div>
          </div>

          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Total Time</span>
            <div className="flex items-center justify-center gap-1.5 text-stone-900 font-bold text-base">
              <TimerIcon className="w-4 h-4 text-red-500" />
              <span>{recipe.totalTime}m</span>
            </div>
          </div>

          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Servings</span>
            <div className="flex items-center justify-center gap-1.5 text-stone-900 font-bold text-base">
              <Users className="w-4 h-4 text-blue-500" />
              <span>{currentServings}</span>
            </div>
          </div>

          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Calories</span>
            <div className="flex items-center justify-center gap-1.5 text-stone-900 font-bold text-base">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{recipe.calories}</span>
            </div>
          </div>

          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Difficulty</span>
            <span className="inline-block font-bold text-sm px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
              {recipe.difficulty}
            </span>
          </div>

          <div className="p-2 border-r border-stone-100 last:border-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Cuisine</span>
            <span className="font-bold text-stone-800 text-sm">{recipe.cuisine}</span>
          </div>

          <div className="p-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Diet</span>
            <span className="font-bold text-stone-800 text-sm">{recipe.dietaryType}</span>
          </div>

        </div>
      </div>

      {/* Main Two-Column Layout: Ingredients & Instructions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Ingredients Section + Detailed Nutritional Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm">
            
            {/* Ingredients Header & Dynamic Servings Scaler */}
            <div className="pb-5 border-b border-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                    Ingredients
                  </h2>
                  <span className="text-xs text-stone-400 font-medium">
                    {recipe.ingredients.length} items needed
                  </span>
                </div>

                {/* Servings Stepper */}
                <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setCurrentServings(Math.max(1, currentServings - 1))}
                    className="w-7 h-7 rounded-lg bg-white text-stone-800 hover:bg-stone-200 flex items-center justify-center shadow-xs transition-colors"
                    title="Decrease servings"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold px-2 text-stone-900 min-w-14 text-center">
                    {currentServings} {currentServings === 1 ? 'serving' : 'servings'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentServings(currentServings + 1)}
                    className="w-7 h-7 rounded-lg bg-white text-stone-800 hover:bg-stone-200 flex items-center justify-center shadow-xs transition-colors"
                    title="Increase servings"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Shopping + Substitute Ingredient */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleAddAllToShopping}
                  className="w-full py-2.5 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-700" />
                  <span>Add All to Shopping</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenSubstitute()}
                  className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 hover:from-purple-100 hover:to-amber-100 text-purple-950 border border-purple-200/80 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  title="Use Gemini AI to suggest healthy and pantry ingredient alternatives"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Substitute Ingredient</span>
                </button>
              </div>

              {addedShoppingToast && (
                <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-xl flex items-center justify-center gap-1.5 animate-in fade-in-50">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Added {recipe.ingredients.length} items to your shopping list!</span>
                </div>
              )}
            </div>

            {/* Ingredients Checklist */}
            <ul className="mt-4 space-y-2.5">
              {recipe.ingredients.map((ing) => {
                const isChecked = checkedIngredients[ing.id];
                return (
                  <li
                    key={ing.id}
                    className={`group flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                      isChecked 
                        ? 'bg-stone-50 text-stone-400' 
                        : 'hover:bg-stone-50 text-stone-800'
                    }`}
                  >
                    <div 
                      onClick={() => toggleIngredientCheck(ing.id)}
                      className="flex items-start gap-3 flex-1 cursor-pointer"
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-stone-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 text-xs sm:text-sm">
                        <span className={`font-semibold text-stone-900 ${isChecked ? 'line-through text-stone-400' : ''}`}>
                          {formatQuantity(ing.quantity)} {ing.unit}
                        </span>{' '}
                        <span className={isChecked ? 'line-through' : ''}>{ing.name}</span>
                        {ing.notes && (
                          <span className="block text-[11px] text-stone-400 font-normal italic">
                            ({ing.notes})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inline Substitute Pill Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSubstitute(ing);
                      }}
                      className="opacity-80 group-hover:opacity-100 px-2 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 border border-stone-200 text-[11px] font-semibold transition-all flex items-center gap-1 shrink-0 ml-2"
                      title={`Substitute ${ing.name}`}
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Swap</span>
                    </button>
                  </li>
                );
              })}
            </ul>

          </div>

          {/* Detailed Nutritional Breakdown Card */}
          <NutritionBreakdown 
            nutrition={recipe.nutrition} 
            servings={currentServings}
            originalServings={recipe.servings || 4}
          />

        </div>

        {/* Right Column (7 cols): Step-by-Step Cooking Instructions + Suggested Variations */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                  Step-by-Step Instructions
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                  Follow carefully for authentic gourmet results • Track your progress below
                </p>
              </div>

              <button
                type="button"
                onClick={() => openCookingMode(recipe)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
              >
                <ChefHat className="w-4 h-4" />
                <span>Cooking Mode</span>
              </button>
            </div>

            {/* Interactive Step-by-Step Progress Loader Bar */}
            <div className="mt-6 p-4 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">
                    Cooking Progress:
                  </span>
                  <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {completedStepsCount} of {totalStepsCount} steps ({stepsProgressPercent}%)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {completedStepsCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setCompletedSteps({})}
                      className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 underline transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                  {completedStepsCount < totalStepsCount && (
                    <button
                      type="button"
                      onClick={() => {
                        const allDone: Record<number, boolean> = {};
                        recipe.instructions.forEach(s => { allDone[s.stepNumber] = true; });
                        setCompletedSteps(allDone);
                      }}
                      className="text-[11px] font-bold text-amber-700 hover:text-amber-900 transition-colors cursor-pointer"
                    >
                      Mark all done
                    </button>
                  )}
                </div>
              </div>

              {/* Animated Progress Track */}
              <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 transition-all duration-500 ease-smooth"
                  style={{ width: `${stepsProgressPercent}%` }}
                />
              </div>

              {allStepsDone && (
                <div className="pt-1 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 p-2 rounded-xl animate-in fade-in duration-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 animate-bounce" />
                  <span>🎉 Dish completed! Bon appétit & enjoy your meal!</span>
                </div>
              )}
            </div>

            {/* Instruction Steps List with Interactive Checkbox Controls */}
            <div className="mt-6 space-y-4 sm:space-y-5">
              {recipe.instructions.map((step) => {
                const isStepDone = !!completedSteps[step.stepNumber];
                return (
                  <div
                    key={step.stepNumber}
                    id={`instruction-step-${step.stepNumber}`}
                    onClick={() => toggleStepCompleted(step.stepNumber)}
                    className={`group relative flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isStepDone
                        ? 'bg-emerald-50/40 border-emerald-300/70 opacity-80'
                        : 'bg-stone-50/80 border-stone-200/80 hover:border-amber-400/80 hover:bg-amber-50/30 hover:shadow-xs'
                    }`}
                  >
                    {/* Step Number Circle / Checkmark Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStepCompleted(step.stepNumber);
                      }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center shadow-xs shrink-0 transition-all duration-200 ease-spring cursor-pointer font-['Outfit',sans-serif] ${
                        isStepDone
                          ? 'bg-emerald-500 text-white shadow-emerald-500/20 scale-105'
                          : 'bg-amber-500 text-stone-950 hover:scale-105'
                      }`}
                      title={isStepDone ? 'Mark step as incomplete' : 'Mark step as complete'}
                    >
                      {isStepDone ? <Check className="w-5 h-5 stroke-[3]" /> : step.stepNumber}
                    </button>

                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        {step.title ? (
                          <h4 className={`font-bold text-base sm:text-lg font-['Outfit',sans-serif] transition-colors ${
                            isStepDone ? 'line-through text-stone-500' : 'text-stone-900 group-hover:text-amber-800'
                          }`}>
                            {step.title}
                          </h4>
                        ) : (
                          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                            Step {step.stepNumber}
                          </span>
                        )}

                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                          isStepDone 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'text-stone-400 group-hover:text-stone-600'
                        }`}>
                          {isStepDone ? 'Completed' : 'Click to complete'}
                        </span>
                      </div>

                      <p className={`text-sm sm:text-base leading-relaxed transition-colors ${
                        isStepDone ? 'text-stone-500' : 'text-stone-700'
                      }`}>
                        {step.description}
                      </p>

                      {/* Step Timer Quick Trigger Button */}
                      {step.timerMinutes && (
                        <div className="pt-1 flex items-center gap-3 flex-wrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              startTimer(
                                `Step ${step.stepNumber}: ${step.title || recipe.title}`,
                                step.timerMinutes || 5,
                                recipe.id,
                                recipe.title,
                                step.stepNumber
                              );
                            }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 active:scale-95 border border-amber-500/30 text-amber-900 font-bold text-xs transition-all duration-200 shadow-xs cursor-pointer"
                          >
                            <TimerIcon className="w-4 h-4 text-amber-600 animate-spin" />
                            <span>Start {step.timerMinutes}m Timer</span>
                          </button>
                          <span className="text-[11px] text-stone-400 font-medium">
                            Click to track timing in background
                          </span>
                        </div>
                      )}

                      {/* Chef Tip Callout */}
                      {step.tip && (
                        <div className="mt-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold block mb-0.5">Chef's Secret:</strong>
                            <span>{step.tip}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Finished Cooking Bar */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base font-['Outfit',sans-serif] text-white">
                  Ready to start cooking?
                </h4>
                <p className="text-xs text-stone-300 mt-0.5">
                  Launch the full-screen hands-free cooking assistant with voice guidance.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openCookingMode(recipe)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ChefHat className="w-4 h-4" />
                <span>Launch Cooking Mode</span>
              </button>
            </div>

          </div>

          {/* AI Suggested Variations Section (below instructions) */}
          <SuggestedVariations recipe={recipe} />

        </div>

      </div>

      {/* User Reviews & Ratings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <RecipeReviewsSection recipe={recipe} />
      </div>

      {/* Related Recipes Section */}
      {relatedRecipes.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                You May Also Enjoy
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                More culinary inspirations from {recipe.cuisine} cuisine & related courses
              </p>
            </div>
            <button
              onClick={() => setActiveView('recipes')}
              className="text-xs font-bold text-amber-600 hover:text-amber-700"
            >
              View All Recipes →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedRecipes.map((rel) => (
              <RecipeCard key={rel.id} recipe={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Gemini AI Ingredient Substitution Modal */}
      {substituteModalOpen && (
        <IngredientSubstituteModal
          recipeTitle={recipe.title}
          ingredients={recipe.ingredients}
          selectedIngredient={substituteTargetIngredient}
          onClose={() => setSubstituteModalOpen(false)}
        />
      )}

      {/* Copied to Clipboard Notification Toast */}
      {copiedLink && (
        <div 
          id="clipboard-toast"
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-white font-['Outfit',sans-serif]">Copied to clipboard!</h5>
            <p className="text-xs text-stone-300">Direct link to this recipe is ready to share.</p>
          </div>
        </div>
      )}

    </article>
  );
};

