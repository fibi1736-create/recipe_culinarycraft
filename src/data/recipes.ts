import { Recipe } from '../types';

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'rec-1',
    slug: 'creamy-garlic-chicken-pasta',
    title: 'Creamy Garlic Chicken Pasta',
    description: 'Tender seasoned chicken breasts seared golden and tossed with al dente fettuccine in a velvety garlic parmesan cream sauce.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=1600&q=85',
    rating: 4.9,
    reviewsCount: 348,
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 4,
    difficulty: 'Easy',
    calories: 620,
    cuisine: 'Italian',
    foodTypes: ['Savory', 'Dinner', 'Main Courses', 'Lunch'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['High-Protein'],
    proteins: ['Chicken', 'Pasta', 'Cheese'],
    author: {
      name: 'Chef Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      role: 'Executive Italian Chef'
    },
    publishDate: '2026-07-12',
    ingredients: [
      { id: 'i1', name: 'Chicken breast (cut into bite-sized strips)', quantity: 500, unit: 'g', notes: 'Boneless, skinless', category: 'Meat & Seafood' },
      { id: 'i2', name: 'Fettuccine pasta', quantity: 300, unit: 'g', notes: 'Can substitute with Penne', category: 'Bakery & Grains' },
      { id: 'i3', name: 'Garlic cloves (minced)', quantity: 5, unit: 'cloves', notes: 'Freshly minced', category: 'Vegetables & Produce' },
      { id: 'i4', name: 'Heavy whipping cream', quantity: 250, unit: 'ml', notes: 'Full fat for best richness', category: 'Dairy & Eggs' },
      { id: 'i5', name: 'Parmesan cheese (finely grated)', quantity: 80, unit: 'g', notes: 'Parmigiano-Reggiano', category: 'Dairy & Eggs' },
      { id: 'i6', name: 'Unsalted butter', quantity: 2, unit: 'tbsp', category: 'Dairy & Eggs' },
      { id: 'i7', name: 'Extra virgin olive oil', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i8', name: 'Italian seasoning & paprika', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i9', name: 'Fresh Italian parsley (chopped)', quantity: 2, unit: 'tbsp', notes: 'Garnish', category: 'Vegetables & Produce' },
      { id: 'i10', name: 'Salt & freshly cracked black pepper', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Cook the Pasta',
        description: 'Bring a large pot of salted water to a rolling boil. Add fettuccine pasta and cook according to package instructions until al dente (about 8-10 minutes). Reserve 1/2 cup pasta cooking water, then drain.',
        timerMinutes: 9,
        tip: 'Salting the pasta water generously ensures seasoned noodles from the core.'
      },
      {
        stepNumber: 2,
        title: 'Season and Sear Chicken',
        description: 'Pat the chicken strips dry with paper towels. Season evenly with Italian seasoning, paprika, salt, and black pepper. Heat 1 tbsp olive oil and 1 tbsp butter in a large skillet over medium-high heat.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Brown to Perfection',
        description: 'Add chicken in a single layer without overcrowding. Cook for 6-8 minutes, flipping once, until nicely browned and internal temperature reaches 165°F (74°C). Transfer chicken to a clean plate and keep warm.',
        timerMinutes: 7,
        tip: 'Do not stir too frequently; let the edges caramelize for maximum savory fond.'
      },
      {
        stepNumber: 4,
        title: 'Aromatics & Cream Sauce',
        description: 'In the same skillet over medium heat, add remaining butter and olive oil. Add minced garlic and sauté for 60 seconds until fragrant. Pour in heavy cream and scrape up any golden bits from the bottom of the pan. Bring to a gentle simmer.',
        timerMinutes: 3
      },
      {
        stepNumber: 5,
        title: 'Melt Cheese & Emulsify',
        description: 'Lower heat to low. Whisk in grated Parmesan cheese in small handfuls until melted and silky smooth. If the sauce is too thick, add a splash of reserved warm pasta water.',
        timerMinutes: 2
      },
      {
        stepNumber: 6,
        title: 'Toss & Serve',
        description: 'Toss the cooked pasta and seared chicken directly into the warm cream sauce. Garnish with chopped fresh parsley and extra cracked black pepper. Serve piping hot!',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 620,
      protein: 42,
      carbs: 54,
      fat: 26,
      fiber: 3
    },
    tags: ['Pasta', 'Quick Dinner', 'Comfort Food', 'Creamy', 'Kid Friendly'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-2',
    slug: 'fragrant-mutton-dum-biryani',
    title: 'Royal Mutton Dum Biryani',
    description: 'Slow-cooked succulent mutton layered with long-grain aged basmati rice, caramelized onions, saffron milk, and aromatic whole spices.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1600&q=85',
    rating: 5.0,
    reviewsCount: 512,
    prepTime: 30,
    cookTime: 50,
    totalTime: 80,
    servings: 6,
    difficulty: 'Hard',
    calories: 710,
    cuisine: 'Pakistani',
    foodTypes: ['Savory', 'Dinner', 'Main Courses', 'Street Food'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['High-Protein'],
    proteins: ['Mutton/Lamb', 'Rice'],
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Spice Master'
    },
    publishDate: '2026-06-20',
    ingredients: [
      { id: 'i201', name: 'Bone-in mutton shoulder (curry cut)', quantity: 800, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i202', name: 'Aged Basmati rice (soaked for 30m)', quantity: 500, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i203', name: 'Greek yogurt', quantity: 200, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i204', name: 'Golden fried onions (Birista)', quantity: 150, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i205', name: 'Ginger garlic paste', quantity: 3, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i206', name: 'Pure desi ghee', quantity: 4, unit: 'tbsp', category: 'Dairy & Eggs' },
      { id: 'i207', name: 'Saffron strands soaked in warm milk', quantity: 4, unit: 'tbsp', category: 'Beverages' },
      { id: 'i208', name: 'Biryani spice blend (Cardamom, mace, cinnamon, star anise)', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i209', name: 'Fresh mint & cilantro leaves', quantity: 1, unit: 'cup', category: 'Vegetables & Produce' },
      { id: 'i210', name: 'Kewra / Rose water essence', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Marinate the Mutton',
        description: 'Mix mutton pieces with yogurt, ginger garlic paste, red chili powder, turmeric, garam masala, half of the fried onions, mint, and salt. Allow to marinate for at least 1 hour.',
        timerMinutes: 30,
        tip: 'Marinating overnight in the fridge produces the most tender, melt-in-the-mouth meat.'
      },
      {
        stepNumber: 2,
        title: 'Parboil the Basmati Rice',
        description: 'Boil 3 liters of water with whole spices (bay leaf, cloves, cardamom) and salt. Add soaked basmati rice and cook until 70% done (grain breaks but still firm). Drain immediately.',
        timerMinutes: 6
      },
      {
        stepNumber: 3,
        title: 'Sear Meat Base (Yakhni)',
        description: 'Heat ghee in a heavy-bottomed Dutch oven. Add marinated mutton and sear on high heat for 10 minutes until aromatic oil separates. Cover and slow cook until mutton is tender.',
        timerMinutes: 25
      },
      {
        stepNumber: 4,
        title: 'Layer the Biryani',
        description: 'Evenly spread parboiled rice over the cooked mutton. Top with remaining fried onions, chopped mint, cilantro, saffron milk, desi ghee, and a few drops of kewra essence.',
        timerMinutes: 5
      },
      {
        stepNumber: 5,
        title: 'Dum Cooking (Steam Seal)',
        description: 'Seal the pot tightly with aluminum foil or dough and place the lid. Cook on high for 5 minutes, then place on a heavy tawa over lowest heat for 20 minutes.',
        timerMinutes: 20,
        tip: 'Dum sealing locks in all the delicate herbal and saffron steam.'
      },
      {
        stepNumber: 6,
        title: 'Rest & Fluff',
        description: 'Turn off heat and let rest unopened for 10 minutes. Gently fluff the layers with a flat spoon to reveal contrasting white, saffron, and masala grains. Serve with chilled mint raita.',
        timerMinutes: 10
      }
    ],
    nutrition: {
      calories: 710,
      protein: 48,
      carbs: 68,
      fat: 28,
      fiber: 4
    },
    tags: ['Biryani', 'Traditional', 'Feast', 'Pakistani', 'Saffron', 'Rice Dishes'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-3',
    slug: 'saffron-seafood-paella',
    title: 'Valencia Saffron Seafood Paella',
    description: 'Iconic Spanish saffron bomba rice simmered in rich seafood broth with jumbo tiger prawns, tender calamari rings, and black mussels.',
    image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1600&q=85',
    rating: 4.85,
    reviewsCount: 219,
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    difficulty: 'Medium',
    calories: 540,
    cuisine: 'Spanish',
    foodTypes: ['Savory', 'Dinner', 'Main Courses'],
    dietaryType: 'Seafood',
    extraDietary: ['Gluten-Free', 'High-Protein', 'Dairy-Free'],
    proteins: ['Seafood', 'Fish', 'Rice'],
    author: {
      name: 'Chef Carlos Mendez',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Spanish Tapas Specialist'
    },
    publishDate: '2026-05-18',
    ingredients: [
      { id: 'i301', name: 'Jumbo prawns (peeled, tails on)', quantity: 300, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i302', name: 'Fresh mussels (scrubbed and debearded)', quantity: 250, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i303', name: 'Calamari / Squid rings', quantity: 200, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i304', name: 'Bomba or Arborio Spanish rice', quantity: 300, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i305', name: 'Rich seafood or fish stock', quantity: 750, unit: 'ml', category: 'Pantry & Spices' },
      { id: 'i306', name: 'Spanish saffron strands', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' },
      { id: 'i307', name: 'Sweet Spanish smoked paprika (Pimentón)', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i308', name: 'Crushed ripe tomatoes', quantity: 150, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i309', name: 'Red bell pepper (strips)', quantity: 1, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i310', name: 'Garlic cloves (minced)', quantity: 4, unit: 'cloves', category: 'Vegetables & Produce' },
      { id: 'i311', name: 'Lemon wedges & chopped parsley', quantity: 1, unit: 'set', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sear the Seafood',
        description: 'Heat 3 tbsp olive oil in a 14-inch paella pan. Sear jumbo prawns and calamari for 2 minutes until lightly browned. Remove and set aside.',
        timerMinutes: 3
      },
      {
        stepNumber: 2,
        title: 'Build the Sofrito',
        description: 'In the remaining oil, sauté chopped onion, red bell pepper, and minced garlic for 4-5 minutes until soft. Stir in crushed tomatoes and smoked paprika.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        title: 'Toast Rice & Infuse Saffron',
        description: 'Add the Bomba rice and stir for 2 minutes to coat every grain with sofrito oil. Crush saffron into warm seafood broth, then pour into the pan.',
        timerMinutes: 2,
        tip: 'Do not stir the rice once the broth starts simmering to achieve the crispy socarrat bottom crust!'
      },
      {
        stepNumber: 4,
        title: 'Simmer the Rice',
        description: 'Cook on medium heat for 12 minutes until broth is partially absorbed and rice is visible.',
        timerMinutes: 12
      },
      {
        stepNumber: 5,
        title: 'Arrange Seafood & Form Socarrat',
        description: 'Nestle seared prawns, calamari, and mussels into the rice. Cook for another 6-8 minutes until mussels open and rice crackles softly at the bottom.',
        timerMinutes: 7
      },
      {
        stepNumber: 6,
        title: 'Rest & Garnish',
        description: 'Cover loosely with clean kitchen towel for 5 minutes. Garnish with lemon wedges and fresh flat-leaf parsley.',
        timerMinutes: 5
      }
    ],
    nutrition: {
      calories: 540,
      protein: 38,
      carbs: 62,
      fat: 14,
      fiber: 4
    },
    tags: ['Seafood', 'Paella', 'Spanish', 'Gluten-Free', 'Showstopper'],
    isPopular: true,
    isTrending: false
  },
  {
    id: 'rec-4',
    slug: 'crispy-tofu-green-goddess-bowl',
    title: 'Crispy Tofu & Green Goddess Grain Bowl',
    description: 'Crispy sesame-crusted tofu cubes served over warm tri-color quinoa, baby spinach, avocado, edamame, and drizzled with a creamy herb tahini dressing.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=85',
    rating: 4.92,
    reviewsCount: 184,
    prepTime: 10,
    cookTime: 15,
    totalTime: 25,
    servings: 2,
    difficulty: 'Easy',
    calories: 460,
    cuisine: 'Mediterranean',
    foodTypes: ['Salads', 'Lunch', 'Dinner', 'Savory'],
    dietaryType: 'Vegan',
    extraDietary: ['Gluten-Free', 'Dairy-Free', 'Healthy', 'High-Protein'],
    proteins: ['Vegetables', 'Fruits', 'Rice'],
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'Plant-Based Nutritionist'
    },
    publishDate: '2026-08-05',
    ingredients: [
      { id: 'i401', name: 'Extra-firm tofu (pressed and cubed)', quantity: 350, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i402', name: 'Cooked tri-color quinoa', quantity: 200, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i403', name: 'Ripe Hass avocado (sliced)', quantity: 1, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i404', name: 'Shelled edamame (steamed)', quantity: 100, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i405', name: 'Baby cucumber (ribbons or slices)', quantity: 1, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i406', name: 'Cornstarch (for crispy crust)', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i407', name: 'Sesame oil & tamari soy sauce', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i408', name: 'Toasted white & black sesame seeds', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i409', name: 'Green goddess dressing (Tahini, lemon, basil, dill, garlic)', quantity: 4, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Coat the Tofu',
        description: 'Toss pressed tofu cubes in tamari, garlic powder, and cornstarch until evenly coated in a light dusting.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Pan Fry Tofu',
        description: 'Heat sesame oil in a non-stick skillet over medium-high heat. Fry tofu for 8-10 minutes, turning every 2 minutes until all sides are deep golden and crunchy.',
        timerMinutes: 8,
        tip: 'Pressing extra moisture out of tofu is key to achieving that restaurant-crisp bite.'
      },
      {
        stepNumber: 3,
        title: 'Whisk Goddess Dressing',
        description: 'Blend tahini, fresh basil, dill, lemon juice, 1 small garlic clove, olive oil, cold water, and sea salt until smooth and pale green.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Assemble Bowls',
        description: 'Divide fluffy warm quinoa between two bowls. Arrange crispy tofu, sliced avocado, edamame, cucumber ribbons, and fresh greens. Drizzle generously with Green Goddess dressing.',
        timerMinutes: 3
      }
    ],
    nutrition: {
      calories: 460,
      protein: 26,
      carbs: 42,
      fat: 22,
      fiber: 11
    },
    tags: ['Vegan', 'Superfood', 'Quick Lunch', 'Meal Prep', 'High Fiber'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-5',
    slug: 'molten-lava-chocolate-cake',
    title: 'Decadent Molten Lava Chocolate Cake',
    description: 'Warm individual chocolate cakes with rich Belgian dark cocoa, crisp edges, and an irresistible gooey liquid chocolate core.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=85',
    rating: 4.96,
    reviewsCount: 420,
    prepTime: 12,
    cookTime: 12,
    totalTime: 24,
    servings: 4,
    difficulty: 'Medium',
    calories: 490,
    cuisine: 'French',
    foodTypes: ['Sweets & Desserts', 'Baked Goods'],
    dietaryType: 'Vegetarian',
    extraDietary: [],
    proteins: ['Chocolate', 'Eggs', 'Cheese'],
    author: {
      name: 'Chef Pierre Dubois',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Master Pastry Chef'
    },
    publishDate: '2026-07-28',
    ingredients: [
      { id: 'i501', name: '70% Dark bittersweet chocolate (chopped)', quantity: 200, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i502', name: 'Unsalted high-fat butter', quantity: 100, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i503', name: 'Whole large eggs', quantity: 2, unit: 'large', category: 'Dairy & Eggs' },
      { id: 'i504', name: 'Egg yolks', quantity: 2, unit: 'yolks', category: 'Dairy & Eggs' },
      { id: 'i505', name: 'Powdered confectioners sugar', quantity: 60, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i506', name: 'All-purpose flour', quantity: 30, unit: 'g', notes: 'Sifted', category: 'Bakery & Grains' },
      { id: 'i507', name: 'Pure vanilla extract & sea salt', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i508', name: 'Vanilla bean ice cream & fresh raspberries', quantity: 1, unit: 'serving', category: 'Dairy & Eggs' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Preheat & Prep Ramekins',
        description: 'Preheat oven to 425°F (220°C). Butter four 6-oz ramekins thoroughly and dust with unsweetened cocoa powder, tapping out any excess.',
        timerMinutes: 3,
        tip: 'Proper buttering and cocoa dusting guarantees the cakes invert effortlessly without tearing.'
      },
      {
        stepNumber: 2,
        title: 'Melt Chocolate & Butter',
        description: 'Melt dark chocolate and butter together in a heatproof bowl set over a pot of simmering water (bain-marie), stirring until completely glossy and smooth. Let cool slightly.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        title: 'Whip Eggs and Sugar',
        description: 'In a separate bowl, whisk together whole eggs, egg yolks, powdered sugar, vanilla extract, and pinch of salt until pale and slightly frothy.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Combine & Fold Flour',
        description: 'Gently fold melted chocolate into the egg mixture. Sift in all-purpose flour and fold with a rubber spatula just until combined. Do not overmix.',
        timerMinutes: 2
      },
      {
        stepNumber: 5,
        title: 'Bake for Molten Center',
        description: 'Divide batter among ramekins. Bake for 12-13 minutes until the cake sides are firm and set, but the center is still soft and slightly jiggly.',
        timerMinutes: 12
      },
      {
        stepNumber: 6,
        title: 'Invert & Serve',
        description: 'Let stand for 1 minute. Run a thin knife around edges, invert onto dessert plates, dust with powdered sugar, and serve immediately with vanilla bean ice cream.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 490,
      protein: 8,
      carbs: 45,
      fat: 32,
      fiber: 4
    },
    tags: ['Chocolate', 'Dessert', 'French', 'Baking', 'Date Night'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-6',
    slug: 'authentic-butter-chicken-makhani',
    title: 'Velvety Butter Chicken (Murgh Makhani)',
    description: 'Smoky tandoori-spiced chicken pieces simmered in an ultra-creamy tomato, cashew, and butter gravy perfumed with dried fenugreek leaves (kasoori methi).',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1600&q=85',
    rating: 4.95,
    reviewsCount: 680,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: 'Medium',
    calories: 590,
    cuisine: 'Indian',
    foodTypes: ['Savory', 'Dinner', 'Main Courses'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['Gluten-Free', 'High-Protein'],
    proteins: ['Chicken', 'Cheese'],
    author: {
      name: 'Chef Sanjeev Kapur',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'North Indian Culinary Master'
    },
    publishDate: '2026-06-15',
    ingredients: [
      { id: 'i601', name: 'Boneless chicken thighs (cubed)', quantity: 600, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i602', name: 'Ripe San Marzano style tomatoes (pureed)', quantity: 500, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i603', name: 'Cashew nuts (soaked in hot water)', quantity: 40, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i604', name: 'Fresh heavy cream', quantity: 100, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i605', name: 'Butter (divided)', quantity: 50, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i606', name: 'Kashmiri red chili powder', quantity: 2, unit: 'tsp', notes: 'Gives rich red hue with mild heat', category: 'Pantry & Spices' },
      { id: 'i607', name: 'Garam masala & ground cardamom', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i608', name: 'Crushed Kasoori Methi (dried fenugreek)', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i609', name: 'Honey or sugar (to balance tang)', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i610', name: 'Garlic ginger paste', quantity: 2, unit: 'tbsp', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Marinate & Broil Chicken',
        description: 'Toss chicken cubes in yogurt, Kashmiri chili, ginger garlic paste, and salt. Broil or sear in a smoking hot pan for 8 minutes until charred at edges.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Tomato & Cashew Velvet Base',
        description: 'Simmer pureed tomatoes with soaked cashews, cinnamon, and cardamoms in 1 cup water for 12 minutes. Blend into an ultra-silky smooth puree and strain.',
        timerMinutes: 12,
        tip: 'Straining the blended sauce through a fine sieve delivers that signature restaurant silkiness.'
      },
      {
        stepNumber: 3,
        title: 'Cook Makhani Gravy',
        description: 'Melt half the butter in a pan. Add remaining ginger garlic paste and Kashmiri chili. Pour in the strained tomato sauce and simmer for 6 minutes.',
        timerMinutes: 6
      },
      {
        stepNumber: 4,
        title: 'Simmer Chicken in Sauce',
        description: 'Add charred chicken pieces to the simmering sauce. Lower heat, cover, and let simmer for 8 minutes so flavors meld together.',
        timerMinutes: 8
      },
      {
        stepNumber: 5,
        title: 'Finish with Cream & Fenugreek',
        description: 'Stir in heavy cream, remaining cold butter, honey, and crushed kasoori methi between your palms. Serve warm with garlic naan or basmati rice.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 590,
      protein: 44,
      carbs: 18,
      fat: 38,
      fiber: 3
    },
    tags: ['Butter Chicken', 'Curry', 'Indian Classic', 'Comfort Food'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-7',
    slug: 'mediterranean-grilled-sea-bass',
    title: 'Mediterranean Herb Grilled Sea Bass',
    description: 'Whole fresh Mediterranean sea bass grilled over charcoal with lemon zest, fresh rosemary, capers, kalamata olives, and extra virgin olive oil.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1600&q=85',
    rating: 4.88,
    reviewsCount: 165,
    prepTime: 15,
    cookTime: 18,
    totalTime: 33,
    servings: 2,
    difficulty: 'Medium',
    calories: 380,
    cuisine: 'Greek',
    foodTypes: ['Savory', 'Dinner', 'Main Courses'],
    dietaryType: 'Seafood',
    extraDietary: ['Gluten-Free', 'Dairy-Free', 'Low-Carb', 'Keto', 'Healthy', 'High-Protein'],
    proteins: ['Fish', 'Seafood'],
    author: {
      name: 'Chef Nikos Alexopoulos',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      role: 'Aegean Seafood Specialist'
    },
    publishDate: '2026-07-02',
    ingredients: [
      { id: 'i701', name: 'Fresh whole Mediterranean sea bass (cleaned & scaled)', quantity: 2, unit: 'whole (400g each)', category: 'Meat & Seafood' },
      { id: 'i702', name: 'Fresh lemon slices and juice', quantity: 2, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i703', name: 'Fresh rosemary and oregano sprigs', quantity: 4, unit: 'sprigs', category: 'Vegetables & Produce' },
      { id: 'i704', name: 'Kalamata olives (pitted & halved)', quantity: 60, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i705', name: 'Capers (drained)', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i706', name: 'Greek extra virgin olive oil', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i707', name: 'Garlic cloves (thinly sliced)', quantity: 4, unit: 'cloves', category: 'Vegetables & Produce' },
      { id: 'i708', name: 'Flaky Maldon sea salt & crushed pepper', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Score and Season Fish',
        description: 'Make 3 diagonal slashes on both sides of each sea bass. Rub inside and out with olive oil, sea salt, and black pepper.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Stuff Cavity',
        description: 'Stuff the fish cavity with fresh lemon slices, rosemary sprigs, and garlic slices for deep aromatic steam.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Grill to Golden Crispness',
        description: 'Place on a preheated medium-high grill or cast iron grill pan. Cook for 7-8 minutes per side without disturbing until skin is crisp and flesh flakes easily with a fork.',
        timerMinutes: 15,
        tip: 'Ensure grill grates are smoking hot and lightly oiled before laying the fish down to prevent skin sticking.'
      },
      {
        stepNumber: 4,
        title: 'Sauté Warm Caper Olive Topping',
        description: 'Quickly warm remaining olive oil with capers, kalamata olives, and fresh lemon juice in a small pan for 2 minutes. Spoon over the grilled fish and serve with a crisp Greek salad.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 380,
      protein: 46,
      carbs: 4,
      fat: 19,
      fiber: 1
    },
    tags: ['Keto', 'Low-Carb', 'Grilled Fish', 'Greek', 'Healthy Dinner'],
    isPopular: false,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-8',
    slug: 'quick-thai-basil-chicken',
    title: 'Speedy Thai Basil Chicken (Pad Krapow Gai)',
    description: 'Vibrant street-style minced chicken stir-fried with fragrant holy basil, garlic, bird’s eye chilies, and savory dark soy sauce over jasmine rice with a crispy fried egg.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1600&q=85',
    rating: 4.91,
    reviewsCount: 290,
    prepTime: 7,
    cookTime: 8,
    totalTime: 15,
    servings: 2,
    difficulty: 'Easy',
    calories: 480,
    cuisine: 'Thai',
    foodTypes: ['Street Food', 'Lunch', 'Dinner', 'Savory'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['Dairy-Free', 'High-Protein', 'Healthy'],
    proteins: ['Chicken', 'Eggs', 'Rice'],
    author: {
      name: 'Chef Somchai Prasert',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      role: 'Bangkok Wok Master'
    },
    publishDate: '2026-08-10',
    ingredients: [
      { id: 'i801', name: 'Ground or finely minced chicken thigh', quantity: 350, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i802', name: 'Fresh Thai holy basil (or sweet basil)', quantity: 2, unit: 'packed cups', category: 'Vegetables & Produce' },
      { id: 'i803', name: 'Thai bird’s eye chilies (crushed)', quantity: 4, unit: 'chilies', notes: 'Adjust to heat preference', category: 'Vegetables & Produce' },
      { id: 'i804', name: 'Garlic cloves (crushed)', quantity: 6, unit: 'cloves', category: 'Vegetables & Produce' },
      { id: 'i805', name: 'Oyster sauce', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i806', name: 'Fish sauce & dark sweet soy sauce', quantity: 1, unit: 'tbsp each', category: 'Pantry & Spices' },
      { id: 'i807', name: 'Eggs (for crispy Thai fried egg topper)', quantity: 2, unit: 'large', category: 'Dairy & Eggs' },
      { id: 'i808', name: 'Steamed Jasmine rice', quantity: 2, unit: 'bowls', category: 'Bakery & Grains' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Fry Crispy Thai Eggs',
        description: 'Heat 3 tbsp oil in a wok over high heat until shimmering. Crack in eggs and fry until whites are puffed, golden-crisp around edges, with runny yolks. Remove and set aside.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Aromatics Sizzle',
        description: 'In the hot wok with 1 tbsp oil, toss in crushed garlic and chilies. Sauté for 30 seconds until intense aroma rises.',
        timerMinutes: 1
      },
      {
        stepNumber: 3,
        title: 'Wok-Fry Chicken',
        description: 'Add minced chicken, breaking it apart with a spatula. Cook on high heat for 3-4 minutes until cooked through and starting to brown.',
        timerMinutes: 4
      },
      {
        stepNumber: 4,
        title: 'Sauce Glaze & Basil Fold',
        description: 'Pour in oyster sauce, fish sauce, dark soy sauce, and 1 tsp sugar. Stir vigorously for 1 minute. Turn off heat, add holy basil leaves, and toss for 20 seconds until just wilted.',
        timerMinutes: 1,
        tip: 'Tossing the basil with heat off keeps the essential oils fresh and avoids bitterness.'
      }
    ],
    nutrition: {
      calories: 480,
      protein: 36,
      carbs: 48,
      fat: 16,
      fiber: 2
    },
    tags: ['15-Minute Meal', 'Thai Street Food', 'Spicy', 'Easy Weeknight'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-9',
    slug: 'vegan-japanese-miso-ramen',
    title: 'Rich Vegan Japanese Miso Ramen',
    description: 'Hearty umami broth brewed from roasted garlic miso paste and kombu, served with springy ramen noodles, charred king oyster mushrooms, sweet corn, and chili oil.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1600&q=85',
    rating: 4.87,
    reviewsCount: 198,
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 2,
    difficulty: 'Medium',
    calories: 510,
    cuisine: 'Japanese',
    foodTypes: ['Soups', 'Dinner', 'Savory', 'Lunch'],
    dietaryType: 'Vegan',
    extraDietary: ['Dairy-Free', 'Healthy'],
    proteins: ['Vegetables', 'Pasta'],
    author: {
      name: 'Chef Kenji Takahashi',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      role: 'Tokyo Ramen Craftsman'
    },
    publishDate: '2026-07-19',
    ingredients: [
      { id: 'i901', name: 'Fresh Japanese ramen noodles', quantity: 250, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i902', name: 'Red and white miso paste blend', quantity: 4, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i903', name: 'Vegetable broth or kombu dashi', quantity: 800, unit: 'ml', category: 'Pantry & Spices' },
      { id: 'i904', name: 'Unsweetened oat milk or soy milk (for creamy broth)', quantity: 150, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i905', name: 'King oyster mushrooms (sliced thick)', quantity: 200, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i906', name: 'Bok choy (halved)', quantity: 2, unit: 'heads', category: 'Vegetables & Produce' },
      { id: 'i907', name: 'Sweet corn kernels & edamame', quantity: 100, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i908', name: 'Sesame paste (Tahini or Nerigoma)', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i909', name: 'Japanese Rayu chili oil & nori sheets', quantity: 1, unit: 'serving', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sear Umami Mushrooms',
        description: 'Heat sesame oil in a skillet. Sear king oyster mushroom slices for 4-5 minutes until deeply caramelized and tender.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        title: 'Build Creamy Miso Broth',
        description: 'In a soup pot, whisk together sesame paste, red & white miso, grated ginger, and minced garlic with vegetable stock. Bring to a low simmer, then whisk in oat milk for rich body.',
        timerMinutes: 8,
        tip: 'Never boil miso broth vigorously; simmering gently preserves its aromatic live fermentation qualities.'
      },
      {
        stepNumber: 3,
        title: 'Cook Noodles & Greens',
        description: 'In a separate pot of boiling water, cook ramen noodles for 2-3 minutes. In the last 30 seconds, drop in bok choy to blanch.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Plate & Garnish',
        description: 'Divide noodles between two deep ramen bowls. Ladle hot miso broth over noodles. Top with seared mushrooms, blanched bok choy, sweet corn, nori sheet, and a drizzle of Rayu chili oil.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 510,
      protein: 21,
      carbs: 72,
      fat: 16,
      fiber: 8
    },
    tags: ['Vegan', 'Ramen', 'Japanese', 'Soup', 'Comfort Bowl'],
    isPopular: true,
    isTrending: false
  },
  {
    id: 'rec-10',
    slug: 'authentic-margherita-pizza',
    title: 'Wood-Fired Style Margherita Pizza',
    description: 'Neapolitan-style pizza dough with blistered airy crust, crushed San Marzano tomato sauce, fresh buffalo mozzarella, and aromatic basil leaves.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=85',
    rating: 4.93,
    reviewsCount: 310,
    prepTime: 20,
    cookTime: 10,
    totalTime: 30,
    servings: 3,
    difficulty: 'Medium',
    calories: 580,
    cuisine: 'Italian',
    foodTypes: ['Baked Goods', 'Savory', 'Lunch', 'Dinner'],
    dietaryType: 'Vegetarian',
    extraDietary: [],
    proteins: ['Cheese', 'Pasta'],
    author: {
      name: 'Pizzaiolo Matteo Conti',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      role: 'Naples Certified Pizzaiolo'
    },
    publishDate: '2026-06-30',
    ingredients: [
      { id: 'i1001', name: '00 Pizza flour fermented dough ball', quantity: 280, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i1002', name: 'Canned San Marzano tomatoes (crushed by hand)', quantity: 150, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1003', name: 'Fresh Buffalo Mozzarella (torn into chunks)', quantity: 150, unit: 'g', notes: 'Drained on paper towels', category: 'Dairy & Eggs' },
      { id: 'i1004', name: 'Fresh sweet basil leaves', quantity: 10, unit: 'leaves', category: 'Vegetables & Produce' },
      { id: 'i1005', name: 'Extra virgin olive oil', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1006', name: 'Sea salt and semolina for dusting', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Preheat Pizza Stone or Steel',
        description: 'Preheat oven to maximum temperature (500°F - 550°F / 260°C - 290°C) with a pizza stone or heavy baking steel on the top rack for 45 minutes.',
        timerMinutes: 20,
        tip: 'A blistering hot baking steel mimics a 900°F Neapolitan wood oven for maximum oven spring.'
      },
      {
        stepNumber: 2,
        title: 'Stretch the Dough',
        description: 'Dust work surface with semolina. Press dough from the center outwards to push air into the crust (cornicione). Gently stretch to a 12-inch circle.',
        timerMinutes: 4
      },
      {
        stepNumber: 3,
        title: 'Sauce and Cheese',
        description: 'Spread crushed San Marzano tomatoes evenly leaving a 1-inch border. Distribute torn buffalo mozzarella pieces across the pizza.',
        timerMinutes: 2
      },
      {
        stepNumber: 4,
        title: 'Bake to Leopard Spotting',
        description: 'Slide pizza onto the hot stone. Bake for 7-9 minutes until crust is charred with golden spots and cheese is bubbling.',
        timerMinutes: 8
      },
      {
        stepNumber: 5,
        title: 'Basil & Olive Oil Finish',
        description: 'Remove pizza immediately, scatter fresh basil leaves, and finish with a swirl of extra virgin olive oil before slicing.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 580,
      protein: 24,
      carbs: 68,
      fat: 22,
      fiber: 4
    },
    tags: ['Pizza', 'Italian', 'Vegetarian', 'Cheesy', 'Baking'],
    isPopular: true,
    isTrending: false
  },
  {
    id: 'rec-11',
    slug: 'street-style-mexican-birria-tacos',
    title: 'Juicy Mexican Birria Tacos (Quesabirria)',
    description: 'Slow-braised beef chuck in a smoky ancho and guajillo chili broth, folded into crispy corn tortillas dipped in consome with melted Oaxaca cheese and cilantro.',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1600&q=85',
    rating: 4.97,
    reviewsCount: 540,
    prepTime: 20,
    cookTime: 60,
    totalTime: 80,
    servings: 4,
    difficulty: 'Hard',
    calories: 680,
    cuisine: 'Mexican',
    foodTypes: ['Street Food', 'Dinner', 'Savory'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['Gluten-Free', 'High-Protein'],
    proteins: ['Beef', 'Cheese'],
    author: {
      name: 'Chef Valeria Morales',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Jalisco Street Food Authority'
    },
    publishDate: '2026-08-01',
    ingredients: [
      { id: 'i1101', name: 'Beef chuck roast (cut into large chunks)', quantity: 900, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i1102', name: 'Dried Guajillo & Ancho chilies (stemmed and seeded)', quantity: 6, unit: 'chilies', category: 'Pantry & Spices' },
      { id: 'i1103', name: 'White corn tortillas', quantity: 12, unit: 'tortillas', category: 'Bakery & Grains' },
      { id: 'i1104', name: 'Oaxaca or Mozzarella cheese (shredded)', quantity: 250, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i1105', name: 'White onion & fresh cilantro (finely diced)', quantity: 1, unit: 'cup', category: 'Vegetables & Produce' },
      { id: 'i1106', name: 'Beef broth / stock', quantity: 800, unit: 'ml', category: 'Pantry & Spices' },
      { id: 'i1107', name: 'Mexican oregano, cumin, cinnamon stick, cloves', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1108', name: 'Fresh lime wedges', quantity: 2, unit: 'whole', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Toast & Rehydrate Chilies',
        description: 'Toast dried chilies in a dry skillet for 1 minute until fragrant. Simmer in 2 cups hot water for 10 minutes, then blend with garlic, onions, vinegar, and spices until a smooth paste forms.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        title: 'Braised Beef Consomé',
        description: 'Sear beef chuck chunks in a pot until browned. Pour in the chili marinade and beef broth. Cover and simmer on low heat for 50-60 minutes until beef falls apart effortlessly.',
        timerMinutes: 50,
        tip: 'Skim off the rich red chili fat on top of the broth — that will be used to fry the tortillas!'
      },
      {
        stepNumber: 3,
        title: 'Shred the Beef',
        description: 'Remove beef chunks from pot, shred with two forks, and stir back 1/2 cup of savory broth.',
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        title: 'Crisp Quesabirria Tacos',
        description: 'Dip corn tortillas into the top chili-oil consomé. Place on a hot skillet, top with shredded cheese and juicy shredded beef. Fold in half and cook until exterior is crunchy and cheese is gooey.',
        timerMinutes: 6
      },
      {
        stepNumber: 5,
        title: 'Serve with Dipping Consomé',
        description: 'Ladle hot consomé broth into dipping bowls, topped with diced onion and cilantro. Serve crispy tacos with lime wedges for dipping!',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 680,
      protein: 52,
      carbs: 42,
      fat: 34,
      fiber: 6
    },
    tags: ['Tacos', 'Birria', 'Mexican', 'Comfort Food', 'Cheesy'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-12',
    slug: 'korean-dolsot-bibimbap',
    title: 'Korean Sizzling Stone Pot Bibimbap',
    description: 'Crispy bottom rice bowl topped with marinated bulgogi beef, sautéed spinach, julienned carrots, shiitake mushrooms, kimchi, a golden egg yolk, and sweet-spicy gochujang.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=1600&q=85',
    rating: 4.89,
    reviewsCount: 220,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 2,
    difficulty: 'Medium',
    calories: 590,
    cuisine: 'Korean',
    foodTypes: ['Lunch', 'Dinner', 'Savory', 'Main Courses'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['High-Protein'],
    proteins: ['Beef', 'Eggs', 'Rice', 'Vegetables'],
    author: {
      name: 'Chef Jin-Woo Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Seoul Gastronomy Chef'
    },
    publishDate: '2026-07-22',
    ingredients: [
      { id: 'i1201', name: 'Steamed short-grain Korean rice', quantity: 300, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i1202', name: 'Thinly sliced ribeye or sirloin beef', quantity: 200, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i1203', name: 'Fresh spinach (blanched & sesame dressed)', quantity: 100, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1204', name: 'Bean sprouts & julienned carrots', quantity: 150, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1205', name: 'Shiitake mushrooms (sliced & sautéed)', quantity: 100, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1206', name: 'Egg yolks or sunny-side eggs', quantity: 2, unit: 'large', category: 'Dairy & Eggs' },
      { id: 'i1207', name: 'Gochujang bibimbap sauce (Gochujang, sesame oil, sugar, garlic)', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1208', name: 'Toasted sesame oil & seeds', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Marinate & Sear Bulgogi',
        description: 'Marinate sliced beef in soy sauce, garlic, mirin, and sesame oil. Sear in a hot skillet for 3 minutes until cooked and caramelized.',
        timerMinutes: 3
      },
      {
        stepNumber: 2,
        title: 'Sauté Veggie Namul',
        description: 'Separately stir-fry carrots, shiitake mushrooms, bean sprouts, and spinach with a drop of sesame oil and pinch of salt.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        title: 'Create Crispy Nurungji Rice Crust',
        description: 'Brush a stone pot (or cast iron skillet) with 1 tbsp sesame oil. Pack warm rice into the bottom. Heat on medium-high for 5 minutes until rice crackles and crisps.',
        timerMinutes: 5,
        tip: 'The sizzling sesame oil creates a golden crunchy bottom rice layer (nurungji) full of nutty aroma.'
      },
      {
        stepNumber: 4,
        title: 'Arrange & Mix',
        description: 'Arrange cooked vegetables, seasoned beef, and egg yolk symmetrically on top of the rice. Serve sizzling hot with a big dollop of Gochujang sauce to stir before eating.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 590,
      protein: 34,
      carbs: 64,
      fat: 20,
      fiber: 5
    },
    tags: ['Korean', 'Bibimbap', 'Rice Bowl', 'Crispy Rice'],
    isPopular: false,
    isTrending: true
  },
  {
    id: 'rec-13',
    slug: 'turkish-menemen-breakfast-eggs',
    title: 'Traditional Turkish Menemen Skillet',
    description: 'Silky soft scrambled eggs cooked in a sweet and tangy skillet of sautéed Turkish green peppers, ripe tomatoes, olive oil, and Aleppo pepper flakes.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1600&q=85',
    rating: 4.9,
    reviewsCount: 175,
    prepTime: 8,
    cookTime: 12,
    totalTime: 20,
    servings: 2,
    difficulty: 'Easy',
    calories: 320,
    cuisine: 'Turkish',
    foodTypes: ['Breakfast', 'Savory', 'Lunch', 'Appetizers'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Gluten-Free', 'Low-Carb', 'Keto', 'Healthy', 'High-Protein'],
    proteins: ['Eggs', 'Vegetables', 'Cheese'],
    author: {
      name: 'Chef Emre Yilmaz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      role: 'Istanbul Breakfast Specialist'
    },
    publishDate: '2026-08-14',
    ingredients: [
      { id: 'i1301', name: 'Fresh free-range eggs', quantity: 4, unit: 'large', category: 'Dairy & Eggs' },
      { id: 'i1302', name: 'Ripe summer tomatoes (peeled and diced)', quantity: 3, unit: 'medium', category: 'Vegetables & Produce' },
      { id: 'i1303', name: 'Turkish sivri peppers or Italian green peppers', quantity: 3, unit: 'peppers', category: 'Vegetables & Produce' },
      { id: 'i1304', name: 'Extra virgin olive oil or butter', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1305', name: 'Aleppo chili pepper (Pul Biber)', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i1306', name: 'Feta or Turkish Beyaz Peynir cheese (optional crumbled)', quantity: 50, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i1307', name: 'Crusty sourdough bread for dipping', quantity: 1, unit: 'loaf', category: 'Bakery & Grains' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sauté Peppers',
        description: 'Heat olive oil in a copper sahan or non-stick skillet. Sauté chopped green peppers for 3-4 minutes until softened and fragrant.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Cook Down Tomatoes',
        description: 'Add diced peeled tomatoes and a pinch of salt. Cook down over medium heat for 6-8 minutes until juices reduce to a luscious stew.',
        timerMinutes: 7,
        tip: 'Peeled fresh tomatoes melt into a silkier sauce than unpeeled ones.'
      },
      {
        stepNumber: 3,
        title: 'Fold Eggs Gently',
        description: 'Crack eggs directly into the skillet. Using a wooden spoon, gently swirl egg whites through the tomato sauce while keeping yolks mostly intact, cooking until creamy and barely set.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Garnish & Dip',
        description: 'Sprinkle with Aleppo pepper, crumbled feta, and fresh parsley. Serve immediately with thick slices of warm crusty bread to scoop straight from the pan.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 320,
      protein: 18,
      carbs: 14,
      fat: 22,
      fiber: 3
    },
    tags: ['Breakfast', 'Eggs', 'Turkish', 'Keto Friendly', 'Under 20 Mins'],
    isPopular: false,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-14',
    slug: 'mango-passionfruit-chia-smoothie',
    title: 'Tropical Mango Passionfruit Smoothie',
    description: 'Refreshing layered tropical smoothie made with sweet Alphonso mangoes, tangy passionfruit pulp, coconut milk, chia seeds, and a splash of lime.',
    image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=1600&q=85',
    rating: 4.94,
    reviewsCount: 142,
    prepTime: 5,
    cookTime: 0,
    totalTime: 5,
    servings: 2,
    difficulty: 'Easy',
    calories: 230,
    cuisine: 'American',
    foodTypes: ['Breakfast', 'Snacks', 'Sweets & Desserts'],
    dietaryType: 'Vegan',
    extraDietary: ['Gluten-Free', 'Dairy-Free', 'Healthy'],
    proteins: ['Fruits', 'Vegetables'],
    beverageCategory: 'Smoothies',
    author: {
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'Wellness & Beverage Creator'
    },
    publishDate: '2026-08-16',
    ingredients: [
      { id: 'i1401', name: 'Frozen sweet mango chunks', quantity: 300, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1402', name: 'Fresh passionfruit pulp (seeds included)', quantity: 3, unit: 'fruits', category: 'Vegetables & Produce' },
      { id: 'i1403', name: 'Light creamy coconut milk or almond milk', quantity: 250, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i1404', name: 'Chia seeds', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1405', name: 'Fresh lime juice', quantity: 1, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i1406', name: 'Agave nectar or maple syrup (optional)', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i1407', name: 'Fresh mint leaves for garnish', quantity: 4, unit: 'leaves', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Blend the Mango Base',
        description: 'Add frozen mango chunks, coconut milk, lime juice, and agave nectar into a high-speed blender. Blend on high for 60 seconds until thick and velvety.',
        timerMinutes: 1
      },
      {
        stepNumber: 2,
        title: 'Swirl Passionfruit & Chia',
        description: 'Pour half of the smoothie into glasses. Layer with fresh passionfruit pulp and chia seeds, then top with remaining smoothie.',
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        title: 'Garnish & Enjoy',
        description: 'Top with an extra drizzle of passionfruit pulp and fresh mint leaves. Serve with a glass straw.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 230,
      protein: 4,
      carbs: 46,
      fat: 5,
      fiber: 7
    },
    tags: ['Smoothie', 'Beverage', 'Tropical', 'Vegan', '5-Minute'],
    isPopular: true,
    isTrending: false,
    isQuickEasy: true
  },
  {
    id: 'rec-15',
    slug: 'iced-spanish-latte-caramel',
    title: 'Artisanal Iced Spanish Latte with Vanilla',
    description: 'Double shot of rich espresso layered over cold milk, sweet condensed milk, and finished with Madagascar vanilla and a dusting of cinnamon.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1600&q=85',
    rating: 4.96,
    reviewsCount: 280,
    prepTime: 4,
    cookTime: 2,
    totalTime: 6,
    servings: 1,
    difficulty: 'Easy',
    calories: 210,
    cuisine: 'Spanish',
    foodTypes: ['Breakfast', 'Snacks'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Gluten-Free'],
    proteins: ['Cheese'],
    beverageCategory: 'Coffee',
    author: {
      name: 'Barista Liam Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Specialty Coffee Roaster'
    },
    publishDate: '2026-08-18',
    ingredients: [
      { id: 'i1501', name: 'Freshly pulled double espresso shot', quantity: 60, unit: 'ml', category: 'Beverages' },
      { id: 'i1502', name: 'Sweetened condensed milk', quantity: 2, unit: 'tbsp', category: 'Dairy & Eggs' },
      { id: 'i1503', name: 'Whole milk or oat milk', quantity: 150, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i1504', name: 'Ice cubes', quantity: 1, unit: 'cup', category: 'Other' },
      { id: 'i1505', name: 'Pure Madagascar vanilla extract & cinnamon', quantity: 1, unit: 'dash', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sweet Milk Base',
        description: 'Whisk sweetened condensed milk and vanilla extract directly in the bottom of a tall glass.',
        timerMinutes: 1
      },
      {
        stepNumber: 2,
        title: 'Add Ice and Cold Milk',
        description: 'Fill the glass with ice cubes. Slowly pour chilled whole milk over the ice to create clean layers.',
        timerMinutes: 1
      },
      {
        stepNumber: 3,
        title: 'Float the Espresso',
        description: 'Slowly pour the hot freshly extracted double espresso over the ice layer for a beautiful cascading gradient effect. Dust with ground cinnamon.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 210,
      protein: 6,
      carbs: 28,
      fat: 7
    },
    tags: ['Coffee', 'Iced Latte', 'Spanish Latte', 'Specialty Drink'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-16',
    slug: 'middle-eastern-falafel-hummus-platter',
    title: 'Crispy Falafel Mezze Platter with Silky Hummus',
    description: 'Golden herb-packed falafels made from soaked chickpeas, served with warm za\'atar pita bread, velvety tahini hummus, pickled turnips, and sumac onions.',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1600&q=85',
    rating: 4.88,
    reviewsCount: 195,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    difficulty: 'Medium',
    calories: 490,
    cuisine: 'Middle Eastern',
    foodTypes: ['Appetizers', 'Lunch', 'Street Food', 'Savory'],
    dietaryType: 'Vegan',
    extraDietary: ['Dairy-Free', 'Healthy', 'High-Protein'],
    proteins: ['Vegetables'],
    author: {
      name: 'Chef Tariq Mansour',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      role: 'Levantine Mezze Master'
    },
    publishDate: '2026-07-10',
    ingredients: [
      { id: 'i1601', name: 'Dried chickpeas (soaked overnight, not canned)', quantity: 300, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1602', name: 'Fresh parsley & cilantro', quantity: 1.5, unit: 'cups packed', category: 'Vegetables & Produce' },
      { id: 'i1603', name: 'Garlic cloves and scallions', quantity: 4, unit: 'cloves', category: 'Vegetables & Produce' },
      { id: 'i1604', name: 'Ground cumin and coriander seeds', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1605', name: 'Baking powder (for fluffiness)', quantity: 0.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i1606', name: 'Silky tahini hummus (homemade or artisanal)', quantity: 200, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1607', name: 'Warm Za\'atar pita bread pockets', quantity: 4, unit: 'breads', category: 'Bakery & Grains' },
      { id: 'i1608', name: 'Sumac, olive oil, and pickled pink turnips', quantity: 1, unit: 'platter portion', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Pulse Falafel Mixture',
        description: 'In a food processor, pulse soaked raw chickpeas, herbs, garlic, scallions, cumin, coriander, and salt until coarse sand texture. Chill for 15 minutes.',
        timerMinutes: 5,
        tip: 'Never use canned chickpeas for falafel; raw soaked chickpeas give the signature crunchy exterior and light interior.'
      },
      {
        stepNumber: 2,
        title: 'Shape & Fry to Golden Brown',
        description: 'Stir baking powder into mixture. Form into 1.5-inch patties. Fry in 350°F (175°C) oil for 4 minutes until deeply golden brown and crisp.',
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        title: 'Plate the Mezze Platter',
        description: 'Swirl creamy hummus on a wide platter, create a well and drizzle with olive oil and sumac. Arrange hot falafels, warm pita bread, pickled turnips, and mint leaves.',
        timerMinutes: 3
      }
    ],
    nutrition: {
      calories: 490,
      protein: 20,
      carbs: 62,
      fat: 18,
      fiber: 12
    },
    tags: ['Falafel', 'Vegan', 'Middle Eastern', 'Mezze', 'High Fiber'],
    isPopular: false,
    isTrending: true
  },
  {
    id: 'rec-17',
    slug: 'authentic-pakistani-chicken-karahi',
    title: 'Authentic Lahori Chicken Karahi',
    description: 'Iconic Pakistani street curry cooked in a smoking wok with tender bone-in chicken, sweet tomatoes, slivered ginger, green chilies, and freshly crushed black pepper.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=85',
    rating: 4.96,
    reviewsCount: 412,
    prepTime: 10,
    cookTime: 25,
    totalTime: 35,
    servings: 4,
    difficulty: 'Medium',
    calories: 520,
    cuisine: 'Pakistani',
    foodTypes: ['Savory', 'Dinner', 'Main Courses', 'Street Food'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['Gluten-Free', 'Dairy-Free', 'High-Protein', 'Low-Carb'],
    proteins: ['Chicken'],
    author: {
      name: 'Chef Tariq Butt',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      role: 'Lahori Street Food Chef'
    },
    publishDate: '2026-08-11',
    ingredients: [
      { id: 'i1701', name: 'Bone-in chicken (curry cut pieces)', quantity: 800, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i1702', name: 'Fresh ripe red tomatoes (halved)', quantity: 6, unit: 'medium', category: 'Vegetables & Produce' },
      { id: 'i1703', name: 'Ginger (julienned into thin slivers)', quantity: 3, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i1704', name: 'Garlic paste & crushed ginger', quantity: 2, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i1705', name: 'Fresh green chilies (slit lengthwise)', quantity: 5, unit: 'chilies', category: 'Vegetables & Produce' },
      { id: 'i1706', name: 'Coarsely crushed black peppercorns & cumin', quantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1707', name: 'Pure mustard oil or corn oil', quantity: 4, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1708', name: 'Fresh coriander (cilantro) for garnish', quantity: 0.5, unit: 'cup', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sear Chicken in Smoking Karahi',
        description: 'Heat oil in a wok or karahi over high flame. Add chicken pieces, garlic, and salt. Bhunai (sear) vigorously for 6 minutes until chicken turns opaque white and golden.',
        timerMinutes: 6
      },
      {
        stepNumber: 2,
        title: 'Steam with Tomato Halves',
        description: 'Place tomato halves cut-side down over the chicken. Cover with a tight lid and steam for 8 minutes until tomato skins loosen.',
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        title: 'Peel Skins & Reduce Masala',
        description: 'Using tongs, easily peel off all tomato skins. Mash tomatoes into the gravy with a wooden spoon and sauté on high heat until oil separates.',
        timerMinutes: 6,
        tip: 'High heat bhunai caramelizes the tomato sugars and gives authentic restaurant richness without any onions.'
      },
      {
        stepNumber: 4,
        title: 'Aromatics & Pepper Finish',
        description: 'Add julienned ginger, green chilies, crushed cumin, and crushed black pepper. Toss for 2 minutes. Garnish with abundant fresh coriander and serve with hot tandoori roti.',
        timerMinutes: 3
      }
    ],
    nutrition: {
      calories: 520,
      protein: 48,
      carbs: 12,
      fat: 32,
      fiber: 3
    },
    tags: ['Karahi', 'Pakistani', 'Spicy', 'Gluten-Free', 'High-Protein'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-18',
    slug: 'wild-berry-hibiscus-mocktail',
    title: 'Wild Berry Hibiscus Sparkling Mocktail',
    description: 'Vibrant ruby-red brewed Egyptian hibiscus tea shaken with crushed blackberries, fresh lime juice, agave, and topped with sparkling botanical soda.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1600&q=85',
    rating: 4.9,
    reviewsCount: 110,
    prepTime: 5,
    cookTime: 5,
    totalTime: 10,
    servings: 2,
    difficulty: 'Easy',
    calories: 95,
    cuisine: 'American',
    foodTypes: ['Beverages', 'Snacks'],
    dietaryType: 'Vegan',
    extraDietary: ['Gluten-Free', 'Dairy-Free', 'Healthy', 'Low-Carb'],
    proteins: ['Fruits'],
    beverageCategory: 'Mocktails',
    author: {
      name: 'Mixologist Chloe Ray',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'Craft Beverage Designer'
    },
    publishDate: '2026-08-20',
    ingredients: [
      { id: 'i1801', name: 'Dried whole hibiscus flowers (Karkadeh)', quantity: 2, unit: 'tbsp', category: 'Beverages' },
      { id: 'i1802', name: 'Fresh blackberries & raspberries', quantity: 100, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i1803', name: 'Fresh lime juice', quantity: 2, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i1804', name: 'Agave nectar or simple syrup', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i1805', name: 'Chilled sparkling water or club soda', quantity: 250, unit: 'ml', category: 'Beverages' },
      { id: 'i1806', name: 'Fresh rosemary sprigs & crushed ice', quantity: 2, unit: 'sprigs', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Brew Hibiscus Concentrate',
        description: 'Steep dried hibiscus in 1/2 cup boiling water for 5 minutes until deep ruby red. Strain and cool.',
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        title: 'Muddle Berries and Lime',
        description: 'Muddle blackberries, lime juice, and agave nectar in a cocktail shaker.',
        timerMinutes: 1
      },
      {
        stepNumber: 3,
        title: 'Shake and Top with Sparkle',
        description: 'Add hibiscus concentrate and ice to shaker. Shake vigorously for 15 seconds. Strain into ice-filled glasses, top with sparkling soda, and garnish with a torched rosemary sprig.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 95,
      protein: 1,
      carbs: 22,
      fat: 0,
      fiber: 3
    },
    tags: ['Mocktail', 'Beverage', 'Hibiscus', 'Refreshing', 'Low Calorie'],
    isPopular: false,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-19',
    slug: 'avocado-poached-egg-sourdough',
    title: 'Smashed Avocado Toast with Poached Eggs',
    description: 'Toasted artisan sourdough bread smeared with citrus garlic smashed avocado, crowned with two soft poached eggs, chili flakes, and microgreens.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1600&q=85',
    rating: 4.88,
    reviewsCount: 160,
    prepTime: 5,
    cookTime: 5,
    totalTime: 10,
    servings: 1,
    difficulty: 'Easy',
    calories: 360,
    cuisine: 'American',
    foodTypes: ['Breakfast', 'Lunch', 'Savory'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Healthy', 'High-Protein'],
    proteins: ['Eggs', 'Fruits', 'Cheese'],
    author: {
      name: 'Chef Leo Bennett',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Brunch Master'
    },
    publishDate: '2026-08-22',
    ingredients: [
      { id: 'i1901', name: 'Thick artisan sourdough bread slice', quantity: 1, unit: 'thick slice', category: 'Bakery & Grains' },
      { id: 'i1902', name: 'Ripe Hass avocado', quantity: 1, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i1903', name: 'Fresh farm eggs', quantity: 2, unit: 'large', category: 'Dairy & Eggs' },
      { id: 'i1904', name: 'Lemon juice & extra virgin olive oil', quantity: 1, unit: 'tsp each', category: 'Pantry & Spices' },
      { id: 'i1905', name: 'Red pepper chili flakes & flaky salt', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' },
      { id: 'i1906', name: 'Everything bagel seasoning & microgreens', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Toast the Sourdough',
        description: 'Toast sourdough until crisp and deeply golden. Rub with a halved garlic clove while warm.',
        timerMinutes: 2
      },
      {
        stepNumber: 2,
        title: 'Poach the Eggs',
        description: 'Swirl simmering water in a pot. Drop cracked eggs into center vortex and poach for 3 minutes for perfectly runny yolks.',
        timerMinutes: 3,
        tip: 'Fresh eggs hold together in a tight orb without needing vinegar.'
      },
      {
        stepNumber: 3,
        title: 'Smash & Assemble',
        description: 'Mash avocado with lemon juice, olive oil, and flaky salt. Spread onto toast, rest poached eggs on top, and scatter with chili flakes and microgreens.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 360,
      protein: 18,
      carbs: 28,
      fat: 21,
      fiber: 7
    },
    tags: ['Brunch', 'Breakfast', 'Avocado Toast', '10-Minute'],
    isPopular: true,
    isTrending: false,
    isQuickEasy: true
  },
  {
    id: 'rec-20',
    slug: 'masala-chai-artisanal-tea',
    title: 'Authentic Kadak Masala Chai',
    description: 'Slow-simmered rich Assam black tea infused with freshly crushed green cardamoms, cinnamon, ginger, and whole milk, sweetened to golden perfection.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1600&q=85',
    rating: 4.98,
    reviewsCount: 380,
    prepTime: 3,
    cookTime: 7,
    totalTime: 10,
    servings: 2,
    difficulty: 'Easy',
    calories: 140,
    cuisine: 'Pakistani',
    foodTypes: ['Breakfast', 'Beverages', 'Snacks'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Gluten-Free'],
    proteins: ['Cheese'],
    beverageCategory: 'Tea',
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Tea Master'
    },
    publishDate: '2026-08-24',
    ingredients: [
      { id: 'i2001', name: 'Strong loose leaf Assam or CTC Black Tea', quantity: 2, unit: 'tbsp', category: 'Beverages' },
      { id: 'i2002', name: 'Fresh whole milk', quantity: 200, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2003', name: 'Water', quantity: 200, unit: 'ml', category: 'Other' },
      { id: 'i2004', name: 'Green cardamom pods (crushed)', quantity: 4, unit: 'pods', category: 'Pantry & Spices' },
      { id: 'i2005', name: 'Fresh ginger root (crushed)', quantity: 1, unit: 'inch', category: 'Vegetables & Produce' },
      { id: 'i2006', name: 'Cinnamon stick & cloves', quantity: 1, unit: 'piece', category: 'Pantry & Spices' },
      { id: 'i2007', name: 'Raw brown sugar or honey', quantity: 2, unit: 'tsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Boil Aromatics & Tea',
        description: 'In a saucepan, bring water, crushed cardamom, ginger, and cinnamon to a rolling boil for 2 minutes to extract essential oils. Add black tea leaves.',
        timerMinutes: 3
      },
      {
        stepNumber: 2,
        title: 'Simmer with Milk',
        description: 'Pour in whole milk and sugar. Bring to a boil, reduce heat when it rises, and let simmer for 4 minutes until a deep caramel brown color is achieved.',
        timerMinutes: 4,
        tip: 'Aerating the chai by ladling and pouring it back into the pot develops a velvety creamy froth.'
      },
      {
        stepNumber: 3,
        title: 'Strain & Serve',
        description: 'Strain through a fine mesh strainer into clay cups (kulhad) or mugs. Serve hot with biscuits or samosas.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 140,
      protein: 4,
      carbs: 16,
      fat: 6
    },
    tags: ['Chai', 'Tea', 'Hot Drink', 'Cardamom', 'Pakistani', 'Indian'],
    isPopular: true,
    isTrending: false,
    isQuickEasy: true
  },
  {
    id: 'rec-21',
    slug: 'royal-slow-cooked-beef-nihari',
    title: 'Royal Slow-Cooked Beef Nihari',
    description: 'A deeply aromatic Mughlai beef shank stew slow-simmered with marrow bones, roasted spices, and aromatic flour roux, served with ginger julienne, fresh cilantro, and warm tandoori naan.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=1600&q=85',
    rating: 4.95,
    reviewsCount: 418,
    prepTime: 20,
    cookTime: 120,
    totalTime: 140,
    servings: 6,
    difficulty: 'Hard',
    calories: 680,
    cuisine: 'Pakistani',
    foodTypes: ['Savory', 'Dinner', 'Main Courses', 'Street Food'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['High-Protein'],
    proteins: ['Beef'],
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Spice Master'
    },
    publishDate: '2026-08-10',
    ingredients: [
      { id: 'i2101', name: 'Beef shank & bone marrow (nalli)', quantity: 1000, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i2102', name: 'Pure desi ghee or mustard oil', quantity: 100, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2103', name: 'Ginger garlic paste', quantity: 3, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i2104', name: 'Nihari spice blend (fennel, dry ginger, pipali, mace, nutmeg)', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2105', name: 'Kashmiri red chili powder & turmeric', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2106', name: 'Atta (whole wheat flour) whisked in 1 cup water', quantity: 4, unit: 'tbsp', category: 'Bakery & Grains' },
      { id: 'i2107', name: 'Fresh ginger root (finely julienned)', quantity: 2, unit: 'inch', category: 'Vegetables & Produce' },
      { id: 'i2108', name: 'Green chilies & fresh cilantro (chopped)', quantity: 4, unit: 'pieces', category: 'Vegetables & Produce' },
      { id: 'i2109', name: 'Lemon wedges & golden fried onions', quantity: 1, unit: 'set', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sear Shank & Aromatics',
        description: 'Heat desi ghee in a heavy Dutch oven. Add ginger garlic paste and sear beef shanks and marrow bones on high heat for 8 minutes until golden and deeply browned.',
        timerMinutes: 8
      },
      {
        stepNumber: 2,
        title: 'Bloom Nihari Masala',
        description: 'Add Kashmiri chili powder, turmeric, salt, and freshly ground Nihari spice blend. Sauté for 3 minutes until oil releases and separates with a fiery red sheen (tari).',
        timerMinutes: 3,
        tip: 'Skim off half of the red aromatic floating oil (tari) and reserve it in a small bowl to drizzle before serving.'
      },
      {
        stepNumber: 3,
        title: 'Slow Simmer Beef',
        description: 'Pour in 6 cups of warm water. Bring to a boil, cover tightly with lid, reduce heat to the lowest setting, and simmer for 2 hours until the beef is melt-in-your-mouth tender.',
        timerMinutes: 120
      },
      {
        stepNumber: 4,
        title: 'Thicken with Wheat Slurry',
        description: 'Slowly pour the whisked whole wheat flour slurry into the bubbling stew while stirring continuously to prevent lumps. Simmer for 15 minutes until gravy turns glossy and velvety.',
        timerMinutes: 15
      },
      {
        stepNumber: 5,
        title: 'Garnish & Feast',
        description: 'Ladle hot nihari into bowls. Drizzle reserved red tari on top, add succulent marrow from bones, and garnish heavily with julienned ginger, green chilies, cilantro, fried onions, and fresh lemon juice.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 680,
      protein: 52,
      carbs: 22,
      fat: 42,
      fiber: 3
    },
    tags: ['Nihari', 'Beef Stew', 'Mughlai', 'Pakistani', 'Slow Cooked', 'Comfort Food'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-22',
    slug: 'shahi-paneer-tikka-masala',
    title: 'Shahi Paneer Tikka Masala',
    description: 'Char-grilled cottage cheese cubes simmered in a velvety tomato-cashew reduction infused with roasted fenugreek leaves (kasuri methi), fresh cream, and aromatic spices.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1600&q=85',
    rating: 4.88,
    reviewsCount: 320,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 4,
    difficulty: 'Medium',
    calories: 490,
    cuisine: 'Indian',
    foodTypes: ['Savory', 'Dinner', 'Lunch', 'Main Courses'],
    dietaryType: 'Vegetarian',
    extraDietary: ['High-Protein', 'Gluten-Free'],
    proteins: ['Cheese', 'Vegetables'],
    author: {
      name: 'Chef Rajiv Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Master of North Indian Cuisine'
    },
    publishDate: '2026-08-14',
    ingredients: [
      { id: 'i2201', name: 'Fresh Paneer (cut into thick cubes)', quantity: 400, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2202', name: 'Greek yogurt (hung curd)', quantity: 100, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2203', name: 'Bell peppers & red onions (cut in cubes)', quantity: 200, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i2204', name: 'Ripe plum tomatoes (pureed)', quantity: 4, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i2205', name: 'Raw cashew nuts (soaked & pureed smooth)', quantity: 40, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i2206', name: 'Fresh heavy cream', quantity: 60, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2207', name: 'Ginger garlic paste & green chili', quantity: 2, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i2208', name: 'Kasuri methi (roasted dried fenugreek leaves)', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2209', name: 'Garam masala, Kashmiri chili & coriander powder', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2210', name: 'Butter & desi ghee', quantity: 3, unit: 'tbsp', category: 'Dairy & Eggs' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Marinate & Char Paneer',
        description: 'Toss paneer cubes and peppers in yogurt, Kashmiri chili, turmeric, garam masala, and mustard oil. Sear on a screaming-hot grill pan for 4 minutes until smoky char marks appear.',
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        title: 'Build the Gravy Base',
        description: 'Melt butter and ghee in a pan. Sauté ginger garlic paste and tomato puree for 8 minutes until oil separates from the masala.',
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        title: 'Whisk Silky Cashew Puree',
        description: 'Pour in the soaked cashew paste and 1/2 cup water. Simmer on low heat until sauce becomes glossy, rich, and fragrant.',
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        title: 'Combine Paneer & Simmer',
        description: 'Gently fold in grilled paneer and peppers. Sprinkle crushed roasted kasuri methi, swirl in heavy cream, and simmer for 3 minutes.',
        timerMinutes: 3,
        tip: 'Crushing kasuri methi between your palms before adding releases its maximum herbal perfume.'
      },
      {
        stepNumber: 5,
        title: 'Serve Warm',
        description: 'Garnish with a drizzle of cream and fresh coriander. Serve with hot garlic butter naan or jeera rice.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 490,
      protein: 24,
      carbs: 18,
      fat: 36,
      fiber: 4
    },
    tags: ['Paneer', 'Curry', 'Vegetarian', 'Indian', 'Rich & Creamy', 'Gluten-Free'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-23',
    slug: 'peshawari-chapli-kabab',
    title: 'Crispy Peshawari Chapli Kabab',
    description: 'Crispy edged, juicy minced beef patties infused with crushed pomegranate seeds (anardana), coriander seeds, mint, green chilies, and fried with fresh tomato discs.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1600&q=85',
    rating: 4.96,
    reviewsCount: 395,
    prepTime: 20,
    cookTime: 15,
    totalTime: 35,
    servings: 4,
    difficulty: 'Medium',
    calories: 520,
    cuisine: 'Pakistani',
    foodTypes: ['Savory', 'Dinner', 'Street Food', 'Appetizers'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['High-Protein', 'Low-Carb', 'Keto', 'Gluten-Free'],
    proteins: ['Beef', 'Eggs'],
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Spice Master'
    },
    publishDate: '2026-08-16',
    ingredients: [
      { id: 'i2301', name: 'Minced beef (80/20 lean to fat ratio)', quantity: 600, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i2302', name: 'Finely chopped red onions (squeezed dry)', quantity: 150, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i2303', name: 'Fresh firm tomato slices & diced tomatoes', quantity: 2, unit: 'whole', category: 'Vegetables & Produce' },
      { id: 'i2304', name: 'Coarsely crushed dried pomegranate seeds (anardana)', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2305', name: 'Coarsely crushed coriander & cumin seeds', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2306', name: 'Chopped green chilies & fresh mint', quantity: 3, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i2307', name: 'Cornmeal or roasted gram flour (besan)', quantity: 3, unit: 'tbsp', category: 'Bakery & Grains' },
      { id: 'i2308', name: 'Egg (lightly beaten)', quantity: 1, unit: 'whole', category: 'Dairy & Eggs' },
      { id: 'i2309', name: 'Pure desi ghee or beef tallow for frying', quantity: 100, unit: 'g', category: 'Dairy & Eggs' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Knead the Meat Mixture',
        description: 'In a wide platter, combine minced beef, crushed anardana, toasted coriander, cumin, onions, green chilies, mint, egg, and gram flour. Knead vigorously for 6-8 minutes until meat proteins bind and feel sticky.',
        timerMinutes: 8,
        tip: 'Kneading develops the natural myosin in meat, preventing the kababs from breaking in the pan.'
      },
      {
        stepNumber: 2,
        title: 'Shape Wide Flat Patties',
        description: 'Divide into large tennis ball-sized portions. Wet your hands and flatten into thin, wide round discs on parchment paper. Press a slice of fresh tomato firmly into the center of each patty.',
        timerMinutes: 5
      },
      {
        stepNumber: 3,
        title: 'Shallow Fry on Cast Iron Tawa',
        description: 'Heat ghee in a flat iron tawa over medium-high heat. Slide kababs gently into hot ghee. Fry for 4-5 minutes per side until deeply caramelized and edges are wonderfully crispy.',
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        title: 'Drain & Serve Piping Hot',
        description: 'Drain excess ghee briefly on paper towels. Serve sizzling with mint-coriander raita, pickled red onions, and hot Peshawari naan.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 520,
      protein: 44,
      carbs: 10,
      fat: 34,
      fiber: 2
    },
    tags: ['Chapli Kabab', 'Street Food', 'Beef', 'Peshawari', 'Crispy', 'Pakistani', 'Keto'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-24',
    slug: 'slow-simmered-dal-makhani',
    title: 'Slow-Simmered Creamy Dal Makhani',
    description: 'Whole black urad lentils and red kidney beans slow-cooked overnight with smoky Kashmiri chilies, fresh tomato puree, pure butter, and clotted cream.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1600&q=85',
    rating: 4.92,
    reviewsCount: 284,
    prepTime: 20,
    cookTime: 60,
    totalTime: 80,
    servings: 5,
    difficulty: 'Medium',
    calories: 430,
    cuisine: 'Indian',
    foodTypes: ['Savory', 'Dinner', 'Lunch', 'Main Courses', 'Soups'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Gluten-Free', 'Healthy', 'High-Protein'],
    proteins: ['Vegetables', 'Cheese'],
    author: {
      name: 'Chef Rajiv Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Master of North Indian Cuisine'
    },
    publishDate: '2026-08-18',
    ingredients: [
      { id: 'i2401', name: 'Whole black urad dal (soaked overnight)', quantity: 250, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i2402', name: 'Rajma (red kidney beans, soaked overnight)', quantity: 60, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i2403', name: 'Fresh tomato puree', quantity: 300, unit: 'ml', category: 'Vegetables & Produce' },
      { id: 'i2404', name: 'Unsalted white or yellow butter (Makhan)', quantity: 80, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2405', name: 'Heavy cream', quantity: 80, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2406', name: 'Ginger garlic paste & julienned ginger', quantity: 2, unit: 'tbsp', category: 'Vegetables & Produce' },
      { id: 'i2407', name: 'Degi Mirch / Kashmiri red chili powder', quantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2408', name: 'Garam masala & kasuri methi', quantity: 1, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Pressure Cook Lentils',
        description: 'Rinse soaked black lentils and kidney beans thoroughly. Pressure cook with 5 cups water, salt, and half the ginger garlic paste for 35 minutes until completely soft and mashable.',
        timerMinutes: 35
      },
      {
        stepNumber: 2,
        title: 'Sauté Tomato Masala',
        description: 'In a heavy pot, melt half the butter. Add remaining ginger garlic paste, tomato puree, and Kashmiri chili. Cook on medium for 10 minutes until aromatic butter bubbles up.',
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        title: 'Mash & Slow Simmer',
        description: 'Pour cooked lentils into the tomato gravy. Use the back of a wooden ladle to mash some lentils against the side of the pot. Simmer on low for 30 minutes, adding hot water as needed.',
        timerMinutes: 30,
        tip: 'Slow simmering releases natural starches from the black gram, producing that signature restaurant silkiness without excessive thickeners.'
      },
      {
        stepNumber: 4,
        title: 'Enrich with Butter & Cream',
        description: 'Stir in remaining butter, heavy cream, garam masala, and roasted crushed kasuri methi. Simmer for 5 more minutes.',
        timerMinutes: 5
      },
      {
        stepNumber: 5,
        title: 'Garnish & Plate',
        description: 'Pour into serving bowls, swirl fresh cream in concentric circles, top with ginger julienne and a pat of fresh butter. Enjoy with butter naan.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 430,
      protein: 18,
      carbs: 45,
      fat: 22,
      fiber: 12
    },
    tags: ['Dal Makhani', 'Lentils', 'Comfort Food', 'Vegetarian', 'Indian', 'High Fiber'],
    isPopular: true,
    isTrending: false
  },
  {
    id: 'rec-25',
    slug: 'karachi-beef-keema-samosas',
    title: 'Karachi Crispy Beef Keema Samosas',
    description: 'Paper-thin golden crisp pastry pockets filled with fragrant spiced minced beef, roasted cumin, fresh cilantro, and mint, served with tangy tamarind chutney.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85',
    rating: 4.94,
    reviewsCount: 310,
    prepTime: 25,
    cookTime: 20,
    totalTime: 45,
    servings: 6,
    difficulty: 'Medium',
    calories: 380,
    cuisine: 'Pakistani',
    foodTypes: ['Snacks', 'Appetizers', 'Street Food', 'Baked Goods'],
    dietaryType: 'Non-Vegetarian',
    extraDietary: ['High-Protein'],
    proteins: ['Beef'],
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Spice Master'
    },
    publishDate: '2026-08-20',
    ingredients: [
      { id: 'i2501', name: 'Lean minced beef', quantity: 400, unit: 'g', category: 'Meat & Seafood' },
      { id: 'i2502', name: 'Spring roll pastry sheets or samosa patti', quantity: 18, unit: 'sheets', category: 'Bakery & Grains' },
      { id: 'i2503', name: 'Finely chopped onions & green chilies', quantity: 1, unit: 'cup', category: 'Vegetables & Produce' },
      { id: 'i2504', name: 'Fresh mint and cilantro leaves (chopped)', quantity: 1/2, unit: 'cup', category: 'Vegetables & Produce' },
      { id: 'i2505', name: 'Roasted crushed coriander and cumin seeds', quantity: 2, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2506', name: 'Garam masala, chaat masala & black pepper', quantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i2507', name: 'Flour-water paste (for sealing edges)', quantity: 3, unit: 'tbsp', category: 'Bakery & Grains' },
      { id: 'i2508', name: 'Oil for deep frying', quantity: 500, unit: 'ml', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Dry Cook Keema Filling',
        description: 'Cook minced beef with ginger garlic paste, salt, and spices in a pan without oil until all water completely evaporates and meat is cooked through. Let cool completely.',
        timerMinutes: 12,
        tip: 'Ensure the keema is bone dry before folding; excess moisture will make the pastry soggy.'
      },
      {
        stepNumber: 2,
        title: 'Fold in Fresh Herbs',
        description: 'Stir raw chopped onions, green chilies, mint, cilantro, and chaat masala into the cooled keema.',
        timerMinutes: 3
      },
      {
        stepNumber: 3,
        title: 'Fold Triangle Pockets',
        description: 'Take samosa patti strips, form into a cone pocket, fill with 2 spoonfuls of keema, fold over into a crisp triangle, and seal the edges tightly with flour paste.',
        timerMinutes: 10
      },
      {
        stepNumber: 4,
        title: 'Fry to Golden Perfection',
        description: 'Deep fry samosas in medium-hot oil for 4-5 minutes, turning occasionally until blistered, crisp, and golden brown.',
        timerMinutes: 5
      },
      {
        stepNumber: 5,
        title: 'Serve with Chutneys',
        description: 'Drain on paper towels and serve immediately with sweet tamarind sauce, spicy mint chutney, and hot chai.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 380,
      protein: 26,
      carbs: 32,
      fat: 18,
      fiber: 2
    },
    tags: ['Samosa', 'Keema', 'Street Food', 'Pakistani', 'Crispy', 'Snack', 'Tea Time'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-26',
    slug: 'royal-saffron-gulab-jamun',
    title: 'Royal Saffron Gulab Jamun',
    description: 'Melt-in-your-mouth milk solid dumplings fried to a deep golden mahogany and steeped in warm cardamom, rose water, and Kashmiri saffron syrup.',
    image: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?auto=format&fit=crop&w=1600&q=85',
    rating: 4.98,
    reviewsCount: 462,
    prepTime: 20,
    cookTime: 25,
    totalTime: 45,
    servings: 6,
    difficulty: 'Medium',
    calories: 340,
    cuisine: 'Pakistani',
    foodTypes: ['Sweets & Desserts', 'Street Food'],
    dietaryType: 'Vegetarian',
    extraDietary: [],
    proteins: ['Cheese'],
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Spice Master'
    },
    publishDate: '2026-08-21',
    ingredients: [
      { id: 'i2601', name: 'Fresh unsweetened khoya (mawa) or whole milk powder', quantity: 200, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2602', name: 'All-purpose flour (maida)', quantity: 40, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i2603', name: 'Baking powder', quantity: 1/4, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i2604', name: 'Pure desi ghee for kneading & frying', quantity: 300, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2605', name: 'Granulated sugar', quantity: 400, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i2606', name: 'Water', quantity: 400, unit: 'ml', category: 'Other' },
      { id: 'i2607', name: 'Green cardamom pods & Kashmiri saffron threads', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' },
      { id: 'i2608', name: 'Pure rose water or kewra essence', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i2609', name: 'Slivered pistachios & edible silver leaf (vark)', quantity: 2, unit: 'tbsp', category: 'Bakery & Grains' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Prepare Saffron Rose Syrup (Chasni)',
        description: 'Boil sugar and water in a saucepan for 8-10 minutes until slightly sticky (half-string consistency). Add crushed cardamom pods, saffron strands, and rose water. Keep warm on low heat.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        title: 'Knead Smooth Dough',
        description: 'Grate khoya finely. Gently knead with maida, baking powder, and 1 tbsp milk until completely smooth and free of grains. Roll into crack-free, marble-sized balls.',
        timerMinutes: 8,
        tip: 'Ensure the dough balls have zero surface cracks; smooth balls prevent bursting while frying.'
      },
      {
        stepNumber: 3,
        title: 'Gentle Low Heat Frying',
        description: 'Heat ghee over low flame. Slide jamuns in and gently swirl the ghee without touching the dumplings. Fry slowly for 12-15 minutes until uniform rich dark mahogany.',
        timerMinutes: 14
      },
      {
        stepNumber: 4,
        title: 'Soak in Warm Saffron Syrup',
        description: 'Transfer hot fried jamuns directly into the warm sugar syrup. Let them soak for at least 45 minutes to absorb the fragrant syrup and double in size.',
        timerMinutes: 45
      },
      {
        stepNumber: 5,
        title: 'Garnish & Serve',
        description: 'Serve warm or chilled, garnished with slivered pistachios and silver vark.',
        timerMinutes: 2
      }
    ],
    nutrition: {
      calories: 340,
      protein: 6,
      carbs: 58,
      fat: 11,
      fiber: 1
    },
    tags: ['Gulab Jamun', 'Mithai', 'Dessert', 'Desi Sweet', 'Festive', 'Saffron'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-27',
    slug: 'classic-italian-tiramisu',
    title: 'Classic Italian Tiramisu al Mascarpone',
    description: 'Delicate Savoiardi ladyfingers soaked in rich espresso and layered with an airy whipped mascarpone sabayon cream, dusted with Dutch cocoa powder.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1600&q=85',
    rating: 4.97,
    reviewsCount: 520,
    prepTime: 25,
    cookTime: 0,
    totalTime: 25,
    servings: 8,
    difficulty: 'Easy',
    calories: 420,
    cuisine: 'Italian',
    foodTypes: ['Sweets & Desserts', 'Baked Goods'],
    dietaryType: 'Vegetarian',
    extraDietary: [],
    proteins: ['Cheese', 'Eggs'],
    author: {
      name: 'Chef Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
      role: 'Executive Italian Chef'
    },
    publishDate: '2026-08-22',
    ingredients: [
      { id: 'i2701', name: 'Italian Savoiardi ladyfingers', quantity: 24, unit: 'pieces', category: 'Bakery & Grains' },
      { id: 'i2702', name: 'Authentic Mascarpone cheese (chilled)', quantity: 500, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2703', name: 'Large fresh pasteurized egg yolks', quantity: 4, unit: 'whole', category: 'Dairy & Eggs' },
      { id: 'i2704', name: 'Granulated caster sugar', quantity: 100, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i2705', name: 'Heavy whipping cream (whipped to soft peaks)', quantity: 250, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2706', name: 'Freshly brewed strong espresso coffee (cooled)', quantity: 300, unit: 'ml', category: 'Beverages' },
      { id: 'i2707', name: 'Pure vanilla bean paste', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i2708', name: 'Unsweetened Dutch process cocoa powder', quantity: 3, unit: 'tbsp', category: 'Pantry & Spices' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Whip Egg Yolks & Sugar',
        description: 'In a large heatproof bowl over a simmering water bath (bain-marie), whisk egg yolks and sugar for 5 minutes until pale, thick, and sugar dissolves completely. Remove and let cool.',
        timerMinutes: 6
      },
      {
        stepNumber: 2,
        title: 'Fold Mascarpone & Whipped Cream',
        description: 'Whisk chilled mascarpone cheese and vanilla paste until smooth. Fold into the cooled yolk mixture, then gently fold in whipped cream until light and velvety.',
        timerMinutes: 5,
        tip: 'Do not overmix mascarpone as high fat content can cause it to separate.'
      },
      {
        stepNumber: 3,
        title: 'Dip Ladyfingers in Espresso',
        description: 'Quickly dip each Savoiardi ladyfinger into the cooled espresso for 1-2 seconds per side (do not oversaturate). Arrange in a tight single layer in an 8x8 inch dish.',
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        title: 'Layer Cream & Repeat',
        description: 'Spread half the mascarpone cream evenly over the soaked biscuits. Add a second layer of espresso-dipped ladyfingers, and top with the remaining cream.',
        timerMinutes: 5
      },
      {
        stepNumber: 5,
        title: 'Chill & Cocoa Dusting',
        description: 'Refrigerate for at least 6 hours (or overnight) to set. Dust generously with unsweetened Dutch cocoa powder right before slicing.',
        timerMinutes: 360
      }
    ],
    nutrition: {
      calories: 420,
      protein: 8,
      carbs: 38,
      fat: 28,
      fiber: 2
    },
    tags: ['Tiramisu', 'Italian Dessert', 'Coffee', 'No Bake', 'Mascarpone', 'Decadent'],
    isPopular: true,
    isTrending: true,
    isQuickEasy: true
  },
  {
    id: 'rec-28',
    slug: 'shahi-saffron-kheer',
    title: 'Shahi Saffron Kheer (Rice Pudding)',
    description: 'Traditional slow-cooked thick creamy rice pudding enriched with condensed milk, green cardamom, saffron, kewra water, and toasted pistachios.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1600&q=85',
    rating: 4.93,
    reviewsCount: 298,
    prepTime: 10,
    cookTime: 40,
    totalTime: 50,
    servings: 6,
    difficulty: 'Easy',
    calories: 310,
    cuisine: 'Indian',
    foodTypes: ['Sweets & Desserts'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Gluten-Free'],
    proteins: ['Rice', 'Cheese'],
    author: {
      name: 'Chef Rajiv Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'Master of North Indian Cuisine'
    },
    publishDate: '2026-08-23',
    ingredients: [
      { id: 'i2801', name: 'Fragrant basmati rice (soaked & coarsely crushed)', quantity: 80, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i2802', name: 'Full cream whole milk', quantity: 1200, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2803', name: 'Sweetened condensed milk or khoya', quantity: 150, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2804', name: 'Granulated sugar', quantity: 80, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i2805', name: 'Green cardamom powder', quantity: 1, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i2806', name: 'Kashmiri saffron threads steeped in warm milk', quantity: 1, unit: 'pinch', category: 'Pantry & Spices' },
      { id: 'i2807', name: 'Kewra water essence', quantity: 1/2, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i2808', name: 'Almonds, pistachios & cashews (slivered)', quantity: 4, unit: 'tbsp', category: 'Bakery & Grains' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Simmer Milk with Rice',
        description: 'Bring whole milk to a boil in a heavy saucepan. Add soaked crushed basmati rice. Reduce heat and simmer on low for 25 minutes, stirring often to prevent scorching.',
        timerMinutes: 25
      },
      {
        stepNumber: 2,
        title: 'Infuse Saffron & Cardamom',
        description: 'When rice is completely soft and milk has reduced by a third, add saffron milk, cardamom powder, and condensed milk. Stir well.',
        timerMinutes: 10,
        tip: 'Coarsely pulsing the soaked basmati rice before cooking creates a thick, creamy consistency.'
      },
      {
        stepNumber: 3,
        title: 'Sweeten & Thicken',
        description: 'Add sugar and simmer for another 5 minutes until kheer coats the back of a spoon. Stir in kewra water and half the toasted nuts.',
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        title: 'Chill & Garnish',
        description: 'Pour into traditional clay bowls or dessert dishes. Chill in the refrigerator for 2 hours (or serve warm). Garnish with pistachios and dried rose petals.',
        timerMinutes: 60
      }
    ],
    nutrition: {
      calories: 310,
      protein: 8,
      carbs: 48,
      fat: 10,
      fiber: 1
    },
    tags: ['Kheer', 'Rice Pudding', 'Saffron', 'Desi Sweet', 'Gluten-Free', 'Indian'],
    isPopular: true,
    isTrending: false,
    isQuickEasy: true
  },
  {
    id: 'rec-29',
    slug: 'warm-gajar-ka-halwa',
    title: 'Warm Cardamom Gajar ka Halwa',
    description: 'Rich winter delicacy made with freshly grated sweet red carrots slow-roasted in desi ghee, simmered with reduced milk khoya, cardamoms, cashews, and golden raisins.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=85',
    rating: 4.96,
    reviewsCount: 382,
    prepTime: 20,
    cookTime: 45,
    totalTime: 65,
    servings: 6,
    difficulty: 'Medium',
    calories: 390,
    cuisine: 'Pakistani',
    foodTypes: ['Sweets & Desserts'],
    dietaryType: 'Vegetarian',
    extraDietary: ['Gluten-Free'],
    proteins: ['Vegetables', 'Cheese'],
    author: {
      name: 'Chef Aisha Siddiqui',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      role: 'Heritage Spice Master'
    },
    publishDate: '2026-08-24',
    ingredients: [
      { id: 'i2901', name: 'Fresh red carrots (peeled and finely grated)', quantity: 1000, unit: 'g', category: 'Vegetables & Produce' },
      { id: 'i2902', name: 'Full fat whole milk', quantity: 1000, unit: 'ml', category: 'Dairy & Eggs' },
      { id: 'i2903', name: 'Pure desi ghee', quantity: 80, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2904', name: 'Fresh khoya (mawa) or milk powder', quantity: 150, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i2905', name: 'Granulated sugar', quantity: 180, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i2906', name: 'Green cardamom powder', quantity: 1.5, unit: 'tsp', category: 'Pantry & Spices' },
      { id: 'i2907', name: 'Cashews, almonds & golden raisins (toasted in ghee)', quantity: 4, unit: 'tbsp', category: 'Bakery & Grains' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Cook Carrots in Milk',
        description: 'In a wide heavy-bottomed kadai, combine grated carrots and whole milk. Bring to a boil, then simmer uncovered on medium heat for 25 minutes, stirring frequently until milk evaporates.',
        timerMinutes: 25
      },
      {
        stepNumber: 2,
        title: 'Roast with Desi Ghee (Bhunai)',
        description: 'Add pure desi ghee and sauté carrots vigorously for 10 minutes until deep ruby red and ghee begins to separate from the sides.',
        timerMinutes: 10,
        tip: 'The thorough roasting (bhunai) in desi ghee develops the caramelized, rich flavor that defines great halwa.'
      },
      {
        stepNumber: 3,
        title: 'Add Sugar & Khoya',
        description: 'Stir in sugar (carrots will release moisture again) and cook for 8 minutes until glossy. Crumble in fresh khoya and cardamom powder.',
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        title: 'Fold Roasted Dry Fruits',
        description: 'Fold in golden ghee-toasted cashews, slivered almonds, and raisins. Cook for 2 more minutes until halwa leaves the sides of the pan.',
        timerMinutes: 2
      },
      {
        stepNumber: 5,
        title: 'Serve Warm',
        description: 'Serve warm in bowls, topped with extra crumbled khoya and toasted nuts.',
        timerMinutes: 1
      }
    ],
    nutrition: {
      calories: 390,
      protein: 7,
      carbs: 52,
      fat: 18,
      fiber: 4
    },
    tags: ['Gajar Halwa', 'Carrot Dessert', 'Pakistani', 'Indian', 'Mithai', 'Winter Warmth'],
    isPopular: true,
    isTrending: true
  },
  {
    id: 'rec-30',
    slug: 'new-york-vanilla-cheesecake',
    title: 'New York Style Vanilla Bean Cheesecake',
    description: 'Dense, velvety smooth baked cheesecake with Madagascar vanilla bean specks, resting on a toasted buttery graham cracker crust with fresh strawberry coulis.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=80',
    heroImage: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1600&q=85',
    rating: 4.95,
    reviewsCount: 410,
    prepTime: 25,
    cookTime: 65,
    totalTime: 90,
    servings: 10,
    difficulty: 'Medium',
    calories: 460,
    cuisine: 'American',
    foodTypes: ['Sweets & Desserts', 'Baked Goods'],
    dietaryType: 'Vegetarian',
    extraDietary: [],
    proteins: ['Cheese', 'Eggs', 'Fruits'],
    author: {
      name: 'Chef Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      role: 'Pastry Chef & Baker'
    },
    publishDate: '2026-08-25',
    ingredients: [
      { id: 'i3001', name: 'Graham cracker crumbs or digestive biscuits', quantity: 200, unit: 'g', category: 'Bakery & Grains' },
      { id: 'i3002', name: 'Unsalted butter (melted)', quantity: 80, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i3003', name: 'Full-fat cream cheese (room temperature)', quantity: 750, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i3004', name: 'Granulated sugar', quantity: 180, unit: 'g', category: 'Pantry & Spices' },
      { id: 'i3005', name: 'Sour cream', quantity: 150, unit: 'g', category: 'Dairy & Eggs' },
      { id: 'i3006', name: 'Large fresh eggs (room temperature)', quantity: 3, unit: 'whole', category: 'Dairy & Eggs' },
      { id: 'i3007', name: 'Pure Madagascar vanilla bean paste', quantity: 1.5, unit: 'tbsp', category: 'Pantry & Spices' },
      { id: 'i3008', name: 'Fresh strawberries & lemon juice (for coulis)', quantity: 250, unit: 'g', category: 'Vegetables & Produce' }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Press & Bake Crust',
        description: 'Mix crushed biscuits with melted butter. Press firmly into the bottom and 1 inch up the sides of a 9-inch springform pan. Bake at 350°F (175°C) for 10 minutes, then cool.',
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        title: 'Beat Cream Cheese & Sugar',
        description: 'Beat room-temperature cream cheese and sugar on medium-low speed until creamy and completely smooth. Add sour cream and vanilla paste.',
        timerMinutes: 4,
        tip: 'Mix on low speed to prevent incorporating excess air, which causes cracking in baked cheesecakes.'
      },
      {
        stepNumber: 3,
        title: 'Incorporate Eggs Gently',
        description: 'Add eggs one at a time, mixing on lowest speed just until combined. Pour batter over the pre-baked crust.',
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        title: 'Water Bath Baking (Bain-Marie)',
        description: 'Wrap the outside of the springform pan in heavy foil. Place in a roasting pan filled with 1 inch hot water. Bake at 325°F (160°C) for 55 minutes until edges are set and center has a slight wobble.',
        timerMinutes: 55
      },
      {
        stepNumber: 5,
        title: 'Slow Cool & Chill',
        description: 'Turn off the oven, prop the door open with a wooden spoon, and let cheesecake cool inside for 1 hour. Chill in the fridge for 6 hours. Slice and top with fresh strawberry coulis.',
        timerMinutes: 360
      }
    ],
    nutrition: {
      calories: 460,
      protein: 9,
      carbs: 42,
      fat: 30,
      fiber: 2
    },
    tags: ['Cheesecake', 'Baking', 'Dessert', 'New York Style', 'Strawberry', 'Cream Cheese'],
    isPopular: true,
    isTrending: true
  }
];

