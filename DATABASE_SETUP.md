# Database Setup Instructions

## Quick Setup with Supabase Dashboard

Since your Supabase project is already created at `https://ymzbbchtgpmcnhevpyro.supabase.co`, follow these steps:

### 1. Open SQL Editor
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Click "New Query"

### 2. Run the Schema
Copy and paste the entire contents of `supabase-schema.sql` file into the SQL Editor and run it.

### 3. Enable Authentication
- Go to Authentication > Providers
- Enable Email provider
- Configure email confirmation settings as needed

### 4. Create First Admin User
After running the schema, create your first user through the app, then run this SQL in the SQL Editor:

```sql
SELECT promote_user_to_admin('your-email@example.com');
```

Replace `your-email@example.com` with the email you used to sign up.

### 5. Configure Cloudinary (Optional)
For media uploads, you'll need to set up Cloudinary:
1. Create account at cloudinary.com
2. Create unsigned upload preset
3. Add credentials to `.env.local`:
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`

## Manual SQL Execution

If you prefer to run the SQL manually, here are the key tables:

### User Profiles Table
```sql
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
```

### Updated Recipes Table
```sql
CREATE TABLE IF NOT EXISTS recipes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    cuisine TEXT,
    dietary_type TEXT,
    ingredients JSONB,
    instructions TEXT[],
    prep_time INTEGER,
    cook_time INTEGER,
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
```

### User Activities Table
```sql
CREATE TABLE IF NOT EXISTS user_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    activity_type TEXT CHECK (activity_type IN ('recipe_upload', 'recipe_edit', 'recipe_delete', 'like', 'review', 'favorite')),
    resource_type TEXT CHECK (resource_type IN ('recipe', 'review', 'comment')),
    resource_id UUID,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Recipe Likes Table
```sql
CREATE TABLE IF NOT EXISTS recipe_likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);
```

## Important Notes

1. **Authentication**: The schema includes triggers to automatically create user profiles when users sign up
2. **Security**: RLS policies are included - make sure they're enabled
3. **Admin Setup**: Use the provided function to promote users to admin role
4. **Testing**: After setup, test user registration and recipe submission

## Troubleshooting

If you encounter issues:
- Check that Supabase credentials are correct in `.env.local`
- Ensure RLS is enabled on all tables
- Verify that the auth service is enabled in Supabase
- Check browser console for any authentication errors