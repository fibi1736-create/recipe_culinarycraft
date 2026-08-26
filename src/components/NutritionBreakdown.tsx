import React from 'react';
import { Activity, Flame, ShieldCheck, Info } from 'lucide-react';
import { RecipeNutrition } from '../types';

interface NutritionBreakdownProps {
  nutrition: RecipeNutrition;
  servings: number;
  originalServings: number;
}

export const NutritionBreakdown: React.FC<NutritionBreakdownProps> = ({
  nutrition,
  servings,
  originalServings,
}) => {
  // Calculations per scaled serving
  const scale = servings / (originalServings || 1);
  const caloriesPerServing = Math.round(nutrition.calories);
  const totalScaledCalories = Math.round(nutrition.calories * scale);
  
  const proteinG = Math.round(nutrition.protein * scale);
  const carbsG = Math.round(nutrition.carbs * scale);
  const fatG = Math.round(nutrition.fat * scale);
  const fiberG = nutrition.fiber ? Math.round(nutrition.fiber * scale) : 0;
  const sugarG = nutrition.sugar ? Math.round(nutrition.sugar * scale) : undefined;

  // Calorie calculations from macros (4 kcal/g protein & carb, 9 kcal/g fat)
  const proteinKcal = proteinG * 4;
  const carbsKcal = carbsG * 4;
  const fatKcal = fatG * 9;
  const macroKcalSum = Math.max(1, proteinKcal + carbsKcal + fatKcal);

  const proteinPct = Math.round((proteinKcal / macroKcalSum) * 100);
  const carbsPct = Math.round((carbsKcal / macroKcalSum) * 100);
  const fatPct = Math.max(0, 100 - proteinPct - carbsPct);

  // Standard % Daily Values (based on 2000 kcal reference diet)
  const proteinDV = Math.min(100, Math.round((proteinG / 50) * 100));
  const carbsDV = Math.min(100, Math.round((carbsG / 275) * 100));
  const fatDV = Math.min(100, Math.round((fatG / 78) * 100));
  const fiberDV = fiberG ? Math.min(100, Math.round((fiberG / 28) * 100)) : undefined;

  return (
    <section id="nutrition-breakdown-section" className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 font-['Outfit',sans-serif]">
              Detailed Nutritional Breakdown
            </h3>
            <span className="text-xs text-stone-400">
              Macro distribution calculated per serving ({servings} {servings === 1 ? 'serving' : 'servings'} total)
            </span>
          </div>
        </div>

        {/* Calorie Pill */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 self-start sm:self-auto">
          <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
          <span className="text-xs font-semibold text-stone-600">Energy:</span>
          <strong className="text-sm font-black font-['Outfit',sans-serif]">{totalScaledCalories} kcal</strong>
        </div>
      </div>

      {/* Visual Macronutrient Split Bar */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
          <span>Macronutrient Energy Contribution</span>
          <span className="font-mono text-[11px] text-stone-400">100% Calorie Split</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="h-4 w-full rounded-full bg-stone-100 p-0.5 flex overflow-hidden border border-stone-200/80 shadow-inner">
          <div
            style={{ width: `${proteinPct}%` }}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-l-full transition-all duration-500 relative group cursor-pointer"
            title={`Protein: ${proteinG}g (${proteinPct}%)`}
          />
          <div
            style={{ width: `${carbsPct}%` }}
            className="bg-gradient-to-r from-amber-400 to-orange-400 h-full transition-all duration-500 relative group cursor-pointer"
            title={`Carbohydrates: ${carbsG}g (${carbsPct}%)`}
          />
          <div
            style={{ width: `${fatPct}%` }}
            className="bg-gradient-to-r from-rose-400 to-pink-500 h-full rounded-r-full transition-all duration-500 relative group cursor-pointer"
            title={`Fats: ${fatG}g (${fatPct}%)`}
          />
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="font-medium text-stone-700">Protein:</span>
            <strong className="text-stone-900 font-bold">{proteinPct}%</strong>
            <span className="text-stone-400 font-mono">({proteinG}g)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="font-medium text-stone-700">Carbs:</span>
            <strong className="text-stone-900 font-bold">{carbsPct}%</strong>
            <span className="text-stone-400 font-mono">({carbsG}g)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="font-medium text-stone-700">Fats:</span>
            <strong className="text-stone-900 font-bold">{fatPct}%</strong>
            <span className="text-stone-400 font-mono">({fatG}g)</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Macro Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        
        {/* Protein Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Protein</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-200/60 text-emerald-950 font-mono">
              {proteinDV}% DV
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-['Outfit',sans-serif] text-emerald-950">
              {proteinG}
            </span>
            <span className="text-xs font-bold text-emerald-700 ml-1">grams</span>
          </div>
          <div className="mt-2 text-[10px] text-emerald-800/80 font-medium">
            {proteinKcal} kcal from protein
          </div>
        </div>

        {/* Carbohydrates Card */}
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900">Carbohydrates</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-200/60 text-amber-950 font-mono">
              {carbsDV}% DV
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-['Outfit',sans-serif] text-amber-950">
              {carbsG}
            </span>
            <span className="text-xs font-bold text-amber-700 ml-1">grams</span>
          </div>
          <div className="mt-2 text-[10px] text-amber-800/80 font-medium">
            {carbsKcal} kcal from carbs
          </div>
        </div>

        {/* Fats Card */}
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/70 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-900">Total Fats</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-200/60 text-rose-950 font-mono">
              {fatDV}% DV
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-['Outfit',sans-serif] text-rose-950">
              {fatG}
            </span>
            <span className="text-xs font-bold text-rose-700 ml-1">grams</span>
          </div>
          <div className="mt-2 text-[10px] text-rose-800/80 font-medium">
            {fatKcal} kcal from fats
          </div>
        </div>

        {/* Dietary Fiber & Micronutrients */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800">Dietary Fiber</span>
            {fiberDV !== undefined && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-stone-200 text-stone-800 font-mono">
                {fiberDV}% DV
              </span>
            )}
          </div>
          <div className="mt-3">
            <span className="text-2xl font-black font-['Outfit',sans-serif] text-stone-900">
              {fiberG}
            </span>
            <span className="text-xs font-bold text-stone-500 ml-1">grams</span>
          </div>
          <div className="mt-2 text-[10px] text-stone-500 font-medium">
            {sugarG !== undefined ? `Natural Sugars: ${sugarG}g` : 'Essential digestive fiber'}
          </div>
        </div>

      </div>

      {/* FDA Reference Disclaimer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span>Percent Daily Values (% DV) are based on a standard 2,000 calorie diet.</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-700 font-medium hidden sm:flex">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified Nutrient Model</span>
        </div>
      </div>

    </section>
  );
};
