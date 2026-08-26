import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url || 'file://' + __filename);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized successfully');
} else {
  console.warn('Supabase credentials not found in environment variables');
}

// Initialize GoogleGenAI client (Lazy/Safe initialization)
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback curated substitutions when API key is missing or on error
const CURATED_SUBSTITUTIONS: Record<string, any> = {
  butter: {
    substitutions: [
      {
        name: 'Olive Oil or Coconut Oil',
        ratio: '3/4 cup oil per 1 cup butter',
        type: 'Healthy & Dairy-Free',
        description: 'Excellent for cooking, roasting, and moist baking.',
        impactOnFlavor: 'Subtle fruity or nutty note, very tender crumb.',
      },
      {
        name: 'Greek Yogurt or Applesauce',
        ratio: '1:1 ratio for half the butter',
        type: 'Low-Calorie & Healthy',
        description: 'Significantly cuts saturated fat while maintaining moisture in baked goods.',
        impactOnFlavor: 'Slightly denser texture, very tender and moist.',
      },
      {
        name: 'Ghee (Clarified Butter)',
        ratio: '1:1 ratio',
        type: 'Pantry Common',
        description: 'Higher smoke point, lactose-free, rich nutty aroma.',
        impactOnFlavor: 'Deep, rich caramelized buttery flavor.',
      },
    ],
    chefNote: 'For high-heat searing, prefer Ghee or Avocado oil over regular butter.',
  },
  'heavy cream': {
    substitutions: [
      {
        name: 'Coconut Cream / Full-Fat Coconut Milk',
        ratio: '1:1 ratio',
        type: 'Vegan/Dietary',
        description: 'Rich plant-based creaminess ideal for curries and soups.',
        impactOnFlavor: 'Mild sweet coconut undertone.',
      },
      {
        name: 'Milk + Melted Butter',
        ratio: '3/4 cup milk + 1/4 cup melted butter',
        type: 'Pantry Common',
        description: 'Recreates the dairy fat content of heavy cream for sauces.',
        impactOnFlavor: 'Neutral, silky, authentic mouthfeel.',
      },
      {
        name: 'Silken Tofu Blended with Soy Milk',
        ratio: '1:1 ratio',
        type: 'Healthy & High-Protein',
        description: 'Silky, neutral protein-rich substitute for savory gravies.',
        impactOnFlavor: 'Neutral flavor with excellent body.',
      },
    ],
    chefNote: 'For whipping into peaks, use chilled coconut cream or commercial plant whipping cream.',
  },
  eggs: {
    substitutions: [
      {
        name: 'Ground Flaxseed or Chia Seed Egg',
        ratio: '1 tbsp ground seed + 3 tbsp water per egg',
        type: 'Healthy & Vegan',
        description: 'Let sit for 5 minutes until gelled. Fantastic binder.',
        impactOnFlavor: 'Subtle nutty taste, perfect for quick breads and pancakes.',
      },
      {
        name: 'Mashed Ripe Banana or Applesauce',
        ratio: '1/4 cup per egg',
        type: 'Pantry Common',
        description: 'Provides moisture and binding in muffins, cakes, and sweet breads.',
        impactOnFlavor: 'Natural mild sweetness and fruity aroma.',
      },
      {
        name: 'Aquafaba (Chickpea Brine)',
        ratio: '3 tbsp per whole egg (or 2 tbsp per egg white)',
        type: 'Vegan/Dietary',
        description: 'Whips like egg whites for meringues and light sponge batters.',
        impactOnFlavor: 'Completely neutral once cooked or baked.',
      },
    ],
    chefNote: 'For scrambled egg dishes, use crumbled medium-firm tofu with a pinch of turmeric and kala namak.',
  },
};

