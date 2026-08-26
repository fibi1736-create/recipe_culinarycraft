import { FoodType, DietaryType, ProteinCategory, BeverageCategory, CuisineType, ExtraDietary } from '../types';

export interface CategoryCardInfo {
  id: string;
  name: string;
  count?: number;
  image: string;
  color: string;
  badgeColor: string;
  description: string;
  icon: string;
}

export const FOOD_TYPES_DATA: { type: FoodType; label: string; icon: string; count: number; image: string; description: string }[] = [
  { type: 'Savory', label: 'Savory', icon: '🍲', count: 28, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', description: 'Rich, flavorful, and hearty dishes' },
  { type: 'Sweets & Desserts', label: 'Sweets & Desserts', icon: '🍰', count: 18, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80', description: 'Decadent cakes, tarts, and pastries' },
  { type: 'Breakfast', label: 'Breakfast', icon: '🥞', count: 15, image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80', description: 'Energizing mornings to kickstart your day' },
  { type: 'Lunch', label: 'Lunch', icon: '🥪', count: 24, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80', description: 'Quick, fresh, and filling midday meals' },
  { type: 'Dinner', label: 'Dinner', icon: '🍷', count: 32, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', description: 'Cozy, comforting, and elevated evening meals' },
  { type: 'Snacks', label: 'Snacks', icon: '🥨', count: 12, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80', description: 'Bite-sized delights for any craving' },
  { type: 'Appetizers', label: 'Appetizers', icon: '🍤', count: 14, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80', description: 'Perfect starters to open the appetite' },
  { type: 'Salads', label: 'Salads', icon: '🥗', count: 16, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', description: 'Crisp, vibrant, and wholesome bowls' },
  { type: 'Soups', label: 'Soups', icon: '🥣', count: 11, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80', description: 'Warm broths and velvety bisques' },
  { type: 'Main Courses', label: 'Main Courses', icon: '🥩', count: 35, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80', description: 'Showstopping centerpiece recipes' },
  { type: 'Side Dishes', label: 'Side Dishes', icon: '🥔', count: 19, image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80', description: 'Flavor-packed accompaniments' },
  { type: 'Baked Goods', label: 'Baked Goods', icon: '🥖', count: 14, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', description: 'Artisan breads, cookies, and rolls' },
  { type: 'Street Food', label: 'Street Food', icon: '🌮', count: 17, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', description: 'Exciting global street culinary favorites' },
];

export const DIETARY_CATEGORIES_DATA: { type: DietaryType; label: string; icon: string; badge: string; color: string; bg: string; border: string; count: number; image: string }[] = [
  { type: 'Vegan', label: 'Vegan', icon: '🌱', badge: '🟢 Vegan', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', count: 14, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
  { type: 'Vegetarian', label: 'Vegetarian', icon: '🌿', badge: '🟢 Vegetarian', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', count: 20, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80' },
  { type: 'Non-Vegetarian', label: 'Non-Vegetarian', icon: '🍗', badge: '🔴 Non-Vegetarian', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200', count: 26, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80' },
  { type: 'Seafood', label: 'Seafood', icon: '🐟', badge: '🔵 Seafood', color: 'text-sky-700', bg: 'bg-sky-50', border: 'border-sky-200', count: 12, image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80' },
];

export const EXTRA_DIETARY_DATA: { type: ExtraDietary; label: string; icon: string; count: number }[] = [
  { type: 'Gluten-Free', label: 'Gluten-Free', icon: '🌾', count: 16 },
  { type: 'Dairy-Free', label: 'Dairy-Free', icon: '🥛', count: 15 },
  { type: 'Low-Carb', label: 'Low-Carb', icon: '🥑', count: 18 },
  { type: 'Keto', label: 'Keto', icon: '🥩', count: 11 },
  { type: 'Healthy', label: 'Healthy', icon: '💪', count: 25 },
  { type: 'High-Protein', label: 'High-Protein', icon: '⚡', count: 22 },
];

export const PROTEIN_CATEGORIES_DATA: { type: ProteinCategory; label: string; icon: string; image: string; count: number }[] = [
  { type: 'Chicken', label: 'Chicken', icon: '🍗', count: 18, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80' },
  { type: 'Beef', label: 'Beef', icon: '🥩', count: 10, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { type: 'Mutton/Lamb', label: 'Mutton / Lamb', icon: '🍖', count: 8, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80' },
  { type: 'Fish', label: 'Fish', icon: '🐟', count: 9, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80' },
  { type: 'Seafood', label: 'Seafood & Shrimp', icon: '🦐', count: 11, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80' },
  { type: 'Eggs', label: 'Eggs', icon: '🍳', count: 12, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
  { type: 'Rice', label: 'Rice & Grains', icon: '🍚', count: 15, image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80' },
  { type: 'Pasta', label: 'Pasta & Noodles', icon: '🍝', count: 14, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80' },
  { type: 'Vegetables', label: 'Vegetables', icon: '🥦', count: 25, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
  { type: 'Fruits', label: 'Fresh Fruits', icon: '🍓', count: 10, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80' },
  { type: 'Cheese', label: 'Cheese & Dairy', icon: '🧀', count: 16, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80' },
  { type: 'Chocolate', label: 'Chocolate', icon: '🍫', count: 9, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80' },
];

export const BEVERAGE_CATEGORIES_DATA: { type: BeverageCategory; label: string; icon: string; image: string; count: number }[] = [
  { type: 'Hot Beverages', label: 'Hot Beverages', icon: '☕', count: 8, image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80' },
  { type: 'Cold Beverages', label: 'Cold Beverages', icon: '🧊', count: 12, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80' },
  { type: 'Smoothies', label: 'Smoothies', icon: '🥤', count: 7, image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80' },
  { type: 'Milkshakes', label: 'Milkshakes', icon: '🍦', count: 6, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80' },
  { type: 'Juices', label: 'Fresh Juices', icon: '🍊', count: 8, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80' },
  { type: 'Mocktails', label: 'Craft Mocktails', icon: '🍹', count: 7, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80' },
  { type: 'Coffee', label: 'Specialty Coffee', icon: '☕', count: 9, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80' },
  { type: 'Tea', label: 'Artisanal Tea', icon: '🍵', count: 9, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80' },
];

export const CUISINES_DATA: { type: CuisineType; label: string; flag: string; image: string; signatureDish: string; count: number; description: string }[] = [
  { type: 'Pakistani', label: 'Pakistani', flag: '🇵🇰', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80', signatureDish: 'Mutton Biryani & Chicken Karahi', count: 8, description: 'Aromatic basmati, slow-cooked meats, and warming spices' },
  { type: 'Indian', label: 'Indian', flag: '🇮🇳', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', signatureDish: 'Butter Chicken & Paneer Tikka', count: 12, description: 'Vibrant curries, rich tandoori grills, and fragrant rice' },
  { type: 'Italian', label: 'Italian', flag: '🇮🇹', image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80', signatureDish: 'Creamy Garlic Pasta & Neapolitan Pizza', count: 15, description: 'Silky handmade pasta, fresh herbs, olive oil, and parmesan' },
  { type: 'Mexican', label: 'Mexican', flag: '🇲🇽', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80', signatureDish: 'Birria Tacos & Guacamole', count: 10, description: 'Fiery salsas, roasted chilies, lime, and crisp tortillas' },
  { type: 'Japanese', label: 'Japanese', flag: '🇯🇵', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80', signatureDish: 'Tonkotsu Ramen & Salmon Teriyaki', count: 9, description: 'Umami-rich broths, delicate sushi, and balanced seasoning' },
  { type: 'Thai', label: 'Thai', flag: '🇹🇭', image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=600&q=80', signatureDish: 'Pad Thai & Green Coconut Curry', count: 8, description: 'Sweet, sour, spicy, and salty harmony with lemongrass' },
  { type: 'Chinese', label: 'Chinese', flag: '🇨🇳', image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80', signatureDish: 'Kung Pao Chicken & Dim Sum', count: 9, description: 'Wok hei stir-fries, savory dumplings, and szechuan peppers' },
  { type: 'Korean', label: 'Korean', flag: '🇰🇷', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80', signatureDish: 'Bibimbap & Crispy Fried Chicken', count: 7, description: 'Fermented kimchi, spicy gochujang, and sesame aromas' },
  { type: 'Mediterranean', label: 'Mediterranean', flag: '🇬🇷', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', signatureDish: 'Greek Salad & Grilled Sea Bass', count: 11, description: 'Heart-healthy olive oils, fresh feta, lemon, and oregano' },
  { type: 'Turkish', label: 'Turkish', flag: '🇹🇷', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=600&q=80', signatureDish: 'Shish Kebab & Menemen', count: 6, description: 'Smoky charcoal grills, sumac, and warm flatbreads' },
  { type: 'Middle Eastern', label: 'Middle Eastern', flag: '🇱🇧', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80', signatureDish: 'Creamy Hummus & Falafel Bowl', count: 8, description: 'Silky tahini, za\'atar, pomegranate molasses, and mint' },
  { type: 'French', label: 'French', flag: '🇫🇷', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', signatureDish: 'Ratatouille & Soufflé', count: 7, description: 'Classic culinary techniques, butter, shallots, and wine' },
  { type: 'Spanish', label: 'Spanish', flag: '🇪🇸', image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=600&q=80', signatureDish: 'Seafood Paella & Patatas Bravas', count: 8, description: 'Saffron-infused rice, gambas al ajillo, and tapas' },
  { type: 'American', label: 'American', flag: '🇺🇸', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', signatureDish: 'Smash Burger & Mac and Cheese', count: 11, description: 'Comfort food classics, BBQ briskets, and artisan pies' },
  { type: 'Greek', label: 'Greek', flag: '🇬🇷', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', signatureDish: 'Moussaka & Souvlaki', count: 7, description: 'Layers of roasted eggplant, tzatziki, and kalamata olives' },
];

export const DEFAULT_COLLECTIONS = [
  { id: 'col-desi', name: 'Desi Classics & Curries', description: 'Royal biryanis, slow-cooked nihari, karahi, and traditional mithai', iconName: 'Flame', recipeIds: ['rec-2', 'rec-6', 'rec-17', 'rec-20', 'rec-21', 'rec-22', 'rec-23', 'rec-24', 'rec-25', 'rec-26', 'rec-28', 'rec-29'], isDefault: true, createdAt: '2026-08-01' },
  { id: 'col-desserts', name: 'Sweets & Desserts', description: 'Decadent cakes, saffron gulab jamun, tiramisu, and warm halwa', iconName: 'Cake', recipeIds: ['rec-5', 'rec-26', 'rec-27', 'rec-28', 'rec-29', 'rec-30'], isDefault: true, createdAt: '2026-08-01' },
  { id: 'col-dinner', name: 'Dinner Ideas', description: 'Crowd-pleasing mains for weeknight & weekend dinners', iconName: 'Utensils', recipeIds: ['rec-1', 'rec-2', 'rec-4', 'rec-9', 'rec-11', 'rec-21', 'rec-22'], isDefault: true, createdAt: '2026-08-01' },
  { id: 'col-weekend', name: 'Weekend Feasts', description: 'Leisurely cooking projects and indulgent royal feasts', iconName: 'Sparkles', recipeIds: ['rec-1', 'rec-2', 'rec-3', 'rec-7', 'rec-21', 'rec-23'], isDefault: true, createdAt: '2026-08-01' },
  { id: 'col-healthy', name: 'Healthy Recipes', description: 'Nutrient-packed, vibrant, and clean meals', iconName: 'HeartPulse', recipeIds: ['rec-4', 'rec-7', 'rec-14', 'rec-19', 'rec-24'], isDefault: true, createdAt: '2026-08-01' },
  { id: 'col-family', name: 'Family Favorites', description: 'Tried-and-true recipes everyone loves at the table', iconName: 'Users', recipeIds: ['rec-1', 'rec-6', 'rec-10', 'rec-22', 'rec-25', 'rec-27'], isDefault: true, createdAt: '2026-08-01' },
];
