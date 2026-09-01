-- CulinaryCraft Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recipes table with approval workflow
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
    video_url TEXT,
    author_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_recipes_cuisine ON recipes(cuisine);
CREATE INDEX IF NOT EXISTS idx_recipes_dietary_type ON recipes(dietary_type);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipes_author ON recipes(author_id);
CREATE INDEX IF NOT EXISTS idx_recipes_status ON recipes(status);

-- User Activity tracking table
CREATE TABLE IF NOT EXISTS user_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    activity_type TEXT CHECK (activity_type IN ('recipe_upload', 'recipe_edit', 'recipe_delete', 'like', 'review', 'favorite')),
    resource_type TEXT CHECK (resource_type IN ('recipe', 'review', 'comment')),
    resource_id UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_activities_user ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON user_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activities_created ON user_activities(created_at DESC);

-- Recipe Likes table
CREATE TABLE IF NOT EXISTS recipe_likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

CREATE INDEX IF NOT EXISTS idx_recipe_likes_user ON recipe_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipe_likes_recipe ON recipe_likes(recipe_id);

-- Updated User Favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

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



-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredient_substitutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_likes ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Recipes Policies
CREATE POLICY "Public can view approved recipes" ON recipes
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Authors can view own recipes" ON recipes
    FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Admins can view all recipes" ON recipes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Authenticated users can insert recipes" ON recipes
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authors can update own recipes" ON recipes
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Admins can update any recipe" ON recipes
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can delete recipes" ON recipes
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- User Activities Policies
CREATE POLICY "Users can view own activities" ON user_activities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities" ON user_activities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all activities" ON user_activities
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Recipe Likes Policies
CREATE POLICY "Authenticated users can insert likes" ON recipe_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes" ON recipe_likes
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Public can view like counts" ON recipe_likes
    FOR SELECT USING (true);

-- User Favorites Policies
CREATE POLICY "Authenticated users can insert favorites" ON user_favorites
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON user_favorites
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own favorites" ON user_favorites
    FOR SELECT USING (auth.uid() = user_id);

-- Ingredient Substitutions Policies
CREATE POLICY "Allow public read access to substitutions" ON ingredient_substitutions
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert substitutions" ON ingredient_substitutions
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Recipe Variations Policies
CREATE POLICY "Allow public read access to variations" ON recipe_variations
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert variations" ON recipe_variations
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        'user'
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to set published_at when recipe is approved
CREATE OR REPLACE FUNCTION handle_recipe_approval()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' AND OLD.status != 'approved' THEN
        NEW.published_at = NOW();
    ELSIF NEW.status != 'approved' THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at and handle approval
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER handle_recipe_status_change BEFORE UPDATE ON recipes
    FOR EACH ROW EXECUTE FUNCTION handle_recipe_approval();

-- Insert sample data for testing (note: user_id will be NULL until users are created)
INSERT INTO recipes (title, description, cuisine, dietary_type, ingredients, prep_time, cook_time, servings, difficulty, status) VALUES
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
    'Medium',
    'approved'
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
    'Easy',
    'approved'
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

-- Function to promote a user to admin (run this manually in SQL editor)
CREATE OR REPLACE FUNCTION promote_user_to_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE user_profiles
    SET role = 'admin'
    WHERE email = user_email;
    RETURN FOUND;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Comment: To promote a user to admin, run:
-- SELECT promote_user_to_admin('user@example.com');
