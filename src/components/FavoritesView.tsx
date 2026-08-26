import React, { useState } from 'react';
import { 
  Heart, 
  FolderPlus, 
  Bookmark, 
  Folder, 
  Plus, 
  Trash2, 
  ChefHat, 
  ArrowRight, 
  Sparkles,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from './RecipeCard';

export const FavoritesView: React.FC = () => {
  const { 
    favorites, 
    recipes, 
    collections, 
    createCollection, 
    deleteCollection, 
    setActiveView 
  } = useApp();

  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColColor, setNewColColor] = useState('bg-amber-500');

  const colorOptions = [
    { label: 'Amber', class: 'bg-amber-500' },
    { label: 'Rose', class: 'bg-rose-500' },
    { label: 'Emerald', class: 'bg-emerald-500' },
    { label: 'Sky', class: 'bg-sky-500' },
    { label: 'Purple', class: 'bg-purple-500' },
  ];

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (newColName.trim()) {
      createCollection(newColName.trim(), newColColor);
      setNewColName('');
      setShowCreateModal(false);
    }
  };

  // Get favorited recipes
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  // If a collection is selected, filter to that collection
  const activeCollection = collections.find(c => c.id === selectedCollectionId);
  const displayRecipes = selectedCollectionId && activeCollection
    ? recipes.filter(r => activeCollection.recipeIds.includes(r.id))
    : favoriteRecipes;

  return (
    <div id="favorites-collections-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Personal Recipe Box</span>
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
            Favorites & Custom Collections
          </h1>
          <p className="text-stone-500 text-sm mt-0.5">
            Organize your bookmarked dishes into custom folders for dinner parties, quick lunches, and holiday treats.
          </p>
        </div>

        {/* Create Collection Button */}
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors"
        >
          <FolderPlus className="w-4 h-4 text-amber-400" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collections Tabs Bar */}
      <div className="mt-8 flex items-center gap-2.5 overflow-x-auto pb-2">
        
        {/* All Favorites Pill */}
        <button
          type="button"
          onClick={() => setSelectedCollectionId(null)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            selectedCollectionId === null
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${selectedCollectionId === null ? 'fill-white' : 'text-rose-500'}`} />
          <span>All Favorites ({favorites.length})</span>
        </button>

        {/* Custom User Collections */}
        {collections.map((col) => (
          <div key={col.id} className="relative group shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => setSelectedCollectionId(col.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedCollectionId === col.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${col.color || 'bg-amber-500'}`} />
              <span>{col.name}</span>
              <span className="opacity-70 text-[11px]">({col.recipeIds.length})</span>
            </button>

            {/* Delete collection button on hover */}
            <button
              type="button"
              onClick={() => deleteCollection(col.id)}
              className="ml-1 p-1 text-stone-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete collection"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className="mt-8">
        {displayRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} showCollectionAdd />
            ))}
          </div>
        ) : (
          /* Empty Favorites State */
          <div className="bg-white rounded-3xl p-12 border border-stone-200 text-center shadow-sm">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-['Outfit',sans-serif]">
              {selectedCollectionId ? 'This collection is empty' : 'No favorites saved yet'}
            </h3>
            <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
              Tap the heart icon on any recipe to save it to your personal recipe box for instant access anytime.
            </p>
            <button
              onClick={() => setActiveView('recipes')}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-sm shadow-md inline-flex items-center gap-2 transition-all"
            >
              <span>Explore Master Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50">
          <div 
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)} 
          />

          <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-stone-200 z-10 p-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-stone-900">
                Create Recipe Collection
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCollection} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Quick Weeknight Dinners, Holiday Sweets"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 text-sm bg-stone-50"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                  Tag Color
                </label>
                <div className="flex gap-3">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.class}
                      type="button"
                      onClick={() => setNewColColor(opt.class)}
                      className={`w-8 h-8 rounded-full ${opt.class} flex items-center justify-center transition-transform ${
                        newColColor === opt.class ? 'ring-4 ring-stone-900/20 scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newColName.trim()}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs transition-colors shadow-md"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
