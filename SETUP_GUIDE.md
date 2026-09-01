# CulinaryCraft - Setup Guide

## New Features Implementation

This guide documents the comprehensive features that have been added to the CulinaryCraft platform:

### 1. Admin Access & Recipe Approval Workflow
- **Admin-Only Modifications**: Only logged-in Admin users can add, edit, or delete recipes
- **User Submission & Approval System**: Non-admin users must sign up to submit recipes. Submitted recipes have a "pending" status and require Admin approval before going live
- **Status System**: Recipes can be `pending`, `approved`, or `rejected` with rejection reasons

### 2. Admin Dashboard & User Analytics
- **User Management Data**: Display total registered users, media activity, and comprehensive user management
- **System Metrics**: Total recipes, pending approvals, likes, reviews, and recent activities
- **User Role Management**: Admins can promote/demote users between 'user' and 'admin' roles
- **Recipe Approval Queue**: Dedicated interface for reviewing and approving/rejecting pending recipes

### 3. User Profile Management
- **User Dashboard**: Dedicated profile page for registered users
- **Activity Tracking**: Users can view their uploaded recipes, submission status, and engagement metrics
- **Profile Customization**: Users can add bio and update profile information
- **Activity History**: Recent activities including recipe uploads, likes, reviews, and favorites

### 4. Media Storage & Cloud Integration (Cloudinary)
- **Third-Party Cloud Storage**: Cloudinary integration for images and video uploads
- **Storage Workflow**: Media files are stored on Cloudinary, secure URLs are saved in the database
- **Optimized Delivery**: Automatic image optimization and video thumbnails
- **File Validation**: Size limits (10MB images, 50MB videos) and format validation

## Database Schema Updates

### New Tables:
- `user_profiles`: Extends Supabase auth.users with profile information
- `user_activities`: Tracks all user actions for analytics
- `recipe_likes`: Stores recipe likes with user associations
- Updated `recipes` table with: `author_id`, `status`, `rejection_reason`, `video_url`, `published_at`

### Security Policies:
- Row Level Security (RLS) enabled on all tables
- Admin-specific policies for full access
- User-specific policies for own data access
- Public read access for approved recipes only

## Environment Configuration

Update your `.env.local` file with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Google AI Configuration
VITE_GOOGLE_AI_API_KEY="your-google-ai-api-key"

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
VITE_CLOUDINARY_UPLOAD_PRESET="your-cloudinary-upload-preset"

# Application Configuration
APP_URL="http://localhost:5173"
```

## Setup Instructions

### 1. Supabase Setup
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the updated SQL schema in the Supabase SQL Editor
3. Enable Authentication in Supabase dashboard
4. Get your project URL and anon key from Settings > API

### 2. Cloudinary Setup
1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Create an unsigned upload preset for client-side uploads
3. Get your cloud name and upload preset from dashboard
4. Configure allowed formats and file size limits

### 3. Initial Admin Setup
After setting up the database, promote your first user to admin by running this SQL command in Supabase:

```sql
SELECT promote_user_to_admin('your-email@example.com');
```

## New Components

### Authentication Components:
- `AuthContext.tsx`: Provides authentication state and methods
- `AuthModal.tsx`: Login/signup modal component

### User Management:
- `UserProfile.tsx`: User profile page with activity tracking
- `AdminDashboard.tsx`: Admin interface for user and recipe management

### Recipe Management:
- `RecipeSubmission.tsx`: Form for users to submit new recipes
- `cloudinary.ts`: Utility functions for media upload to Cloudinary

## Usage Flow

### For Regular Users:
1. Sign up using the authentication modal
2. Access profile page to view activity
3. Submit recipes for admin approval
4. Track submission status in profile
5. View engagement metrics (likes, reviews)

### For Admin Users:
1. Access Admin Dashboard from navigation
2. Review pending recipe submissions
3. Approve or reject recipes with reasons
4. Manage user roles and permissions
5. View platform analytics and user activity

## API Integration

### Supabase Client:
The application uses Supabase for:
- User authentication
- Database operations
- Real-time subscriptions
- File storage (optional)

### Cloudinary Integration:
- Image upload with automatic optimization
- Video upload with thumbnail generation
- Secure URL generation for media delivery
- Client-side upload using unsigned presets

## Development

### Install Dependencies:
```bash
bun install
```

### Run Development Server:
```bash
bun run dev
```

### Build for Production:
```bash
bun run build
```

## Deployment

The project is configured for Vercel deployment:
- `vercel.json` contains build and routing configuration
- Environment variables need to be set in Vercel dashboard
- Database migrations should be run before deployment

## Security Considerations

1. **Authentication**: All user actions require authentication
2. **Authorization**: Admin-only features are protected by role checks
3. **Data Validation**: Form validation on all user inputs
4. **File Upload**: Size and type validation for media uploads
5. **SQL Injection**: Parameterized queries via Supabase client
6. **XSS Protection**: React's built-in escaping and content sanitization

## Future Enhancements

Potential improvements for future iterations:
- Email verification for user registration
- Password reset functionality
- Social login integration (Google, Facebook)
- Advanced recipe search with filters
- Recipe comments system
- Social sharing features
- Recipe export/import functionality
- Mobile app development