import React, { useState } from 'react';
import { 
  X, 
  Timer as TimerIcon, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Sparkles, 
  BellRing,
  ChefHat
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveTimer } from '../types';

interface ActiveTimersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActiveTimersModal: React.FC<ActiveTimersModalProps> = ({ isOpen, onClose }) => {
  const { 
    activeTimers, 
    pauseTimer, 
    resumeTimer, 
    resetTimer, 
    deleteTimer, 
    startTimer,
    openRecipeById
  } = useApp();

  const [customTitle, setCustomTitle] = useState('');
  const [customMinutes, setCustomMinutes] = useState('5');

  if (!isOpen) return null;

  const handleAddCustomTimer = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseFloat(customMinutes) || 5;
    if (mins > 0) {
      startTimer(customTitle.trim() || `Kitchen Timer (${mins}m)`, mins);
      setCustomTitle('');
      setCustomMinutes('5');
    }
  };

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in-50">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
        onClick={onClose} 
      />

      {/* Dialog Box */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-stone-200 z-10 p-6 sm:p-7">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <TimerIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-stone-900">
                Kitchen Multi-Timers
              </h3>
              <span className="text-xs text-stone-400">
                {activeTimers.length} {activeTimers.length === 1 ? 'timer' : 'timers'} active
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Add Custom Timer Form */}
        <form onSubmit={handleAddCustomTimer} className="mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Start New Custom Timer
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Timer label (e.g. Simmer sauce, Bake tart)..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs focus:outline-none focus:border-amber-500"
            />
            <input
              type="number"
              min="1"
              max="360"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              className="w-16 px-2.5 py-2 rounded-xl bg-white border border-stone-200 text-xs text-center font-bold focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors shrink-0 shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </form>

        {/* Active Timers List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {activeTimers.length > 0 ? (
            activeTimers.map((timer) => {
              const isCompleted = timer.remainingSeconds === 0;
              const progressPct = ((timer.totalDurationSeconds - timer.remainingSeconds) / timer.totalDurationSeconds) * 100;

              return (
                <div
                  key={timer.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-rose-50 border-rose-300 animate-pulse'
                      : timer.isRunning
                      ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-stone-900">
                        {timer.label}
                      </h4>
                      {timer.recipeTitle && (
                        <span 
                          onClick={() => timer.recipeId && openRecipeById(timer.recipeId)}
                          className="text-[11px] text-amber-700 hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <ChefHat className="w-3 h-3" />
                          <span>{timer.recipeTitle}</span>
                        </span>
                      )}
                    </div>

                    {/* Countdown Digits */}
                    <div className={`font-mono text-2xl font-black ${
                      isCompleted ? 'text-rose-600' : 'text-stone-900'
                    }`}>
                      {formatTimerDisplay(timer.remainingSeconds)}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        isCompleted ? 'bg-rose-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5">
                      {!isCompleted && (
                        <button
                          type="button"
                          onClick={() => timer.isRunning ? pauseTimer(timer.id) : resumeTimer(timer.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors ${
                            timer.isRunning
                              ? 'bg-stone-900 text-white hover:bg-stone-800'
                              : 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                          }`}
                        >
                          {timer.isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{timer.isRunning ? 'Pause' : 'Resume'}</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => resetTimer(timer.id)}
                        className="px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Reset Timer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteTimer(timer.id)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 transition-colors"
                      title="Delete Timer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-stone-400 text-xs">
              <TimerIcon className="w-8 h-8 mx-auto text-stone-300 mb-2" />
              <span>No timers currently running. Start a timer from any recipe step or add one above!</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
