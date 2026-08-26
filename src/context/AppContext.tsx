import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Recipe, 
  RecipeCollection, 
  ShoppingListItem, 
  MealPlanDay, 
  ActiveTimer, 
  ActiveView, 
  FilterState, 
  DayOfWeek, 
  ShoppingCategory,
  RecipeReview
} from '../types';
import { RECIPES_DATA } from '../data/recipes';
import { DEFAULT_COLLECTIONS } from '../data/categories';
import { playTimerChime } from '../utils/audio';

const INITIAL_FILTER_STATE: FilterState = {
  searchQuery: '',
  foodTypes: [],
  dietary: [],
  extraDietary: [],
  proteins: [],
  beverages: [],
  cuisines: [],
  maxTime: null,
  difficulty: [],
  minRating: null,
  sortBy: 'popular',
};

const INITIAL_MEAL_PLAN: MealPlanDay[] = [
  { day: 'Monday', breakfast: 'rec-14', lunch: 'rec-4', dinner: 'rec-1', snack: 'rec-15' },
  { day: 'Tuesday', breakfast: 'rec-19', lunch: 'rec-8', dinner: 'rec-6', snack: 'rec-18' },
  { day: 'Wednesday', breakfast: 'rec-13', lunch: 'rec-16', dinner: 'rec-9', snack: 'rec-20' },
  { day: 'Thursday', breakfast: 'rec-14', lunch: 'rec-1', dinner: 'rec-7', snack: 'rec-15' },
  { day: 'Friday', breakfast: 'rec-19', lunch: 'rec-12', dinner: 'rec-11', snack: 'rec-5' },
  { day: 'Saturday', breakfast: 'rec-13', lunch: 'rec-10', dinner: 'rec-2', snack: 'rec-5' },
  { day: 'Sunday', breakfast: 'rec-20', lunch: 'rec-3', dinner: 'rec-17', snack: 'rec-18' },
];

const mapIngredientCatToShoppingCat = (ingCat: string): ShoppingCategory => {
  switch (ingCat) {
    case 'Vegetables & Produce':
      return 'Produce';
    case 'Meat & Seafood':
      return 'Meat & Poultry';
    case 'Dairy & Eggs':
      return 'Dairy & Eggs';
    case 'Pantry & Spices':
      return 'Spices & Seasonings';
    case 'Bakery & Grains':
      return 'Bakery';
    case 'Beverages':
      return 'Beverages';
    default:
      return 'Other';
  }
};

interface AppContextType {
  recipes: Recipe[];
  favorites: string[];
  collections: RecipeCollection[];
  shoppingList: ShoppingListItem[];
  mealPlan: MealPlanDay[];
  activeTimers: ActiveTimer[];
  activeView: ActiveView;
  selectedRecipe: Recipe | null;
  cookingModeRecipe: Recipe | null;
  quickViewRecipe: Recipe | null;
  filterState: FilterState;
  searchHistory: string[];
  
  // Navigation & View Actions
  setActiveView: (view: ActiveView) => void;
  openRecipe: (recipe: Recipe) => void;
  openRecipeById: (id: string) => void;
  openCookingMode: (recipe: Recipe) => void;
  closeCookingMode: () => void;
  openQuickView: (recipe: Recipe) => void;
  closeQuickView: () => void;
  
  // Favorites & Collections
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  createCollection: (name: string, color?: string, description?: string) => void;
  deleteCollection: (id: string) => void;
  addRecipeToCollection: (collectionId: string, recipeId: string) => void;
  removeRecipeFromCollection: (collectionId: string, recipeId: string) => void;
  
  // Shopping List
  addIngredientsToShoppingList: (recipe: Recipe, scale?: number, selectedIds?: string[]) => void;
  addCustomShoppingItem: (name: string, quantity: string | number, unit: string, category: ShoppingCategory) => void;
  toggleShoppingItem: (id: string) => void;
  removeShoppingItem: (id: string) => void;
  clearCheckedShoppingItems: () => void;
  clearAllShoppingItems: () => void;
  importSharedShoppingList: (items: ShoppingListItem[], replace?: boolean) => void;
  