// API Endpoint for AI Ingredient Substitutions
app.post('/api/substitutions', async (req, res) => {
  try {
    const { ingredientName, recipeTitle, dietaryPreference, currentUnit, currentQuantity } = req.body;

    if (!ingredientName || typeof ingredientName !== 'string') {
      res.status(400).json({ error: 'ingredientName is required' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Return contextual fallback when API key is not configured
      const lower = ingredientName.toLowerCase();
      const matchedKey = Object.keys(CURATED_SUBSTITUTIONS).find((k) => lower.includes(k));
      if (matchedKey) {
        res.json({
          ingredient: ingredientName,
          ...CURATED_SUBSTITUTIONS[matchedKey],
        });
        return;
      }

      res.json({
        ingredient: ingredientName,
        substitutions: [
          {
            name: `Pantry Alternative for ${ingredientName}`,
            ratio: '1:1 ratio or adjust to taste',
            type: 'Pantry Common',
            description: `A standard home cooking replacement that mimics the moisture and texture of ${ingredientName}.`,
            impactOnFlavor: 'Preserves balanced seasoning and core culinary profile.',
          },
          {
            name: `Healthy & Plant-Based Alternative`,
            ratio: '1:1 ratio',
            type: 'Healthy',
            description: `Nutrient-dense alternative lower in saturated fat and refined elements.`,
            impactOnFlavor: 'Fresh, vibrant, and lighter finish.',
          },
        ],
        chefNote: `Adjust seasoning gradually when substituting ingredients in ${recipeTitle || 'this recipe'}.`,
      });
      return;
    }

    // Call Gemini 3.7 Flash with structured schema
    const prompt = `You are an expert master chef and nutritionist.
The user is making "${recipeTitle || 'a recipe'}" and wants smart, practical substitutions for the ingredient: "${ingredientName}" (current quantity: ${currentQuantity || ''} ${currentUnit || ''}).
${dietaryPreference ? `The user has a preference for: ${dietaryPreference}.` : ''}

Provide 3 to 4 realistic, tested culinary substitutions covering:
1. Healthy / Nutrient-Dense Alternative
2. Common Kitchen-Pantry Alternative
3. Dietary/Vegan/Allergy-Friendly Alternative
4. Low-Calorie or Flavor-Boosting Alternative

For each substitution, include the exact conversion ratio, description of culinary role, and flavor/texture impact. Also include a brief 1-sentence Chef Pro Tip.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ingredient: {
              type: Type.STRING,
              description: 'The target ingredient being substituted',
            },
            substitutions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: 'Name of the substitute ingredient',
                  },
                  ratio: {
                    type: Type.STRING,
                    description: 'Exact conversion ratio (e.g. 1:1 ratio, 3/4 cup per 1 cup)',
                  },
                  type: {
                    type: Type.STRING,
                    description: 'Category: Healthy, Pantry Common, Vegan/Dietary, or Low-Calorie',
                  },
                  description: {
                    type: Type.STRING,
                    description: 'Why this works and how to incorporate it',
                  },
                  impactOnFlavor: {
                    type: Type.STRING,
                    description: 'Expected effect on taste, texture, and browning',
                  },
                },
                required: ['name', 'ratio', 'type', 'description', 'impactOnFlavor'],
              },
            },
            chefNote: {
              type: Type.STRING,
              description: 'A practical tip from the chef for best cooking outcome',
            },
          },
          required: ['ingredient', 'substitutions', 'chefNote'],
        },
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error('Empty response from Gemini API');
    }

    const parsed = JSON.parse(outputText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating ingredient substitution:', error);
    res.status(500).json({
      error: 'Failed to generate substitution',
      details: error?.message || 'Unknown error',
    });
  }
});

// API Endpoint for AI Suggested Variations (Creative Ingredient Tweaks)
app.post('/api/variations', async (req, res) => {
  try {
    const { recipeTitle, description, cuisine, dietaryType, ingredients } = req.body;

    if (!recipeTitle || typeof recipeTitle !== 'string') {
      res.status(400).json({ error: 'recipeTitle is required' });
      return;
    }

    const ai = getGeminiClient();

    if (!ai) {
      // Fallback creative variations tailored by cuisine / title
      res.json({
        recipeTitle,
        variations: [
          {
            title: `Smoky Charred & Herb-Infused ${recipeTitle}`,
            category: 'Bold Flavor Twist',
            ingredientTweaks: [
              'Swap cooking oil for smoked paprika-infused olive oil',
              'Add 1 tbsp fire-roasted crushed chipotle or Aleppo chili flakes',
              'Finish with fresh torn basil, charred lemon juice, and sea salt flakes'
            ],
            description: `Infuses deep wood-fired smokiness and vibrant citrus brightness that elevates the core profile of ${recipeTitle}.`,
            chefTips: 'Sear aromatics on high heat for 60 seconds to lock in caramelized umami fond.'
          },
          {
            title: `Mediterranean Garden & Feta Twist`,
            category: 'Fresh & Light Mediterranean',
            ingredientTweaks: [
              'Add 1/2 cup sun-dried tomatoes and kalamata olives',
              'Incorporate fresh baby spinach or Swiss chard during the final 2 minutes',
              'Crumble aged Greek sheep milk feta and toasted pine nuts on top'
            ],
            description: `Adds salty bursts of briny olives, sun-drenched tomato richness, and vibrant green antioxidants.`,
            chefTips: 'Fold in delicate herbs off the heat right before plating to preserve essential aromatic oils.'
          },
          {
            title: `Velvety Plant-Powered / Dairy-Free Twist`,
            category: 'Plant-Based & High-Nutrient',
            ingredientTweaks: [
              'Replace heavy cream or butter with rich cashew cream or full-fat coconut milk',
              'Add 2 tbsp nutritional yeast and roasted garlic paste for deep savory cheesy notes',
              'Toss with crisped smoked tempeh strips or roasted chickpeas for crunchy protein'
            ],
            description: `A wholesome, dairy-free version that maintains luxurious silky mouthfeel and delivers sustained plant energy.`,
            chefTips: 'Blend soaked raw cashews with warm broth for 90 seconds for an ultra-velvety emulsified sauce.'
          }
        ]
      });
      return;
    }

    const ingredientsList = Array.isArray(ingredients) 
      ? ingredients.map((i: any) => typeof i === 'string' ? i : `${i.quantity || ''} ${i.unit || ''} ${i.name || ''}`).join(', ')
      : '';

    const prompt = `You are an elite Michelin-star chef and creative food innovator.
The user wants to explore 3 distinct, highly creative, and mouthwatering ingredient variations / tweaks for the recipe:
Recipe: "${recipeTitle}"
Cuisine: ${cuisine || 'International'}
Dietary Profile: ${dietaryType || 'Standard'}
Summary: ${description || ''}
Current key ingredients: ${ingredientsList || 'Standard recipe items'}

Generate EXACTLY 3 creative variations:
1. "Bold Flavor Twist" (e.g., spicy, smoky, umami, citrus-glazed, or herb-rich)
2. "Nutrient-Dense / Protein or Low-Carb Twist" (e.g., keto-friendly, antioxidant-rich, fiber-boosted, or lean protein swap)
3. "Fusion or Global Culinary Twist" (e.g., bringing in Thai, Mediterranean, Mexican, or Asian-inspired flavor profiles)

For each variation, specify:
- title: Evocative, appetizing recipe variation title (e.g. "Truffle Butter & Wild Mushroom Searing")
- category: A clear 2-4 word theme label
- ingredientTweaks: An array of 3 specific, actionable ingredient modifications or additions
- description: 1-2 sentences explaining why this flavor profile excels
- chefTips: 1 concise master-chef culinary tip for maximum execution success`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recipeTitle: {
              type: Type.STRING,
              description: 'The title of the original recipe',
            },
            variations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: 'Catchy and creative variation title',
                  },
                  category: {
                    type: Type.STRING,
                    description: 'Theme or style of this variation',
                  },
                  ingredientTweaks: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of 3 specific ingredient tweaks/swaps',
                  },
                  description: {
                    type: Type.STRING,
                    description: 'Explanation of flavor and texture transformation',
                  },
                  chefTips: {
                    type: Type.STRING,
                    description: 'Chef tip for cooking this variation to perfection',
                  },
                },
                required: ['title', 'category', 'ingredientTweaks', 'description', 'chefTips'],
              },
            },
          },
          required: ['recipeTitle', 'variations'],
        },
      },
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error('Empty response from Gemini API');
    }

    const parsed = JSON.parse(outputText);
    res.json(parsed);
  } catch (error: any) {
    console.error('Error generating recipe variations:', error);
    res.status(500).json({
      error: 'Failed to generate variations',
      details: error?.message || 'Unknown error',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'CulinaryCraft Backend', supabase: supabase ? 'connected' : 'not connected' });
});

// Supabase connection test endpoint
app.get('/api/supabase-test', async (req, res) => {
  if (!supabase) {
    res.status(500).json({ error: 'Supabase not configured' });
    return;
  }

  try {
    // Test connection by querying the database
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
    
    if (error) {
      // If table doesn't exist, try a different approach
      res.json({ 
        status: 'connected', 
        message: 'Supabase client is configured and connected',
        note: 'The _test_connection table may not exist, but the connection is working'
      });
    } else {
      res.json({ status: 'connected', data });
    }
  } catch (error: any) {
    res.status(500).json({ error: 'Supabase connection failed', details: error.message });
  }
});

// Example: Save recipe to Supabase
app.post('/api/recipes', async (req, res) => {
  if (!supabase) {
    res.status(500).json({ error: 'Supabase not configured' });
    return;
  }

  try {
    const { title, description, cuisine, dietaryType, ingredients } = req.body;

    const { data, error } = await supabase
      .from('recipes')
      .insert([
        {
          title,
          description,
          cuisine,
          dietary_type: dietaryType,
          ingredients,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ error: 'Failed to save recipe', details: error.message });
  }
});

// Example: Get recipes from Supabase
app.get('/api/recipes', async (req, res) => {
  if (!supabase) {
    res.status(500).json({ error: 'Supabase not configured' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    res.json({ success: true, data });
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes', details: error.message });
  }
});

// Vite middleware setup
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CulinaryCraft server listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
