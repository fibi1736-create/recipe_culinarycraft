-- CulinaryCraft Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    cuisine TEXT,
    dietary_type TEXT,
    ingredients JSONB,
    instructions TEXT[],
    prep_time INTEGER, -- in minutes
    cook_time INTEGER, -- in minutes
    servings INTEGER,
    difficulty TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_dietary_type ON recipes(dietary_type);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at DESC);

-- Ingredient Substitutions table
CREATE TABLE IF NOT EXISTS ingredient_substitutions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ingredient_name TEXT NOT NULL,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    substitution_name TEXT NOT NULL,
    ratio TEXT,
    substitution_type TEXT, -- 'Healthy', 'Pantry Common', 'Vegan/Dietary', 'Low-Calorie'
    description TEXT,
    impact_on_flavor TEXT,
    chef_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ingredient lookups
CREATE INDEX IF NOT EXISTS idx_substitutions_ingredient ON ingredient_substitutions(ingredient_name);
CREATE INDEX IF NOT EXISTS idx_substitutions_recipe ON ingredient_substitutions(recipe_id);

-- Recipe Variations table
CREATE TABLE IF NOT EXISTS recipe_variations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    variation_title TEXT NOT NULL,
    category TEXT,
    ingredient_tweaks JSONB,
    description TEXT,
    chef_tips TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for variation lookups
CREATE INDEX IF NOT EXISTS idx_variations_recipe ON recipe_variations(recipe_id);

-- User Favorites table (for future user authentication)
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID, -- Will be linked to auth.users when auth is implemented
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

-- Enable Row Level Security (RLS)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredient_substitutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access to recipes" ON recipes
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert to recipes" ON recipes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to recipes" ON recipes
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to recipes" ON recipes
    FOR DELETE USING (true);

CREATE POLICY "Allow public read access to substitutions" ON ingredient_substitutions
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert to substitutions" ON ingredient_substitutions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access to variations" ON recipe_variations
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert to variations" ON recipe_variations
    FOR INSERT WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO recipes (title, description, cuisine, dietary_type, ingredients, prep_time, cook_time, servings, difficulty) VALUES
(
    'Classic Margherita Pizza',
    'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil',
    'Italian',
    'Vegetarian',
    '[
        {"name": "Pizza dough", "quantity": "1", "unit": "lb"},
        {"name": "Tomato sauce", "quantity": "1", "unit": "cup"},
        {"name": "Fresh mozzarella", "quantity": "8", "unit": "oz"},
        {"name": "Fresh basil", "quantity": "1", "unit": "cup"},
        {"name": "Olive oil", "quantity": "2", "unit": "tbsp"}
    ]'::jsonb,
    20,
    15,
    4,
    'Medium'
),
(
    'Chicken Stir Fry',
    'Quick and healthy Asian-inspired stir fry with vegetables',
    'Asian',
    'High Protein',
    '[
        {"name": "Chicken breast", "quantity": "1", "unit": "lb"},
        {"name": "Broccoli", "quantity": "2", "unit": "cups"},
        {"name": "Bell peppers", "quantity": "2", "unit": "pieces"},
        {"name": "Soy sauce", "quantity": "3", "unit": "tbsp"},
        {"name": "Ginger", "quantity": "1", "unit": "tbsp"}
    ]'::jsonb,
    15,
    10,
    4,
    'Easy'
);

-- Sample ingredient substitution
INSERT INTO ingredient_substitutions (ingredient_name, substitution_name, ratio, substitution_type, description, impact_on_flavor, chef_note) VALUES
(
    'butter',
    'Olive Oil',
    '3/4 cup oil per 1 cup butter',
    'Healthy',
    'Excellent for cooking, roasting, and moist baking',
    'Subtle fruity or nutty note, very tender crumb',
    'For high-heat searing, prefer olive oil over regular butter'
);

-- Sample recipe variation
INSERT INTO recipe_variations (recipe_id, variation_title, category, ingredient_tweaks, description, chef_tips) 
SELECT 
    id,
    'Spicy Arrabbiata Margherita',
    'Bold Flavor Twist',
    '["Add red pepper flakes to sauce", "Use spicy Italian sausage", "Top with fresh chili"]'::jsonb,
    'Adds a spicy kick to the classic margherita',
    'Adjust spice level gradually to taste'
FROM recipes 
WHERE title = 'Classic Margherita Pizza'
LIMIT 1;