  // Meal Planner
  addMealToPlan: (day: DayOfWeek, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipeId: string) => void;
  removeMealFromPlan: (day: DayOfWeek, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  generateShoppingListFromMealPlan: () => void;
  clearMealPlan: () => void;
  
  // Multi-Timers
  startTimer: (label: string, minutes: number, recipeId?: string, recipeTitle?: string, stepNumber?: number) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  deleteTimer: (id: string) => void;

  // Search & Filtering
  setSearchQuery: (query: string) => void;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Recipe Reviews & Ratings
  addRecipeReview: (recipeId: string, reviewData: { author: string; rating: number; comment: string; tags?: string[] }) => void;
  voteReviewHelpful: (recipeId: string, reviewId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Recipes with local review persistence
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    try {
      const savedCustomReviews = localStorage.getItem('culinarycraft_user_reviews');
      if (!savedCustomReviews) return RECIPES_DATA;
      const reviewsMap: Record<string, RecipeReview[]> = JSON.parse(savedCustomReviews);

      return RECIPES_DATA.map((rec) => {
        const extraReviews = reviewsMap[rec.id] || [];
        if (extraReviews.length === 0) return rec;

        const allReviews = [...extraReviews, ...(rec.reviews || [])];
        const newTotalReviews = rec.reviewsCount + extraReviews.length;
        const extraSum = extraReviews.reduce((sum, r) => sum + r.rating, 0);
        const newRating = Number(((rec.rating * rec.reviewsCount + extraSum) / newTotalReviews).toFixed(1));

        return {
          ...rec,
          reviewsCount: newTotalReviews,
          rating: Math.min(5, Math.max(1, newRating)),
          reviews: allReviews,
        };
      });
    } catch {
      return RECIPES_DATA;
    }
  });
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [cookingModeRecipe, setCookingModeRecipe] = useState<Recipe | null>(null);
  const [quickViewRecipe, setQuickViewRecipe] = useState<Recipe | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(INITIAL_FILTER_STATE);

