import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ChefHat, 
  Clock, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { 
    filterState, 
    setSearchQuery, 
    setActiveView, 
    searchHistory, 
    addRecentSearch,
    resetFilters
  } = useApp();

  const [inputVal, setInputVal] = useState(filterState.searchQuery || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const quickSearchTags = [
    'Chicken pasta',
    'Vegan dinner',
    'Chocolate dessert',
    'Seafood recipes',
    'Quick breakfast',
    'Mutton Biryani',
    'Thai Basil Chicken',
    'Smoothie'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setSearchQuery(inputVal.trim());
      addRecentSearch(inputVal.trim());
      setActiveView('recipes');
      setShowSuggestions(false);
    }
  };

  const handleSelectTag = (tag: string) => {
    setInputVal(tag);
    setSearchQuery(tag);
    addRecentSearch(tag);
    setActiveView('recipes');
    setShowSuggestions(false);
  };

  const handleExploreAll = () => {
    resetFilters();
    setActiveView('recipes');
  };

  const handleExplorePopular = () => {
    resetFilters();
    setActiveView('popular');
  };

  return (
    <div id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      
      {/* Background Decorative Glow & Graphic Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Animated Ingredient Badges (Desktop) */}
      <div className="hidden lg:block absolute top-20 left-12 animate-pulse pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700/60 shadow-xl text-xs font-medium text-stone-200">
          <span className="text-base">🥑</span>
          <span>Fresh Hass Avocado</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-24 left-20 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700/60 shadow-xl text-xs font-medium text-stone-200">
          <span className="text-base">🍅</span>
          <span>San Marzano Tomatoes</span>
        </div>
      </div>

      <div className="hidden lg:block absolute top-24 right-16 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700/60 shadow-xl text-xs font-medium text-stone-200">
          <span className="text-base">🌿</span>
          <span>Sweet Thai Basil</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-32 right-24 pointer-events-none">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-800/80 backdrop-blur-md border border-stone-700/60 shadow-xl text-xs font-medium text-stone-200">
          <span className="text-base">🧀</span>
          <span>Aged Parmigiano-Reggiano</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Curated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Curated with 30+ Global Master Recipes & Cooking Mode</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-[1.15] text-white">
          Discover Recipes You’ll <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
            Love to Cook
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Explore delicious recipes, discover new flavors, scale ingredients effortlessly, and cook with step-by-step guidance and live timers.
        </p>

        {/* Interactive Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto relative text-left">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-stone-800/90 border border-stone-700 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
              <div className="pl-4 sm:pl-5 text-stone-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="hero-search-input"
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search recipes, ingredients, cuisines, or diets (e.g. 'Chicken pasta')..."
                className="w-full py-4 pl-3 pr-28 text-white placeholder-stone-400 text-sm sm:text-base bg-transparent focus:outline-none"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={() => {
                    setInputVal('');
                    setSearchQuery('');
                  }}
                  className="p-1.5 text-stone-400 hover:text-white mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="pr-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Autocomplete / Suggestions Overlay */}
          {showSuggestions && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowSuggestions(false)} 
              />
              <div className="absolute top-full left-0 right-0 mt-2 bg-stone-900 border border-stone-700/90 rounded-2xl shadow-2xl z-20 overflow-hidden text-sm animate-in fade-in-50 duration-150">
                
                {/* Recent Searches */}
                {searchHistory.length > 0 && (
                  <div className="p-3 border-b border-stone-800">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-2 block mb-1">
                      Recent Searches
                    </span>
                    <div className="flex flex-wrap gap-1.5 px-2">
                      {searchHistory.slice(0, 5).map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectTag(item)}
                          className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs flex items-center gap-1 transition-colors"
                        >
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Query Suggestions */}
                <div className="p-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 px-2 block mb-1.5">
                    Popular Suggestions
                  </span>
                  <div className="space-y-1">
                    {quickSearchTags.slice(0, 5).map((tag, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectTag(tag)}
                        className="w-full text-left px-3 py-2 rounded-xl text-stone-200 hover:bg-stone-800/80 hover:text-amber-400 flex items-center justify-between group transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Search className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400" />
                          <span>{tag}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Search Tag Pills */}
        <div className="mt-5 flex items-center justify-center flex-wrap gap-2 text-xs">
          <span className="text-stone-400 font-medium mr-1">Trending:</span>
          {quickSearchTags.slice(0, 6).map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectTag(tag)}
              className="px-3 py-1 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700/60 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <button
            id="hero-explore-cta-btn"
            onClick={handleExploreAll}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-base hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
          >
            <ChefHat className="w-5 h-5" />
            <span>Explore All Recipes</span>
          </button>

          <button
            id="hero-popular-cta-btn"
            onClick={handleExplorePopular}
            className="px-7 py-3.5 rounded-xl bg-stone-800/90 text-stone-100 font-semibold text-base hover:bg-stone-700 border border-stone-700 transition-all flex items-center gap-2"
          >
            <Flame className="w-5 h-5 text-orange-400" />
            <span>Popular Trending</span>
          </button>
        </div>

        {/* Feature Micro-Badges */}
        <div className="mt-12 pt-8 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-stone-400 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Interactive Cooking Mode</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Dynamic Servings Scaler</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Multi-Timer Notification</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Smart Shopping Aisle Grouping</span>
          </div>
        </div>

      </div>
    </div>
  );
};
