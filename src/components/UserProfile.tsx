import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../context/AuthContext';
import { UserActivity, RecipeStatus } from '../types';
import { User, Calendar, Heart, Clock, Upload, Edit, Settings, Star } from 'lucide-react';

export const UserProfile: React.FC = () => {
  const { userProfile, signOut, updateProfile } = useAuth();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(userProfile?.bio || '');

  useEffect(() => {
    setBio(userProfile?.bio || '');
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      fetchUserActivities();
    }
  }, [userProfile]);

  const fetchUserActivities = async () => {
    if (!userProfile) return;

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', userProfile.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching user activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({ bio });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'recipe_upload':
        return <Upload className="text-green-500" size={20} />;
      case 'recipe_edit':
        return <Edit className="text-blue-500" size={20} />;
      case 'like':
        return <Heart className="text-red-500" size={20} />;
      case 'review':
        return <Star className="text-yellow-500" size={20} />;
      case 'favorite':
        return <Heart className="text-pink-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getActivityText = (activity: UserActivity) => {
    switch (activity.activity_type) {
      case 'recipe_upload':
        return 'Uploaded a new recipe';
      case 'recipe_edit':
        return 'Edited a recipe';
      case 'recipe_delete':
        return 'Deleted a recipe';
      case 'like':
        return 'Liked a recipe';
      case 'review':
        return 'Reviewed a recipe';
      case 'favorite':
        return 'Added to favorites';
      default:
        return 'Activity recorded';
    }
  };

  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <User className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-xl font-semibold text-gray-700">Please sign in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userProfile.full_name?.charAt(0).toUpperCase() || userProfile.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.full_name || 'User'}</h1>
              <p className="text-gray-500">{userProfile.email}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                userProfile.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {userProfile.role === 'admin' ? 'Admin' : 'User'}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <Settings size={20} />
            </button>
            <button
              onClick={signOut}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {editMode && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={3}
              placeholder="Tell us about yourself..."
            />
            <div className="mt-3 flex space-x-2">
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!editMode && userProfile.bio && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">{userProfile.bio}</p>
          </div>
        )}
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center space-x-3">
            <Upload className="text-amber-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.activity_type === 'recipe_upload').length}
              </p>
              <p className="text-sm text-gray-500">Recipes Uploaded</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center space-x-3">
            <Heart className="text-red-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.activity_type === 'like').length}
              </p>
              <p className="text-sm text-gray-500">Likes Given</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center space-x-3">
            <Star className="text-yellow-500" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {activities.filter(a => a.activity_type === 'review').length}
              </p>
              <p className="text-sm text-gray-500">Reviews Written</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading activities...</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No recent activity</div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {getActivityIcon(activity.activity_type)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{getActivityText(activity)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString()} at{' '}
                    {new Date(activity.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};