  // Persistence: Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('culinarycraft_favorites');
      return saved ? JSON.parse(saved) : ['rec-1', 'rec-2', 'rec-3', 'rec-8', 'rec-12', 'rec-19'];
    } catch {
      return ['rec-1', 'rec-2', 'rec-3'];
    }
  });

  // Persistence: Collections
  const [collections, setCollections] = useState<RecipeCollection[]>(() => {
    try {
      const saved = localStorage.getItem('culinarycraft_collections');
      return saved ? JSON.parse(saved) : DEFAULT_COLLECTIONS;
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  });

  // Persistence: Shopping List
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    try {
      const saved = localStorage.getItem('culinarycraft_shopping_list');
      return saved ? JSON.parse(saved) : [
        { id: 's1', name: 'Fresh Hass Avocado', quantity: 2, unit: 'whole', category: 'Produce', checked: false, recipeTitle: 'Avocado Sourdough Toast' },
        { id: 's2', name: 'San Marzano Canned Tomatoes', quantity: 800, unit: 'g', category: 'Spices & Seasonings', checked: false, recipeTitle: 'Authentic Butter Chicken' },
        { id: 's3', name: 'Assam Strong Black Tea', quantity: 2, unit: 'tbsp', category: 'Beverages', checked: true, recipeTitle: 'Authentic Kadak Masala Chai' },
      ];
    } catch {
      return [];
    }
  });

  // Persistence: Meal Plan
  const [mealPlan, setMealPlan] = useState<MealPlanDay[]>(() => {
    try {
      const saved = localStorage.getItem('culinarycraft_meal_plan');
      return saved ? JSON.parse(saved) : INITIAL_MEAL_PLAN;
    } catch {
      return INITIAL_MEAL_PLAN;
    }
  });

  // Search History
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('culinarycraft_search_history');
      return saved ? JSON.parse(saved) : ['Chicken Biryani', 'Vegan Pasta', 'Tiramisu', 'Thai Basil'];
    } catch {
      return ['Chicken Biryani', 'Vegan Pasta'];
    }
  });

  // Active Cooking Multi-Timers
  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('culinarycraft_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('culinarycraft_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('culinarycraft_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem('culinarycraft_meal_plan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem('culinarycraft_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Global Timer Tick Engine (Runs every second)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setActiveTimers((currentTimers) => {
        if (currentTimers.length === 0) return currentTimers;

        return currentTimers.map((timer) => {
          if (!timer.isRunning || timer.remainingSeconds <= 0) {
            return timer;
          }

          const nextRemaining = timer.remainingSeconds - 1;
          if (nextRemaining === 0) {
            playTimerChime();
          }

          return {
            ...timer,
            remainingSeconds: nextRemaining,
            isRunning: nextRemaining > 0,
          };
        });
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Navigation Handlers
  const handleSetActiveView = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setActiveView('recipe-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRecipeById = (id: string) => {
    const found = recipes.find((r) => r.id === id);
    if (found) {
      openRecipe(found);
    }
  };

  const openCookingMode = (recipe: Recipe) => {
    setCookingModeRecipe(recipe);
  };

  const closeCookingMode = () => {
    setCookingModeRecipe(null);
  };

  const openQuickView = (recipe: Recipe) => {
    setQuickViewRecipe(recipe);
  };

  const closeQuickView = () => {
    setQuickViewRecipe(null);
  };

  // Favorites
  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) =>
      prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId: string) => favorites.includes(recipeId);

  // Collections
  const createCollection = (name: string, color = 'bg-amber-500', description = '') => {
    const newCol: RecipeCollection = {
      id: `col-${Date.now()}`,
      name,
      color,
      description,
      recipeIds: [],
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [...prev, newCol]);
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  const addRecipeToCollection = (collectionId: string, recipeId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId && !c.recipeIds.includes(recipeId)
          ? { ...c, recipeIds: [...c.recipeIds, recipeId] }
          : c
      )
    );
  };

  const removeRecipeFromCollection = (collectionId: string, recipeId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, recipeIds: c.recipeIds.filter((id) => id !== recipeId) }
          : c
      )
    );
  };

  // Shopping List
  const addIngredientsToShoppingList = (
    recipe: Recipe,
    scale = 1,
    selectedIds?: string[]
  ) => {
    const toAdd = recipe.ingredients.filter((i) =>
      selectedIds ? selectedIds.includes(i.id) : true
    );

    const newItems: ShoppingListItem[] = toAdd.map((ing) => {
      const qty = Math.round(ing.quantity * scale * 10) / 10;
      return {
        id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        name: ing.name,
        quantity: qty,
        unit: ing.unit,
        category: mapIngredientCatToShoppingCat(ing.category),
        checked: false,
        notes: ing.notes,
      };
    });

    setShoppingList((prev) => [...prev, ...newItems]);
  };

  const addCustomShoppingItem = (
    name: string,
    quantity: string | number,
    unit: string,
    category: ShoppingCategory
  ) => {
    const newItem: ShoppingListItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name,
      quantity,
      unit,
      category,
      checked: false,
    };
    setShoppingList((prev) => [newItem, ...prev]);
  };

  const toggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCheckedShoppingItems = () => {
    setShoppingList((prev) => prev.filter((item) => !item.checked));
  };

  const clearAllShoppingItems = () => {
    setShoppingList([]);
  };

  const importSharedShoppingList = (items: ShoppingListItem[], replace = false) => {
    if (replace) {
      setShoppingList(items);
    } else {
      setShoppingList((prev) => {
        // Prevent exact duplicates by name and unit
        const existingKeys = new Set(prev.map(i => `${i.name.toLowerCase()}_${i.unit}`));
        const filteredNew = items.filter(i => !existingKeys.has(`${i.name.toLowerCase()}_${i.unit}`));
        return [...prev, ...filteredNew];
      });
    }
  };

  // Meal Planner
  const addMealToPlan = (day: DayOfWeek, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipeId: string) => {
    setMealPlan((prev) =>
      prev.map((d) => (d.day === day ? { ...d, [slot]: recipeId } : d))
    );
  };

  const removeMealFromPlan = (day: DayOfWeek, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setMealPlan((prev) =>
      prev.map((d) => (d.day === day ? { ...d, [slot]: undefined } : d))
    );
  };

  const generateShoppingListFromMealPlan = () => {
    const newItems: ShoppingListItem[] = [];
    mealPlan.forEach((dayPlan) => {
      (['breakfast', 'lunch', 'dinner', 'snack'] as const).forEach((slot) => {
        const recId = dayPlan[slot];
        if (recId) {
          const rec = recipes.find((r) => r.id === recId);
          if (rec) {
            rec.ingredients.forEach((ing) => {
              newItems.push({
                id: `mp-${Date.now()}-${Math.random().toString(36).substr(2, 7)}`,
                recipeId: rec.id,
                recipeTitle: `${dayPlan.day} ${slot.toUpperCase()}: ${rec.title}`,
                name: ing.name,
                quantity: ing.quantity,
                unit: ing.unit,
                category: mapIngredientCatToShoppingCat(ing.category),
                checked: false,
              });
            });
          }
        }
      });
    });

    setShoppingList((prev) => [...prev, ...newItems]);
  };

  const clearMealPlan = () => {
    setMealPlan(INITIAL_MEAL_PLAN.map((d) => ({ day: d.day })));
  };

  // Multi-Timers
  const startTimer = (
    label: string,
    minutes: number,
    recipeId?: string,
    recipeTitle?: string,
    stepNumber?: number
  ) => {
    const totalSecs = Math.max(1, Math.round(minutes * 60));
    const newTimer: ActiveTimer = {
      id: `timer-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      label: label || 'Step Timer',
      totalDurationSeconds: totalSecs,
      remainingSeconds: totalSecs,
      isRunning: true,
      recipeId,
      recipeTitle,
      stepNumber,
    };
    setActiveTimers((prev) => [...prev, newTimer]);
  };

  const pauseTimer = (id: string) => {
    setActiveTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: false } : t))
    );
  };

  const resumeTimer = (id: string) => {
    setActiveTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRunning: true } : t))
    );
  };

  const resetTimer = (id: string) => {
    setActiveTimers((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, remainingSeconds: t.totalDurationSeconds, isRunning: false }
          : t
      )
    );
  };

  const deleteTimer = (id: string) => {
    setActiveTimers((prev) => prev.filter((t) => t.id !== id));
  };

  // Search & Filtering
  const setSearchQuery = (query: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: query }));
  };

  const resetFilters = () => {
    setFilterState(INITIAL_FILTER_STATE);
  };

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query.trim(), ...filtered].slice(0, 10);
    });
  };

  // Initial Deep Link & Shared URL parser
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const recipeParam = urlParams.get('recipe') || urlParams.get('recipeId');
      if (recipeParam) {
        const found = recipes.find(
          (r) => r.slug === recipeParam || r.id === recipeParam || r.title.toLowerCase().replace(/\s+/g, '-') === recipeParam
        );
        if (found) {
          setSelectedRecipe(found);
          setActiveView('recipe-detail');
        }
      }
    } catch (err) {
      console.warn('Could not parse initial recipe deep link:', err);
    }
  }, []);

  const clearRecentSearches = () => {
    setSearchHistory([]);
  };

  // Recipe Reviews & Rating Submission
  const addRecipeReview = (
    recipeId: string,
    reviewData: { author: string; rating: number; comment: string; tags?: string[] }
  ) => {
    const avatarList = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    ];
    const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    const newReview: RecipeReview = {
      id: `rev-${Date.now()}`,
      author: reviewData.author.trim() || 'Verified Home Chef',
      avatar: randomAvatar,
      rating: reviewData.rating,
      date: 'Just now',
      comment: reviewData.comment.trim(),
      tags: reviewData.tags || [],
      helpfulCount: 0,
    };

    setRecipes((prev) =>
      prev.map((rec) => {
        if (rec.id !== recipeId) return rec;

        const currentReviews = rec.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        const updatedCount = rec.reviewsCount + 1;
        const newRating = Number(
          ((rec.rating * rec.reviewsCount + newReview.rating) / updatedCount).toFixed(1)
        );

        const updatedRecipe: Recipe = {
          ...rec,
          reviewsCount: updatedCount,
          rating: Math.min(5, Math.max(1, newRating)),
          reviews: updatedReviews,
        };

        // If this recipe is currently open in detail view, update selectedRecipe immediately
        setSelectedRecipe((currentSelected) =>
          currentSelected?.id === recipeId ? updatedRecipe : currentSelected
        );

        return updatedRecipe;
      })
    );

    // Save to local storage for persistence across reloads
    try {
      const saved = localStorage.getItem('culinarycraft_user_reviews');
      const map: Record<string, RecipeReview[]> = saved ? JSON.parse(saved) : {};
      map[recipeId] = [newReview, ...(map[recipeId] || [])];
      localStorage.setItem('culinarycraft_user_reviews', JSON.stringify(map));
    } catch (e) {
      console.warn('Failed to persist user review:', e);
    }
  };

  const voteReviewHelpful = (recipeId: string, reviewId: string) => {
    setRecipes((prev) =>
      prev.map((rec) => {
        if (rec.id !== recipeId || !rec.reviews) return rec;

        const updatedReviews = rec.reviews.map((rev) =>
          rev.id === reviewId ? { ...rev, helpfulCount: (rev.helpfulCount || 0) + 1 } : rev
        );

        const updatedRecipe = { ...rec, reviews: updatedReviews };
        setSelectedRecipe((curr) => (curr?.id === recipeId ? updatedRecipe : curr));
        return updatedRecipe;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        recipes,
        favorites,
        collections,
        shoppingList,
        mealPlan,
        activeTimers,
        activeView,
        selectedRecipe,
        cookingModeRecipe,
        quickViewRecipe,
        filterState,
        searchHistory,
        
        setActiveView: handleSetActiveView,
        openRecipe,
        openRecipeById,
        openCookingMode,
        closeCookingMode,
        openQuickView,
        closeQuickView,
        
        toggleFavorite,
        isFavorite,
        createCollection,
        deleteCollection,
        addRecipeToCollection,
        removeRecipeFromCollection,
        
        addIngredientsToShoppingList,
        addCustomShoppingItem,
        toggleShoppingItem,
        removeShoppingItem,
        clearCheckedShoppingItems,
        clearAllShoppingItems,
        importSharedShoppingList,
        
        addMealToPlan,
        removeMealFromPlan,
        generateShoppingListFromMealPlan,
        clearMealPlan,
        
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        deleteTimer,
        
        setSearchQuery,
        setFilterState,
        resetFilters,
        addRecentSearch,
        clearRecentSearches,

        addRecipeReview,
        voteReviewHelpful,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
