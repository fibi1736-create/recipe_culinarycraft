import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  RotateCcw, 
  Check, 
  ShoppingBag, 
  Leaf, 
  ChefHat, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Ingredient, Recipe, SubstitutionResponse } from '../types';
import { useApp } from '../context/AppContext';

interface IngredientSubstituteModalProps {
  recipe: Recipe;
  initialIngredient?: Ingredient | null;
  onClose: () => void;
}

export const IngredientSubstituteModal: React.FC<IngredientSubstituteModalProps> = ({
  recipe,
  initialIngredient,
  onClose,
}) => {
  const { addCustomShoppingItem } = useApp();

  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>(
    initialIngredient || recipe.ingredients[0]
  );
  const [dietaryFocus, setDietaryFocus] = useState<string>('Any');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SubstitutionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const dietaryOptions = [
    { label: 'All Smart Swaps', value: 'Any' },
    { label: 'Healthy & Low Calorie', value: 'Healthy & Low Calorie' },
    { label: 'Pantry Common Items', value: 'Common Kitchen Pantry Alternatives' },
    { label: 'Vegan / Dairy-Free', value: 'Vegan and Dairy-Free alternatives' },
    { label: 'Gluten-Free', value: 'Gluten-Free swaps' },
  ];

  const fetchSubstitutions = async (ing: Ingredient, focus: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/substitutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredientName: ing.name,
          recipeTitle: recipe.title,
          currentQuantity: ing.quantity,
          currentUnit: ing.unit,
          dietaryPreference: focus !== 'Any' ? focus : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const result: SubstitutionResponse = await response.json();
      setData(result);
    } catch (err: any) {
      console.error('Error fetching substitutions:', err);
      setError('Unable to load AI substitutions right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedIngredient) {
      fetchSubstitutions(selectedIngredient, dietaryFocus);
    }
  }, [selectedIngredient, dietaryFocus]);

  const handleAddSubstituteToShopping = (subName: string, subRatio: string) => {
    // Map ingredient to a shopping list item
    addCustomShoppingItem(
      subName,
      subRatio || '1',
      'substitute',
      'Pantry & Grains'
    );
    setAddedItemName(subName);
    setTimeout(() => setAddedItemName(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in-50 duration-200">
      <div 
        id="substitute-ingredient-modal"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                <span>Gemini AI Culinary Assistant</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                Smart Ingredient Substitutions
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Controls: Ingredient Selector & Dietary Focus */}
        <div className="p-6 bg-stone-50/80 border-b border-stone-200 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              Select Ingredient to Substitute:
            </label>
            <select
              value={selectedIngredient.id}
              onChange={(e) => {
                const found = recipe.ingredients.find(i => i.id === e.target.value);
                if (found) setSelectedIngredient(found);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white font-semibold text-stone-800 text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
            >
              {recipe.ingredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.quantity} {ing.unit} {ing.name} {ing.notes ? `(${ing.notes})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Pills */}
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
              Dietary or Kitchen Goal:
            </span>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setDietaryFocus(opt.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    dietaryFocus === opt.value
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="space-y-4 py-6">
              <div className="flex items-center justify-center gap-3 text-amber-700">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span className="text-sm font-bold">Consulting Gemini Master Chef...</span>
              </div>
              <div className="space-y-3 animate-pulse">
                <div className="h-24 bg-stone-100 rounded-2xl" />
                <div className="h-24 bg-stone-100 rounded-2xl" />
                <div className="h-24 bg-stone-100 rounded-2xl" />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && !isLoading && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block">Could not load substitutions</strong>
                <p className="mt-0.5">{error}</p>
                <button
                  onClick={() => fetchSubstitutions(selectedIngredient, dietaryFocus)}
                  className="mt-2 text-xs font-bold text-rose-700 underline"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Results List */}
          {data && !isLoading && (
            <div className="space-y-4">
              
              {/* Chef Note Banner */}
              {data.chefNote && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
                  <ChefHat className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-amber-900 block mb-0.5">Chef's Substitution Advice:</strong>
                    <span>{data.chefNote}</span>
                  </div>
                </div>
              )}

              {/* Substitution Cards */}
              <div className="space-y-3">
                {data.substitutions.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-amber-200/80 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-base text-stone-900 font-['Outfit',sans-serif]">
                          {sub.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-stone-200 text-stone-700">
                          {sub.type}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          {sub.ratio}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {sub.description}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-stone-200/60 text-xs">
                      <span className="text-stone-500 italic">
                        <strong className="text-stone-700 not-italic">Flavor & Texture:</strong> {sub.impactOnFlavor}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddSubstituteToShopping(sub.name, sub.ratio)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                          addedItemName === sub.name
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 shadow-2xs'
                        }`}
                      >
                        {addedItemName === sub.name ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Added to Shopping List</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                            <span>Add to Grocery List</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Targeting: <strong className="text-stone-800 font-semibold">{selectedIngredient.name}</strong> for {recipe.title}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 text-white font-bold hover:bg-stone-900 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
