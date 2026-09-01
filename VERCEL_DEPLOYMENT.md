# Vercel Deployment Guide

## Pre-Deployment Checklist

### 1. Database Setup
Before deploying, ensure your Supabase database is set up:

1. Go to your Supabase project: https://ymzbbchtgpmcnhevpyro.supabase.co
2. Navigate to SQL Editor
3. Run the contents of `supabase-schema.sql`
4. Enable Authentication in the dashboard
5. Test the connection locally

### 2. Environment Variables
You'll need to set these environment variables in Vercel:

**Required Variables:**
```
VITE_SUPABASE_URL=https://ymzbbchtgpmcnhevpyro.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltemJiY2h0Z3BtY25oZXZweXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3Mzk2MjQsImV4cCI6MjEwMzMxNTYyNH0.8lMk5ZwPoC92GP3rXxZ19BQwJ-aOlj3dRMKJDo-WeiU
NEXT_PUBLIC_SUPABASE_URL=https://ymzbbchtgpmcnhevpyro.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltemJiY2h0Z3BtY25oZXZweXJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3Mzk2MjQsImV4cCI6MjEwMzMxNTYyNH0.8lMk5ZwPoC92GP3rXxZ19BQwJ-aOlj3dRMKJDo-WeiU
```

**Optional Variables (for AI features):**
```
VITE_GOOGLE_AI_API_KEY=your-google-ai-api-key
GEMINI_API_KEY=your-google-ai-api-key
```

**Optional Variables (for media uploads):**
```
VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-cloudinary-upload-preset
```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import from GitHub: `fibi1736-create/recipe_culinarycraft`

2. **Configure Project**
   - Framework Preset: "Other"
   - Root Directory: `./`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   - Add all the required variables from above
   - Make sure to include both client-side (`VITE_*`) and server-side variables

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at a `.vercel.app` domain

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts**
   - Link to existing project or create new
   - Set environment variables when prompted
   - Confirm deployment settings

## Post-Deployment Steps

### 1. Test the Application
- Visit your deployed URL
- Test user registration
- Test recipe submission
- Verify database connections

### 2. Set Up Custom Domain (Optional)
- Go to Vercel project settings
- Add your custom domain
- Configure DNS records

### 3. Create Admin User
1. Register a new account on your deployed app
2. Go to Supabase SQL Editor
3. Run: `SELECT promote_user_to_admin('your-email@example.com');`

### 4. Configure Cloudinary (Optional)
If you want media upload functionality:
1. Create Cloudinary account
2. Create unsigned upload preset
3. Add Cloudinary credentials to Vercel environment variables
6. Redeploy the application

## Troubleshooting

### Build Errors
- **Module not found**: Check that all dependencies are in package.json
- **TypeScript errors**: Run `npm run lint` locally first
- **Environment variables**: Ensure all required variables are set in Vercel

### Runtime Errors
- **Database connection**: Verify Supabase credentials are correct
- **Authentication errors**: Check Supabase auth settings
- **API errors**: Ensure server routes are properly configured

### Performance Issues
- **Slow loading**: Check Vercel analytics for bottlenecks
- **Memory issues**: Consider upgrading Vercel plan
- **Database latency**: Optimize Supabase queries

## Monitoring

### Vercel Analytics
- Monitor deployment status
- Track performance metrics
- View error logs

### Supabase Dashboard
- Monitor database performance
- Track user authentication
- Review API usage

## Scaling

As your application grows:
1. **Database**: Consider Supabase Pro plan for higher limits
2. **Storage**: Use Cloudinary for media files
3. **CDN**: Vercel automatically provides CDN
4. **Caching**: Implement Redis for frequently accessed data

## Security

- **Environment Variables**: Never commit secrets to git
- **API Keys**: Rotate keys regularly
- **Authentication**: Enable email verification
- **Rate Limiting**: Implement API rate limits
- **HTTPS**: Vercel provides automatic SSL

## Backup and Recovery

- **Database**: Supabase provides automatic backups
- **Code**: GitHub repository serves as backup
- **Media**: Cloudinary provides media storage
- **Logs**: Vercel retains deployment logs

## Support

For issues with:
- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs
- **Cloudinary**: https://cloudinary.com/documentation