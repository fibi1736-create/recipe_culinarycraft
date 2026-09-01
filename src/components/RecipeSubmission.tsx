import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../context/AuthContext';
import { uploadImage, uploadVideo } from '../utils/cloudinary';
import { Upload, X, Image as ImageIcon, Video, ChefHat, Clock, Users, Star } from 'lucide-react';

export const RecipeSubmission: React.FC = () => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cuisine: '',
    dietary_type: '',
    prep_time: 0,
    cook_time: 0,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [] as Array<{ name: string; quantity: number; unit: string }>,
    instructions: [] as string[],
    image_url: '',
    video_url: '',
  });

  const [currentIngredient, setCurrentIngredient] = useState({ name: '', quantity: 1, unit: '' });
  const [currentInstruction, setCurrentInstruction] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setUploadProgress(30);
      const result = await uploadImage(file);
      setFormData(prev => ({ ...prev, image_url: result.secure_url }));
      setUploadProgress(100);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      setUploadProgress(30);
      const result = await uploadVideo(file);
      setFormData(prev => ({ ...prev, video_url: result.secure_url }));
      setUploadProgress(100);
    } catch (err: any) {
      setError(err.message || 'Video upload failed');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const addIngredient = () => {
    if (currentIngredient.name && currentIngredient.unit) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, { ...currentIngredient }]
      }));
      setCurrentIngredient({ name: '', quantity: 1, unit: '' });
    }
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const addInstruction = () => {
    if (currentInstruction.trim()) {
      setFormData(prev => ({
        ...prev,
        instructions: [...prev.instructions, currentInstruction.trim()]
      }));
      setCurrentInstruction('');
    }
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    try {
      setLoading(true);
      setError('');

      // Log activity
      await supabase.from('user_activities').insert({
        user_id: userProfile.id,
        activity_type: 'recipe_upload',
        resource_type: 'recipe',
        metadata: { recipe_title: formData.title }
      });

      // Insert recipe with pending status
      const { error } = await supabase.from('recipes').insert({
        title: formData.title,
        description: formData.description,
        cuisine: formData.cuisine,
        dietary_type: formData.dietary_type,
        ingredients: JSON.stringify(formData.ingredients),
        instructions: formData.instructions,
        prep_time: formData.prep_time,
        cook_time: formData.cook_time,
        servings: formData.servings,
        difficulty: formData.difficulty,
        image_url: formData.image_url,
        video_url: formData.video_url,
        author_id: userProfile.id,
        status: 'pending' // Requires admin approval
      });

      if (error) throw error;

      alert('Recipe submitted successfully! It will be reviewed by an admin before being published.');
      // Reset form
      setFormData({
        title: '',
        description: '',
        cuisine: '',
        dietary_type: '',
        prep_time: 0,
        cook_time: 0,
        servings: 4,
        difficulty: 'Medium',
        ingredients: [],
        instructions: [],
        image_url: '',
        video_url: '',
      });
    } catch (err: any) {
      setError(err.message || 'Recipe submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <ChefHat className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-xl font-semibold text-gray-700">Sign in to submit recipes</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Submit New Recipe</h1>
          <p className="text-gray-500 mt-2">Share your culinary creation with the community. Your recipe will be reviewed by our admin team before being published.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {uploadProgress > 0 && (
          <div className="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-lg mb-6">
            Uploading media... {uploadProgress}%
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="e.g., Classic Margherita Pizza"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                rows={3}
                placeholder="Describe your recipe..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine *</label>
                <select
                  value={formData.cuisine}
                  onChange={(e) => setFormData(prev => ({ ...prev, cuisine: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Select cuisine</option>
                  <option value="Italian">Italian</option>
                  <option value="Indian">Indian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Mexican">Mexican</option>
                  <option value="Thai">Thai</option>
                  <option value="American">American</option>
                  <option value="Mediterranean">Mediterranean</option>
                  <option value="French">French</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Type *</label>
                <select
                  value={formData.dietary_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, dietary_type: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                >
                  <option value="">Select dietary type</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                  <option value="Seafood">Seafood</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time (min) *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={formData.prep_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, prep_time: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time (min) *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={formData.cook_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, cook_time: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) => setFormData(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Media Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Media</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Image</label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <div className="text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {formData.image_url && (
                  <div className="relative">
                    <img src={formData.image_url} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Video (Optional)</label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 flex items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 transition-colors">
                  <div className="text-center">
                    <Video className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-500">Click to upload video</p>
                    <p className="text-xs text-gray-400">MP4, MOV, WEBM up to 50MB</p>
                  </div>
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                </label>
                {formData.video_url && (
                  <div className="relative">
                    <video src={formData.video_url} className="w-32 h-32 object-cover rounded-lg" controls />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, video_url: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Ingredients</h3>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentIngredient.name}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, name: e.target.value }))}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Ingredient name"
              />
              <input
                type="number"
                value={currentIngredient.quantity}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, quantity: parseFloat(e.target.value) || 1 }))}
                className="w-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Qty"
                min="0"
                step="0.1"
              />
              <input
                type="text"
                value={currentIngredient.unit}
                onChange={(e) => setCurrentIngredient(prev => ({ ...prev, unit: e.target.value }))}
                className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Unit"
              />
              <button
                type="button"
                onClick={addIngredient}
                className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Add
              </button>
            </div>

            {formData.ingredients.length > 0 && (
              <div className="space-y-2">
                {formData.ingredients.map((ing, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{ing.quantity} {ing.unit} {ing.name}</span>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Instructions</h3>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentInstruction}
                onChange={(e) => setCurrentInstruction(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Enter instruction step"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInstruction())}
              />
              <button
                type="button"
                onClick={addInstruction}
                className="px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Add
              </button>
            </div>

            {formData.instructions.length > 0 && (
              <div className="space-y-2">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="flex-1">{instruction}</p>
                    <button
                      type="button"
                      onClick={() => removeInstruction(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-4 rounded-lg font-semibold hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Recipe for Review'}
          </button>
        </form>
      </div>
    </div>
  );
};