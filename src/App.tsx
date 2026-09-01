import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryCards } from './components/CategoryCards';
import { HomeSections } from './components/HomeSections';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeDetail } from './components/RecipeDetail';
import { CookingMode } from './components/CookingMode';
import { QuickViewModal } from './components/QuickViewModal';
import { ActiveTimersModal } from './components/ActiveTimersModal';
import { ShoppingListView } from './components/ShoppingListView';
import { MealPlannerView } from './components/MealPlannerView';
import { FavoritesView } from './components/FavoritesView';
import { Footer } from './components/Footer';
import { UserProfile } from './components/UserProfile';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthModal } from './components/AuthModal';
import { RecipeSubmission } from './components/RecipeSubmission';

const MainAppContent: React.FC = () => {
  const { 
    activeView, 
    selectedRecipe, 
    cookingModeRecipe, 
    activeTimers,
    setActiveView 
  } = useApp();
  
  const { isAuthenticated, isAdmin } = useAuth();

  const [isTimersModalOpen, setIsTimersModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-['Plus_Jakarta_Sans',sans-serif] flex flex-col justify-between selection:bg-amber-500 selection:text-stone-950">
      
      {/* Top Fixed / Sticky Navigation */}
      <Navbar onOpenTimers={() => setIsTimersModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* VIEW 1: HOMEPAGE */}
        {activeView === 'home' && (
          <div>
            <HeroSection />
            <CategoryCards />
            <HomeSections />
            <div className="bg-white py-12 border-t border-stone-200">
              <RecipeGrid 
                title="All Curated Master Recipes" 
                subtitle="Filter, explore, and cook from our complete library"
                showSidebar={true}
              />
            </div>
          </div>
        )}

        {/* VIEW 2: RECIPES DIRECTORY */}
        {activeView === 'recipes' && (
          <div className="pt-6">
            <CategoryCards />
            <RecipeGrid 
              title="Explore Recipes" 
              subtitle="Combine dietary preferences, ingredients, and cooking times"
              showSidebar={true}
            />
          </div>
        )}

        {/* VIEW 3: CATEGORIES EXPLORER */}
        {activeView === 'categories' && (
          <div className="pt-6">
            <CategoryCards />
            <RecipeGrid 
              title="Category Discoveries" 
              subtitle="Browse by specific culinary classes"
              showSidebar={true}
            />
          </div>
        )}

        {/* VIEW 4: CUISINES EXPLORER */}
        {activeView === 'cuisines' && (
          <div className="pt-6">
            <CategoryCards />
            <RecipeGrid 
              title="Global Cuisines" 
              subtitle="Pakistani, Indian, Italian, Mexican, Thai, Japanese, and more"
              showSidebar={true}
            />
          </div>
        )}

        {/* VIEW 5: POPULAR RECIPES */}
        {activeView === 'popular' && (
          <div className="pt-6">
            <RecipeGrid 
              title="Trending & Most Popular Recipes" 
              subtitle="Hand-picked favorites loved and reviewed by the community"
              showSidebar={true}
              initialSort="popular"
            />
          </div>
        )}

        {/* VIEW 6: FAVORITES & COLLECTIONS */}
        {activeView === 'favorites' && (
          <FavoritesView />
        )}

        {/* VIEW 7: SHOPPING LIST */}
        {activeView === 'shopping' && (
          <ShoppingListView />
        )}

        {/* VIEW 8: MEAL PLANNER */}
        {activeView === 'planner' && (
          <MealPlannerView />
        )}

        {/* VIEW 9: RECIPE DETAIL PAGE */}
        {activeView === 'recipe-detail' && selectedRecipe && (
          <RecipeDetail recipe={selectedRecipe} />
        )}

        {/* VIEW 10: USER PROFILE */}
        {activeView === 'profile' && (
          <UserProfile />
        )}

        {/* VIEW 11: ADMIN DASHBOARD */}
        {activeView === 'admin' && isAdmin && (
          <AdminDashboard />
        )}

        {/* VIEW 12: RECIPE SUBMISSION */}
        {activeView === 'submit' && isAuthenticated && (
          <RecipeSubmission />
        )}

        {/* VIEW 13: LOGIN/SIGNUP */}
        {activeView === 'login' && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Authentication</h2>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 mr-2"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Fullscreen Overlays */}
      {cookingModeRecipe && (
        <CookingMode recipe={cookingModeRecipe} />
      )}

      <QuickViewModal />

      <ActiveTimersModal
        isOpen={isTimersModalOpen}
        onClose={() => setIsTimersModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}
