import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Filter, 
  User,
  Tag
} from 'lucide-react';
import { Recipe, RecipeReview } from '../types';
import { useApp } from '../context/AppContext';

interface RecipeReviewsSectionProps {
  recipe: Recipe;
}

export const RecipeReviewsSection: React.FC<RecipeReviewsSectionProps> = ({ recipe }) => {
  const { addRecipeReview, voteReviewHelpful } = useApp();

  const [isWritingReview, setIsWritingReview] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [authorName, setAuthorName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'helpful'>('newest');
  const [submittedToast, setSubmittedToast] = useState(false);
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  const availableTags = [
    'Family Favorite',
    'Quick Weeknight',
    'Flavors on Point',
    'Substituted Ingredient',
    'Meal Prep Friendly',
    'Kids Loved It',
    'Restaurant Quality',
  ];

  // Default seed reviews if recipe doesn't have any attached yet
  const defaultSampleReviews: RecipeReview[] = [
    {
      id: 'seed-1',
      author: 'Sophia Chen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '2 days ago',
      comment: `Made this for Sunday family dinner and everyone was blown away! The flavor balance and instructions were spot on. Will definitely cook this weekly.`,
      tags: ['Family Favorite', 'Flavors on Point'],
      helpfulCount: 14,
    },
    {
      id: 'seed-2',
      author: 'David Miller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '1 week ago',
      comment: `The timing tips in cooking mode were super helpful. I added a touch more garlic and it elevated the entire aroma. 10/10 recommended!`,
      tags: ['Restaurant Quality'],
      helpfulCount: 9,
    },
  ];

  const reviewsList: RecipeReview[] = (recipe.reviews && recipe.reviews.length > 0)
    ? recipe.reviews
    : defaultSampleReviews;

  // Rating distribution breakdown
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviewsList.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const totalReviewsCount = Math.max(recipe.reviewsCount, reviewsList.length);

  // Sorting
  const sortedReviews = [...reviewsList].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.rating - a.rating;
    }
    if (sortBy === 'helpful') {
      return (b.helpfulCount || 0) - (a.helpfulCount || 0);
    }
    return 0; // Default order (most recent)
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    addRecipeReview(recipe.id, {
      author: authorName.trim() || 'Food Enthusiast',
      rating: selectedRating,
      comment: reviewComment.trim(),
      tags: selectedTags,
    });

    setReviewComment('');
    setAuthorName('');
    setSelectedTags([]);
    setIsWritingReview(false);
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3500);
  };

  const handleVoteHelpful = (reviewId: string) => {
    if (votedMap[reviewId]) return;
    voteReviewHelpful(recipe.id, reviewId);
    setVotedMap((prev) => ({ ...prev, [reviewId]: true }));
  };

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 5:
        return 'Perfection! Loved everything';
      case 4:
        return 'Delicious, very good';
      case 3:
        return 'Good, minor adjustments';
      case 2:
        return 'Average / okay';
      case 1:
        return 'Did not meet expectations';
      default:
        return '';
    }
  };

  return (
    <section id="recipe-reviews-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-['Outfit',sans-serif]">
              Community Reviews & Ratings
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-mono">
              {totalReviewsCount}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real feedback and cooking notes from home chefs who prepared this recipe
          </p>
        </div>

        {/* Write a Review Button */}
        <button
          type="button"
          onClick={() => setIsWritingReview(!isWritingReview)}
          className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm self-start sm:self-auto"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{isWritingReview ? 'Close Form' : 'Write a Review'}</span>
        </button>
      </div>

      {submittedToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in-50">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Thank you! Your review and rating have been posted successfully.</span>
        </div>
      )}

      {/* Ratings Scorecard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl bg-stone-50 border border-stone-200/80">
        
        {/* Left: Overall Score */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-stone-200">
          <span className="text-5xl font-black font-['Outfit',sans-serif] text-stone-950">
            {recipe.rating.toFixed(1)}
          </span>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(recipe.rating)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-stone-500">
            Based on {totalReviewsCount} home chef ratings
          </span>
        </div>

        {/* Right: Star Distribution Bars */}
        <div className="md:col-span-8 space-y-2 flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingCounts[star] || 0;
            const pct = reviewsList.length > 0 ? Math.round((count / reviewsList.length) * 100) : star === 5 ? 85 : 15;
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-bold text-stone-700 flex items-center gap-1">
                  <span>{star}</span>
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500 inline" />
                </span>

                <div className="flex-1 h-2.5 rounded-full bg-stone-200/80 overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  />
                </div>

                <span className="w-10 text-right font-mono text-[11px] text-stone-400">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Submission Form Modal / Box */}
      {isWritingReview && (
        <form
          onSubmit={handleSubmitReview}
          className="p-6 rounded-3xl bg-amber-50/40 border-2 border-amber-500/30 space-y-5 animate-in slide-in-from-top-4 duration-200"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-stone-900 font-['Outfit',sans-serif]">
              Leave Your Recipe Review
            </h3>
            <span className="text-xs text-stone-500">All fields are welcome</span>
          </div>

          {/* Interactive Star Rating Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Overall Rating:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setSelectedRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1 text-stone-300 hover:text-amber-500 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating !== null ? hoverRating : selectedRating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-xs font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg">
                {getRatingLabel(hoverRating !== null ? hoverRating : selectedRating)}
              </span>
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Your Name / Handle:
            </label>
            <input
              type="text"
              placeholder="e.g. Chef Sarah or Homemade Foodie"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full sm:max-w-md px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Your Cooking Experience & Notes:
            </label>
            <textarea
              required
              rows={4}
              placeholder="How did the flavor turn out? Did you make any substitutions or adjust cook times? Any tips for other home cooks?"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full p-4 rounded-2xl bg-white border border-stone-200 text-stone-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>

          {/* Tags / Badges */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Select Quick Tags (Optional):
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 shadow-xs'
                        : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Review</span>
            </button>
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Reviews Filter & Sort Bar */}
      <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
        <span className="text-xs font-bold text-stone-700">
          Showing {sortedReviews.length} Community Reviews
        </span>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rating (5★)</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((rev) => {
          const isVoted = votedMap[rev.id];
          return (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200 shadow-2xs"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-stone-900">
                      {rev.author}
                    </h4>
                    <span className="text-[11px] text-stone-400">{rev.date}</span>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-0.5 bg-amber-50/70 border border-amber-200/60 px-2.5 py-1 rounded-xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= rev.rating
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {rev.comment}
              </p>

              {/* Tags and Helpful Button */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-stone-100 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {rev.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-lg bg-stone-100 text-stone-600 font-semibold text-[10px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleVoteHelpful(rev.id)}
                  disabled={isVoted}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isVoted
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${isVoted ? 'text-emerald-600' : 'text-stone-400'}`} />
                  <span>Helpful ({rev.helpfulCount || 0})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
