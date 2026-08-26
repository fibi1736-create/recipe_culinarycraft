import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ChefHat, 
  Plus, 
  Check, 
  Copy, 
  Flame, 
  Leaf, 
  Globe, 
  Lightbulb, 
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { Recipe, RecipeVariation, VariationsResponse } from '../types';
import { useApp } from '../context/AppContext';

interface SuggestedVariationsProps {
  recipe: Recipe;
}

export const SuggestedVariations: React.FC<SuggestedVariationsProps> = ({ recipe }) => {
  const { addCustomShoppingItem } = useApp();
  
  const [variations, setVariations] = useState<RecipeVariation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [addedGroceryIndex, setAddedGroceryIndex] = useState<number | null>(null);
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);

  // Fetch variations from backend Gemini endpoint
  const fetchVariations = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/variations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipeTitle: recipe.title,
          description: recipe.description,
          cuisine: recipe.cuisine,
          dietaryType: recipe.dietaryType,
          ingredients: recipe.ingredients.map(i => `${i.quantity} ${i.unit} ${i.name}`),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error: ${response.status}`);
      }

      const data: VariationsResponse = await response.json();
      if (data.variations && Array.isArray(data.variations)) {
        setVariations(data.variations);
        setHasGenerated(true);
      } else {
        throw new Error('Invalid format returned by AI engine');
      }
    } catch (err: any) {
      console.error('Error fetching variations:', err);
      setError(err.message || 'Could not generate variations right now.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch variations when recipe changes
  useEffect(() => {
    fetchVariations();
  }, [recipe.id]);

  const handleCopyVariation = (variation: RecipeVariation, index: number) => {
    const text = `🍽️ ${variation.title} (${variation.category})\n` +
      `Recipe: ${recipe.title}\n\n` +
      `Ingredient Tweaks:\n` +
      variation.ingredientTweaks.map(t => `• ${t}`).join('\n') + '\n\n' +
      `Flavor Profile: ${variation.description}\n` +
      `Chef's Pro Tip: ${variation.chefTips}\n\n` +
      `CulinaryCraft Recipe Variations`;

    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleAddVariationToShopping = (variation: RecipeVariation, index: number) => {
    variation.ingredientTweaks.forEach((tweak) => {
      // Clean up string to create clean shopping item
      const cleanName = tweak.replace(/^(Add|Swap|Replace|Use|Fold in|Finish with)\s+/i, '').trim();
      addCustomShoppingItem(
        cleanName,
        '1',
        'portion',
        'Spices & Seasonings'
      );
    });

    setAddedGroceryIndex(index);
    setTimeout(() => setAddedGroceryIndex(null), 3000);
  };

  const getCategoryIcon = (category: string, idx: number) => {
    const lower = category.toLowerCase();
    if (lower.includes('flavor') || lower.includes('spic') || lower.includes('bold')) {
      return <Flame className="w-4 h-4 text-orange-500" />;
    }
    if (lower.includes('plant') || lower.includes('health') || lower.includes('nutrient') || lower.includes('vegan')) {
      return <Leaf className="w-4 h-4 text-emerald-500" />;
    }
    if (lower.includes('fusion') || lower.includes('mediterranean') || lower.includes('global')) {
      return <Globe className="w-4 h-4 text-blue-500" />;
    }
    return idx === 0 ? <Flame className="w-4 h-4 text-orange-500" /> : idx === 1 ? <Leaf className="w-4 h-4 text-emerald-500" /> : <Globe className="w-4 h-4 text-purple-500" />;
  };

  return (
    <section id="suggested-variations-section" className="mt-12 bg-gradient-to-br from-amber-500/5 via-stone-50 to-stone-100/70 rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-sm relative overflow-hidden">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
                Suggested Variations
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[10px] uppercase tracking-wider">
                Gemini AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Three creative chef-curated ingredient tweaks to customize this dish
            </p>
          </div>
        </div>

        {/* Regenerate Button */}
        <button
          type="button"
          onClick={fetchVariations}
          disabled={loading}
          className="px-4 py-2 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs font-bold transition-all flex items-center gap-2 shadow-xs hover:border-stone-300 disabled:opacity-50 self-start sm:self-auto"
          title="Ask Gemini to generate fresh creative variations"
        >
          <RotateCw className={`w-3.5 h-3.5 text-amber-600 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Innovating...' : 'Regenerate Ideas'}</span>
        </button>
      </div>

      {/* Error Notice */}
      {error && !loading && (
        <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchVariations}
            className="font-bold underline hover:text-rose-950"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-5 border border-stone-200/80 space-y-4">
              <div className="h-5 bg-stone-200 rounded-md w-3/4" />
              <div className="h-3.5 bg-stone-100 rounded-md w-1/2" />
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-stone-100 rounded w-full" />
                <div className="h-3 bg-stone-100 rounded w-5/6" />
                <div className="h-3 bg-stone-100 rounded w-4/6" />
              </div>
              <div className="h-14 bg-amber-50 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Variations Cards Grid */}
      {!loading && variations.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6 relative z-10">
          {variations.map((variation, idx) => (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-bold text-[11px] border border-stone-200">
                    {getCategoryIcon(variation.category, idx)}
                    <span>{variation.category}</span>
                  </span>
                  <span className="text-[11px] font-bold text-stone-400 font-mono">
                    #{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900 font-['Outfit',sans-serif] group-hover:text-amber-600 transition-colors leading-snug">
                  {variation.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {variation.description}
                </p>

                {/* Ingredient Tweaks Checklist */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                    <ChefHat className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ingredient Tweaks:</span>
                  </h4>
                  <ul className="space-y-2">
                    {variation.ingredientTweaks.map((tweak, tIdx) => (
                      <li key={tIdx} className="text-xs text-stone-800 flex items-start gap-2 bg-stone-50/80 p-2 rounded-xl border border-stone-100">
                        <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-black text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="leading-snug">{tweak}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chef's Pro Tip */}
                {variation.chefTips && (
                  <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold block text-[11px] text-amber-900 uppercase tracking-wide">Chef's Secret:</strong>
                      <span className="text-[11px] leading-relaxed text-amber-950">{variation.chefTips}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleAddVariationToShopping(variation, idx)}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-950 border border-stone-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  title="Add these 3 ingredient tweaks to your grocery list"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                  <span>{addedGroceryIndex === idx ? 'Added to List!' : 'Add to Groceries'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyVariation(variation, idx)}
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 text-xs transition-colors shrink-0"
                  title="Copy variation details to clipboard"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
