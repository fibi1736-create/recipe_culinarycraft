import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../context/AuthContext';
import { AdminDashboardStats, UserProfile, RecipeStatus } from '../types';
import { Users, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart3, FileText, Eye } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { userProfile } = useAuth();
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalUsers: 0,
    totalRecipes: 0,
    pendingRecipes: 0,
    approvedRecipes: 0,
    rejectedRecipes: 0,
    totalLikes: 0,
    totalReviews: 0,
    recentActivities: [],
  });
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [pendingRecipes, setPendingRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'recipes'>('overview');

  useEffect(() => {
    if (userProfile?.role === 'admin') {
      fetchDashboardData();
    }
  }, [userProfile]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch total users
      const { count: userCount } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch recipe stats
      const { data: recipes } = await supabase
        .from('recipes')
        .select('status');

      const totalRecipes = recipes?.length || 0;
      const pendingRecipes = recipes?.filter(r => r.status === 'pending').length || 0;
      const approvedRecipes = recipes?.filter(r => r.status === 'approved').length || 0;
      const rejectedRecipes = recipes?.filter(r => r.status === 'rejected').length || 0;

      // Fetch likes count
      const { count: likesCount } = await supabase
        .from('recipe_likes')
        .select('*', { count: 'exact', head: true });

      // Fetch reviews count (using activities as proxy)
      const { count: reviewsCount } = await supabase
        .from('user_activities')
        .select('*', { count: 'exact', head: true })
        .eq('activity_type', 'review');

      // Fetch recent activities
      const { data: recentActivities } = await supabase
        .from('user_activities')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setStats({
        totalUsers: userCount || 0,
        totalRecipes,
        pendingRecipes,
        approvedRecipes,
        rejectedRecipes,
        totalLikes: likesCount || 0,
        totalReviews: reviewsCount || 0,
        recentActivities: recentActivities || [],
      });

      // Fetch users list
      const { data: usersData } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      setUsers(usersData || []);

      // Fetch pending recipes
      const { data: pendingData } = await supabase
        .from('recipes')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      setPendingRecipes(pendingData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeApproval = async (recipeId: string, status: 'approved' | 'rejected', rejectionReason?: string) => {
    try {
      const updateData: any = { status };
      if (rejectionReason) {
        updateData.rejection_reason = rejectionReason;
      }

      const { error } = await supabase
        .from('recipes')
        .update(updateData)
        .eq('id', recipeId);

      if (error) throw error;

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating recipe status:', error);
    }
  };

  const handleUserRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      // Refresh data
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (!userProfile || userProfile.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
          <h2 className="text-xl font-semibold text-gray-700">Access Denied</h2>
          <p className="text-gray-500 mt-2">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage users, recipes, and platform analytics</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'overview'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'users'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'recipes'
              ? 'text-amber-600 border-b-2 border-amber-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Recipe Approval
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</p>
                </div>
                <Users className="text-blue-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Recipes</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRecipes}</p>
                </div>
                <FileText className="text-green-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending Approval</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{stats.pendingRecipes}</p>
                </div>
                <Clock className="text-amber-500" size={32} />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Likes</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalLikes}</p>
                </div>
                <TrendingUp className="text-red-500" size={32} />
              </div>
            </div>
          </div>

          {/* Recipe Status Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recipe Status</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="mx-auto text-green-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-green-700">{stats.approvedRecipes}</p>
                <p className="text-sm text-green-600">Approved</p>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <Clock className="mx-auto text-amber-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-amber-700">{stats.pendingRecipes}</p>
                <p className="text-sm text-amber-600">Pending</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <XCircle className="mx-auto text-red-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-red-700">{stats.rejectedRecipes}</p>
                <p className="text-sm text-red-600">Rejected</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            {stats.recentActivities.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {stats.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <BarChart3 className="text-gray-400" size={20} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.activity_type}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {user.full_name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{user.full_name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleUserRoleChange(user.id, e.target.value as 'user' | 'admin')}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Recipe Approval</h2>
          {pendingRecipes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CheckCircle className="mx-auto text-green-500 mb-2" size={48} />
              <p>No pending recipes to review</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRecipes.map((recipe) => (
                <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>🍽️ {recipe.cuisine}</span>
                        <span>⏱️ {recipe.prep_time + recipe.cook_time} min</span>
                        <span>👥 {recipe.servings} servings</span>
                      </div>
                      {recipe.image_url && (
                        <img
                          src={recipe.image_url}
                          alt={recipe.title}
                          className="mt-3 w-32 h-32 object-cover rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleRecipeApproval(recipe.id, 'approved')}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Enter rejection reason:');
                          if (reason) {
                            handleRecipeApproval(recipe.id, 'rejected', reason);
                          }
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => window.open(`/recipe/${recipe.id}`, '_blank')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};