import React, { useState } from 'react';
import { 
  ChefHat, 
  Sparkles, 
  Heart, 
  Mail, 
  CheckCircle2, 
  Globe2, 
  Utensils 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FoodType, DietaryType, CuisineType } from '../types';

export const Footer: React.FC = () => {
  const { setActiveView, setFilterState, resetFilters } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleFilterClick = (type: 'food' | 'diet' | 'cuisine', val: any) => {
    resetFilters();
    if (type === 'food') {
      setFilterState(prev => ({ ...prev, foodTypes: [val as FoodType] }));
    } else if (type === 'diet') {
      setFilterState(prev => ({ ...prev, dietary: [val as DietaryType] }));
    } else if (type === 'cuisine') {
      setFilterState(prev => ({ ...prev, cuisines: [val as CuisineType] }));
    }
    setActiveView('recipes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-stone-900 to-stone-850 p-8 sm:p-10 rounded-3xl border border-stone-800 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly Chef's Table</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit',sans-serif]">
              Fresh Recipes Delivered Every Sunday
            </h3>
            <p className="text-stone-400 text-sm mt-2 leading-relaxed">
              Join 45,000+ passionate home cooks. Receive curated seasonal menus, step-by-step masterclasses, and secret spice blends.
            </p>
          </div>

          <div className="w-full lg:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You're in! Check your inbox for our Top 10 Secret Recipes ebook.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-sm hover:from-amber-400 hover:to-orange-400 transition-all shadow-md shrink-0"
                >
                  Join Newsletter
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800 text-xs sm:text-sm">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 shadow-md">
                <ChefHat className="w-5 h-5" />
              </div>
              <span className="font-['Outfit',sans-serif] font-black text-xl tracking-tight text-white">
                Culinary<span className="text-amber-500">Craft</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Discover authentic global gastronomy, scale dynamic ingredient ratios, and cook flawlessly with real-time multi-timer guidance.
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-400 text-xs">
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-amber-500" />
                <span>30+ Global Recipes</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-500" />
                <span>15+ Cuisines</span>
              </span>
            </div>
          </div>

          {/* Quick Food Categories */}
          <div>
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-xs mb-3 font-['Outfit',sans-serif]">
              Popular Courses
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleFilterClick('food', 'Dinner')} className="hover:text-amber-400 transition-colors">
                  Dinner Dishes
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('food', 'Lunch')} className="hover:text-amber-400 transition-colors">
                  Lunch Specials
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('food', 'Breakfast')} className="hover:text-amber-400 transition-colors">
                  Breakfast & Brunch
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('food', 'Sweets & Desserts')} className="hover:text-amber-400 transition-colors">
                  Sweets & Desserts
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('food', 'Street Food')} className="hover:text-amber-400 transition-colors">
                  Street Food
                </button>
              </li>
            </ul>
          </div>

          {/* Dietary Options */}
          <div>
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-xs mb-3 font-['Outfit',sans-serif]">
              Diets & Lifestyles
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleFilterClick('diet', 'Vegan')} className="hover:text-emerald-400 transition-colors">
                  🟢 100% Vegan
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('diet', 'Vegetarian')} className="hover:text-green-400 transition-colors">
                  🟢 Vegetarian
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('diet', 'Non-Vegetarian')} className="hover:text-rose-400 transition-colors">
                  🔴 Non-Vegetarian
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('diet', 'Seafood')} className="hover:text-sky-400 transition-colors">
                  🔵 Seafood
                </button>
              </li>
              <li>
                <button onClick={() => {
                  resetFilters();
                  setFilterState(prev => ({ ...prev, extraDietary: ['Keto'] }));
                  setActiveView('recipes');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="hover:text-amber-400 transition-colors">
                  🥑 Keto & Low Carb
                </button>
              </li>
            </ul>
          </div>

          {/* Global Cuisines */}
          <div>
            <h4 className="font-bold text-stone-200 uppercase tracking-wider text-xs mb-3 font-['Outfit',sans-serif]">
              World Cuisines
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => handleFilterClick('cuisine', 'Pakistani')} className="hover:text-amber-400 transition-colors">
                  🇵🇰 Pakistani
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('cuisine', 'Italian')} className="hover:text-amber-400 transition-colors">
                  🇮🇹 Italian
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('cuisine', 'Indian')} className="hover:text-amber-400 transition-colors">
                  🇮🇳 Indian
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('cuisine', 'Mexican')} className="hover:text-amber-400 transition-colors">
                  🇲🇽 Mexican
                </button>
              </li>
              <li>
                <button onClick={() => handleFilterClick('cuisine', 'Thai')} className="hover:text-amber-400 transition-colors">
                  🇹🇭 Thai & Asian
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} CulinaryCraft. All rights reserved.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for passionate food discoverers and home chefs worldwide</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
