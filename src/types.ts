export type DietaryType = 'Vegan' | 'Vegetarian' | 'Non-Vegetarian' | 'Seafood';

export type ExtraDietary = 'Gluten-Free' | 'Dairy-Free' | 'Low-Carb' | 'Keto' | 'Healthy' | 'High-Protein';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type FoodType = 
  | 'Savory'
  | 'Sweets & Desserts'
  | 'Breakfast'
  | 'Lunch'
  | 'Dinner'
  | 'Snacks'
  | 'Appetizers'
  | 'Salads'
  | 'Soups'
  | 'Main Courses'
  | 'Side Dishes'
  | 'Baked Goods'
  | 'Street Food'
  | 'Beverages';

export type ProteinCategory =
  | 'Chicken'
  | 'Beef'
  | 'Mutton/Lamb'
  | 'Fish'
  | 'Seafood'
  | 'Eggs'
  | 'Rice'
  | 'Pasta'
  | 'Vegetables'
  | 'Fruits'
  | 'Cheese'
  | 'Chocolate';

export type BeverageCategory =
  | 'Hot Beverages'
  | 'Cold Beverages'
  | 'Smoothies'
  | 'Milkshakes'
  | 'Juices'
  | 'Mocktails'
  | 'Coffee'
  | 'Tea';

export type CuisineType =
  | 'Pakistani'
  | 'Indian'
  | 'Chinese'
  | 'Japanese'
  | 'Korean'
  | 'Thai'
  | 'Italian'
  | 'Mexican'
  | 'American'
  | 'Mediterranean'
  | 'Turkish'
  | 'Middle Eastern'
  | 'French'
  | 'Spanish'
  | 'Greek';

export type IngredientCategory =
  | 'Vegetables & Produce'
  | 'Dairy & Eggs'
  | 'Meat & Seafood'
  | 'Pantry & Spices'
  | 'Bakery & Grains'
  | 'Beverages'
  | 'Other';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
  category: IngredientCategory;
}

export interface InstructionStep {
  stepNumber: number;
  title?: string;
  description: string;
  timerMinutes?: number;
  tip?: string;
  image?: string;
}

export interface RecipeNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

export interface RecipeReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
  helpfulCount?: number;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  heroImage?: string;
  rating: number;
  reviewsCount: number;
  reviews?: RecipeReview[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  totalTime: number; // in minutes
  servings: number;
  difficulty: DifficultyLevel;
  calories: number;
  cuisine: CuisineType;
  foodTypes: FoodType[];
  dietaryType: DietaryType;
  extraDietary: ExtraDietary[];
  proteins: ProteinCategory[];
  beverageCategory?: BeverageCategory;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishDate: string;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  nutrition: RecipeNutrition;
  tags: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  isTrending?: boolean;
  isQuickEasy?: boolean;
}

export interface FilterState {
  searchQuery: string;
  foodTypes: FoodType[];
  dietary: DietaryType[];
  extraDietary: ExtraDietary[];
  proteins: ProteinCategory[];
  beverages: BeverageCategory[];
  cuisines: CuisineType[];
  maxTime: number | null; // e.g. 15, 30, 45, 60
  difficulty: DifficultyLevel[];
  minRating: number | null;
  sortBy: 'popular' | 'rating' | 'newest' | 'quickest' | 'calories-low';
}

export type ShoppingCategory = 
  | 'Produce'
  | 'Meat & Poultry'
  | 'Seafood'
  | 'Dairy & Eggs'
  | 'Pantry & Grains'
  | 'Spices & Seasonings'
  | 'Bakery'
  | 'Beverages'
  | 'Other';

export interface ShoppingListItem {
  id: string;
  recipeId?: string;
  recipeTitle?: string;
  name: string;
  quantity: string | number;
  unit: string;
  category: ShoppingCategory;
  checked: boolean;
  notes?: string;
}

export type ShoppingItem = ShoppingListItem;

export interface RecipeCollection {
  id: string;
  name: string;
  description?: string;
  color?: string;
  iconName?: string;
  recipeIds: string[];
  isDefault?: boolean;
  createdAt?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface MealPlanDay {
  day: DayOfWeek;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snack?: string;
}

export type WeeklyMealPlan = MealPlanDay[];

export interface ActiveTimer {
  id: string;
  recipeId?: string;
  recipeTitle?: string;
  stepNumber?: number;
  label: string;
  totalDurationSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

export interface IngredientSubstitution {
  name: string;
  ratio: string;
  type: string;
  description: string;
  impactOnFlavor: string;
}

export interface SubstitutionResponse {
  ingredient: string;
  substitutions: IngredientSubstitution[];
  chefNote: string;
}

export interface RecipeVariation {
  title: string;
  category: string;
  ingredientTweaks: string[];
  description: string;
  chefTips: string;
}

export interface VariationsResponse {
  recipeTitle: string;
  variations: RecipeVariation[];
}

export type ActiveView = 
  | 'home'
  | 'recipes'
  | 'recipe-detail'
  | 'categories'
  | 'popular'
  | 'quick-easy'
  | 'vegan'
  | 'desserts'
  | 'beverages'
  | 'cuisines'
  | 'favorites'
  | 'shopping'
  | 'planner'
  | 'about';
