import React, { useState } from 'react';
import { 
  Sparkles, 
  Utensils, 
  Leaf, 
  Flame, 
  Coffee, 
  Globe2, 
  ArrowRight, 
  Check, 
  RotateCcw 
} from 'lucide-react';
import { 
  FOOD_TYPES_DATA, 
  DIETARY_CATEGORIES_DATA, 
  PROTEIN_CATEGORIES_DATA, 
  BEVERAGE_CATEGORIES_DATA, 
  CUISINES_DATA, 
  EXTRA_DIETARY_DATA 
} from '../data/categories';
import { useApp } from '../context/AppContext';
import { FoodType, DietaryType, ProteinCategory, BeverageCategory, CuisineType, ExtraDietary } from '../types';

export const CategoryCards: React.FC = () => {
  const { filterState, setFilterState, setActiveView, resetFilters } = useApp();
  const [activeTab, setActiveTab] = useState<'food' | 'dietary' | 'protein' | 'beverage' | 'cuisine'>('food');

  const scrollToRecipes = () => {
    setTimeout(() => {
      const el = document.getElementById('recipe-catalog-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleSelectFoodType = (type: FoodType) => {
    const isCurrentlySelected = filterState.foodTypes.includes(type);
    if (isCurrentlySelected) {
      setFilterState(prev => ({
        ...prev,
        foodTypes: prev.foodTypes.filter(t => t !== type)
      }));
    } else {
      resetFilters();
      setFilterState(prev => ({ ...prev, foodTypes: [type] }));
    }
    setActiveView('recipes');
    scrollToRecipes();
  };

  const handleSelectDietary = (type: DietaryType) => {
    const isCurrentlySelected = filterState.dietary.includes(type);
    if (isCurrentlySelected) {
      setFilterState(prev => ({
        ...prev,
        dietary: prev.dietary.filter(t => t !== type)
      }));
    } else {
      resetFilters();
      setFilterState(prev => ({ ...prev, dietary: [type] }));
    }
    setActiveView('recipes');
    scrollToRecipes();
  };

  const handleSelectExtraDietary = (type: ExtraDietary) => {
    const isCurrentlySelected = filterState.extraDietary.includes(type);
    if (isCurrentlySelected) {
      setFilterState(prev => ({
        ...prev,
        extraDietary: prev.extraDietary.filter(t => t !== type)
      }));
    } else {
      resetFilters();
      setFilterState(prev => ({ ...prev, extraDietary: [type] }));
    }
    setActiveView('recipes');
    scrollToRecipes();
  };

  const handleSelectProtein = (type: ProteinCategory) => {
    const isCurrentlySelected = filterState.proteins.includes(type);
    if (isCurrentlySelected) {
      setFilterState(prev => ({
        ...prev,
        proteins: prev.proteins.filter(t => t !== type)
      }));
    } else {
      resetFilters();
      setFilterState(prev => ({ ...prev, proteins: [type] }));
    }
    setActiveView('recipes');
    scrollToRecipes();
  };

  const handleSelectBeverage = (type: BeverageCategory) => {
    const isCurrentlySelected = filterState.beverages.includes(type);
    if (isCurrentlySelected) {
      setFilterState(prev => ({
        ...prev,
        beverages: prev.beverages.filter(t => t !== type)
      }));
    } else {
      resetFilters();
      setFilterState(prev => ({ ...prev, beverages: [type] }));
    }
    setActiveView('recipes');
    scrollToRecipes();
  };

  const handleSelectCuisine = (type: CuisineType) => {
    const isCurrentlySelected = filterState.cuisines.includes(type);
    if (isCurrentlySelected) {
      setFilterState(prev => ({
        ...prev,
        cuisines: prev.cuisines.filter(t => t !== type)
      }));
    } else {
      resetFilters();
      setFilterState(prev => ({ ...prev, cuisines: [type] }));
    }
    setActiveView('recipes');
    scrollToRecipes();
  };

  const hasAnyActiveCategoryFilter = 
    filterState.foodTypes.length > 0 ||
    filterState.dietary.length > 0 ||
    filterState.extraDietary.length > 0 ||
    filterState.proteins.length > 0 ||
    filterState.beverages.length > 0 ||
    filterState.cuisines.length > 0;

  return (
    <section id="category-explorer-section" className="py-12 sm:py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Comprehensive Classification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
              Explore by Category & Diet
            </h2>
            <p className="text-stone-500 text-sm mt-1 max-w-xl">
              Click any card to instantly filter recipes by food type, dietary preference, main protein, beverage, or world cuisine.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('food')}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'food'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>Food Type ({FOOD_TYPES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('dietary')}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'dietary'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-500" />
              <span>Dietary ({DIETARY_CATEGORIES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('protein')}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'protein'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Protein / Ingredient ({PROTEIN_CATEGORIES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('beverage')}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'beverage'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Coffee className="w-3.5 h-3.5 text-sky-500" />
              <span>Beverages ({BEVERAGE_CATEGORIES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('cuisine')}
              className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cuisine'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>Cuisines ({CUISINES_DATA.length})</span>
            </button>
          </div>
        </div>

        {/* Active Filter Bar if selected */}
        {hasAnyActiveCategoryFilter && (
          <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-amber-900">Active Category Filter Applied:</span>
              {filterState.foodTypes.map(f => (
                <span key={f} className="px-2.5 py-1 bg-amber-500 text-stone-950 font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>{f}</span>
                </span>
              ))}
              {filterState.dietary.map(d => (
                <span key={d} className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>{d}</span>
                </span>
              ))}
              {filterState.extraDietary.map(e => (
                <span key={e} className="px-2.5 py-1 bg-green-600 text-white font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>{e}</span>
                </span>
              ))}
              {filterState.proteins.map(p => (
                <span key={p} className="px-2.5 py-1 bg-orange-500 text-white font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>{p}</span>
                </span>
              ))}
              {filterState.beverages.map(b => (
                <span key={b} className="px-2.5 py-1 bg-sky-600 text-white font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>{b}</span>
                </span>
              ))}
              {filterState.cuisines.map(c => (
                <span key={c} className="px-2.5 py-1 bg-indigo-600 text-white font-bold rounded-lg flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" />
                  <span>{c}</span>
                </span>
              ))}
            </div>
            <button
              onClick={resetFilters}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-amber-400" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Tab 1: Food Type Grid */}
        {activeTab === 'food' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5">
            {FOOD_TYPES_DATA.map((cat) => {
              const isSelected = filterState.foodTypes.includes(cat.type);
              return (
                <div
                  key={cat.type}
                  id={`cat-card-${cat.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectFoodType(cat.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectFoodType(cat.type);
                    }
                  }}
                  className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between select-none active:scale-[0.97] ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400'
                      : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2.5 bg-stone-100">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-xl drop-shadow">
                      {cat.icon}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm transition-colors ${isSelected ? 'text-amber-700 font-extrabold' : 'text-stone-900 group-hover:text-amber-600'}`}>
                      {cat.label}
                    </h4>
                    <span className="text-[11px] text-stone-400 font-medium block">
                      {cat.count} recipes
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Dietary System */}
        {activeTab === 'dietary' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DIETARY_CATEGORIES_DATA.map((diet) => {
                const isSelected = filterState.dietary.includes(diet.type);
                return (
                  <div
                    key={diet.type}
                    id={`diet-card-${diet.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => handleSelectDietary(diet.type)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectDietary(diet.type);
                      }
                    }}
                    className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between relative overflow-hidden select-none active:scale-[0.97] ${
                      isSelected
                        ? `bg-emerald-50 border-emerald-500 shadow-lg ring-2 ring-emerald-400 scale-[1.01]`
                        : `bg-white ${diet.border} hover:shadow-lg`
                    }`}
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-stone-100">
                      <img
                        src={diet.image}
                        alt={diet.label}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                      <span className="absolute top-2 left-2 text-xl drop-shadow">
                        {diet.icon}
                      </span>
                      <span className={`absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${diet.bg} ${diet.color} border ${diet.border} shadow-sm backdrop-blur-sm flex items-center gap-1`}>
                        {isSelected && <Check className="w-3 h-3 text-emerald-700" />}
                        <span>{diet.badge}</span>
                      </span>
                      <div className="absolute bottom-2 left-2.5 right-2.5">
                        <h4 className="text-base font-bold text-white font-['Outfit',sans-serif] drop-shadow-sm">
                          {diet.label}
                        </h4>
                      </div>
                    </div>
                    <div className="px-1 pb-1">
                      <p className="text-xs text-stone-500">
                        {diet.count} curated recipes crafted without compromise.
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-amber-600">
                        <span>{isSelected ? 'Filtered Collection' : 'Browse Collection'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extra Dietary Sub-filters */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
                Specific Dietary Preferences & Lifestyle
              </span>
              <div className="flex flex-wrap gap-2">
                {EXTRA_DIETARY_DATA.map((item) => {
                  const isSelected = filterState.extraDietary.includes(item.type);
                  return (
                    <button
                      key={item.type}
                      id={`extra-diet-${item.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => handleSelectExtraDietary(item.type)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 select-none cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-sm ring-2 ring-amber-400'
                          : 'bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-700'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 ml-0.5" />
                      ) : (
                        <span className="text-[10px] opacity-70">({item.count})</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Proteins & Ingredients */}
        {activeTab === 'protein' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {PROTEIN_CATEGORIES_DATA.map((item) => {
              const isSelected = filterState.proteins.includes(item.type);
              return (
                <div
                  key={item.type}
                  id={`protein-card-${item.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectProtein(item.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectProtein(item.type);
                    }
                  }}
                  className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-200 select-none active:scale-[0.97] ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-400'
                      : 'bg-white border-stone-200 hover:border-orange-400 hover:shadow-md'
                  }`}
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2.5 bg-stone-100 relative">
                    <img
                      src={item.image}
                      alt={item.label}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-stone-950/20" />
                    <span className="absolute top-2 right-2 text-lg drop-shadow">
                      {item.icon}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-orange-500 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <h4 className={`font-bold text-xs sm:text-sm transition-colors ${isSelected ? 'text-orange-700 font-extrabold' : 'text-stone-900 group-hover:text-orange-600'}`}>
                    {item.label}
                  </h4>
                  <span className="text-[11px] text-stone-400">
                    {item.count} recipes
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 4: Beverages */}
        {activeTab === 'beverage' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BEVERAGE_CATEGORIES_DATA.map((bev) => {
              const isSelected = filterState.beverages.includes(bev.type);
              return (
                <div
                  key={bev.type}
                  id={`bev-card-${bev.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectBeverage(bev.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectBeverage(bev.type);
                    }
                  }}
                  className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-200 select-none active:scale-[0.97] ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-lg ring-2 ring-sky-400'
                      : 'bg-white border-stone-200 hover:border-sky-400 hover:shadow-lg'
                  }`}
                >
                  <div className="aspect-[16/9] w-full bg-stone-100 relative overflow-hidden">
                    <img
                      src={bev.image}
                      alt={bev.label}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-xl drop-shadow">
                      {bev.icon}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <div className="p-3.5">
                    <h4 className={`font-bold text-sm transition-colors ${isSelected ? 'text-sky-700 font-extrabold' : 'text-stone-900 group-hover:text-sky-600'}`}>
                      {bev.label}
                    </h4>
                    <span className="text-xs text-stone-400">
                      {bev.count} craft drinks
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 5: International Cuisines */}
        {activeTab === 'cuisine' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {CUISINES_DATA.slice(0, 10).map((cuisine) => {
              const isSelected = filterState.cuisines.includes(cuisine.type);
              return (
                <div
                  key={cuisine.type}
                  id={`cuisine-card-${cuisine.type.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => handleSelectCuisine(cuisine.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectCuisine(cuisine.type);
                    }
                  }}
                  className={`group cursor-pointer rounded-2xl p-3 border transition-all duration-200 flex flex-col justify-between select-none active:scale-[0.97] ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-500 shadow-md ring-2 ring-indigo-400'
                      : 'bg-white border-stone-200 hover:border-indigo-400 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-2.5 bg-stone-100">
                    <img
                      src={cuisine.image}
                      alt={cuisine.label}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
                    <span className="absolute top-2 left-2 text-xl drop-shadow">
                      {cuisine.flag}
                    </span>
                    <span className="absolute bottom-2 left-2 text-xs font-bold text-white drop-shadow">
                      {cuisine.count} dishes
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm transition-colors ${isSelected ? 'text-indigo-700 font-extrabold' : 'text-stone-900 group-hover:text-indigo-600'}`}>
                      {cuisine.label}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                      {cuisine.signatureDish}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
