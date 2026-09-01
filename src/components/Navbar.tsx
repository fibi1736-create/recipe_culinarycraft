import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Search,
  BookmarkCheck,
  Heart,
  ShoppingBag,
  Timer,
  Menu,
  X,
  Sparkles,
  ChefHat,
  CalendarDays,
  Flame,
  Leaf,
  Cake,
  Coffee,
  Globe2,
  Clock,
  User,
  LogOut,
  Plus,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { ActiveView } from '../types';

interface NavbarProps {
  onOpenTimers?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTimers }) => {
  const {
    activeView,
    setActiveView,
    favorites,
    shoppingList,
    activeTimers,
    filterState,
    setFilterState,
    resetFilters
  } = useApp();

  const { isAuthenticated, isAdmin, userProfile, signOut } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for sticky styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const uncompletedShoppingCount = shoppingList.filter(item => !item.checked).length;
  const runningTimersCount = activeTimers.filter(t => t.isRunning).length;

  const navigateTo = (view: ActiveView, dietaryFilter?: string, categoryFilter?: string) => {
    if (dietaryFilter) {
      resetFilters();
      setFilterState(prev => ({ ...prev, dietary: [dietaryFilter as any] }));
    } else if (categoryFilter) {
      resetFilters();
      setFilterState(prev => ({ ...prev, foodTypes: [categoryFilter as any] }));
    }
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { label: string; view: ActiveView; icon: any; filter?: () => void }[] = [
    { label: 'Home', view: 'home', icon: UtensilsCrossed },
    { label: 'All Recipes', view: 'recipes', icon: ChefHat },
    { label: 'Categories', view: 'categories', icon: Sparkles },
    { label: 'Popular', view: 'popular', icon: Flame },
    { label: 'Cuisines', view: 'cuisines', icon: Globe2 },
    { label: 'Meal Planner', view: 'planner', icon: CalendarDays },
  ];

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-stone-900/95 backdrop-blur-md shadow-lg border-b border-stone-800 py-3 text-stone-100' 
          : 'bg-stone-950/90 backdrop-blur-sm border-b border-stone-800/80 py-4 text-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button
            id="nav-logo-button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5 text-stone-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1 font-['Outfit',sans-serif]">
                Culinary<span className="text-amber-400">Craft</span>
              </span>
              <span className="text-[10px] text-stone-400 tracking-wider block font-medium -mt-1">
                DISCOVER & COOK
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.label}
                  id={`nav-link-${link.view}`}
                  onClick={() => navigateTo(link.view)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Multi-Timer Trigger */}
            <button
              id="nav-timers-btn"
              onClick={onOpenTimers}
              className={`p-2.5 rounded-full transition-colors relative ${
                runningTimersCount > 0 
                  ? 'bg-amber-500 text-stone-950 animate-pulse' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Kitchen Timers"
            >
              <Timer className="w-5 h-5" />
              {activeTimers.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {activeTimers.length}
                </span>
              )}
            </button>

            {/* Shopping List Button */}
            <button
              id="nav-shopping-list-btn"
              onClick={() => navigateTo('shopping')}
              className={`p-2.5 rounded-full transition-colors relative ${
                activeView === 'shopping' 
                  ? 'bg-amber-500/20 text-amber-300' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Shopping List"
            >
              <ShoppingBag className="w-5 h-5" />
              {uncompletedShoppingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {uncompletedShoppingCount}
                </span>
              )}
            </button>

            {/* Favorites Button */}
            <button
              id="nav-favorites-btn"
              onClick={() => navigateTo('favorites')}
              className={`p-2.5 rounded-full transition-colors relative ${
                activeView === 'favorites'
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'text-stone-300 hover:text-rose-400 hover:bg-stone-800'
              }`}
              title="My Favorites & Collections"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Auth/Profile Button */}
            {isAuthenticated ? (
              <>
                {/* Profile Button */}
                <button
                  id="nav-profile-btn"
                  onClick={() => navigateTo('profile')}
                  className={`p-2.5 rounded-full transition-colors ${
                    activeView === 'profile'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-stone-300 hover:text-blue-400 hover:bg-stone-800'
                  }`}
                  title="My Profile"
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Submit Recipe Button */}
                <button
                  id="nav-submit-btn"
                  onClick={() => navigateTo('submit')}
                  className={`p-2.5 rounded-full transition-colors ${
                    activeView === 'submit'
                      ? 'bg-green-500/20 text-green-400'
                      : 'text-stone-300 hover:text-green-400 hover:bg-stone-800'
                  }`}
                  title="Submit Recipe"
                >
                  <Plus className="w-5 h-5" />
                </button>

                {/* Admin Dashboard Button */}
                {isAdmin && (
                  <button
                    id="nav-admin-btn"
                    onClick={() => navigateTo('admin')}
                    className={`p-2.5 rounded-full transition-colors ${
                      activeView === 'admin'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-stone-300 hover:text-purple-400 hover:bg-stone-800'
                    }`}
                    title="Admin Dashboard"
                  >
                    <Shield className="w-5 h-5" />
                  </button>
                )}

                {/* Sign Out Button */}
                <button
                  id="nav-signout-btn"
                  onClick={signOut}
                  className="p-2.5 rounded-full transition-colors text-stone-300 hover:text-red-400 hover:bg-stone-800"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              /* Login Button */
              <button
                id="nav-login-btn"
                onClick={() => navigateTo('login')}
                className={`p-2.5 rounded-full transition-colors ${
                  activeView === 'login'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800'
                }`}
                title="Sign In / Sign Up"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = activeView === link.view;
              return (
                <button
                  key={link.label}
                  id={`mobile-nav-${link.view}`}
                  onClick={() => navigateTo(link.view)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-amber-500 text-stone-950 font-bold' 
                      : 'bg-stone-800/80 text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <link.icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-amber-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800">
            <button
              onClick={() => navigateTo('favorites')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium"
            >
              <BookmarkCheck className="w-4 h-4 text-rose-400" />
              <span>Favorites ({favorites.length})</span>
            </button>
            <button
              onClick={() => navigateTo('shopping')}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Shopping List ({uncompletedShoppingCount})</span>
            </button>

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigateTo('profile')}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium"
                >
                  <User className="w-4 h-4 text-blue-400" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => navigateTo('submit')}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 text-green-400" />
                  <span>Submit Recipe</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => navigateTo('admin')}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium"
                  >
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={signOut}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-sm font-medium col-span-2"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Sign In / Sign Up</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
