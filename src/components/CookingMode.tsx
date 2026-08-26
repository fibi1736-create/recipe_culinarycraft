import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Timer as TimerIcon, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  ChefHat, 
  Utensils, 
  ShoppingBag,
  Maximize2,
  Mic,
  MicOff,
  Radio,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../types';
import { useApp } from '../context/AppContext';
import { playTimerChime } from '../utils/audio';

interface CookingModeProps {
  recipe: Recipe;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe }) => {
  const { closeCookingMode, startTimer } = useApp();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAwakeActive, setIsAwakeActive] = useState(false);
  const [wakeLockObj, setWakeLockObj] = useState<any>(null);

  // Web Speech API: Voice Commands
  const [isVoiceActive, setIsVoiceActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);
  const [recognizedTranscript, setRecognizedTranscript] = useState<string>('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Step local countdown timer
  const currentStep = recipe.instructions[currentStepIndex];
  const initialStepSeconds = (currentStep?.timerMinutes || 5) * 60;
  
  const [stepTimerSeconds, setStepTimerSeconds] = useState(initialStepSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Reset timer when step changes
  useEffect(() => {
    const secs = (currentStep?.timerMinutes || 5) * 60;
    setStepTimerSeconds(secs);
    setIsTimerRunning(false);
    
    // Stop any ongoing speech when changing steps
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentStepIndex, currentStep]);

  // Step Timer Interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && stepTimerSeconds > 0) {
      interval = setInterval(() => {
        setStepTimerSeconds((prev) => {
          if (prev <= 1) {
            playTimerChime();
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, stepTimerSeconds]);

  // Request WakeLock to keep screen on while cooking
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          const lock = await (navigator as any).wakeLock.request('screen');
          setWakeLockObj(lock);
          setIsAwakeActive(true);
        }
      } catch (err) {
        console.log('WakeLock not supported or denied:', err);
      }
    };
    requestWakeLock();

    return () => {
      if (wakeLockObj) {
        wakeLockObj.release().catch(() => {});
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < recipe.instructions.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      flashVoiceFeedback(`👉 Advanced to Step ${currentStepIndex + 2}`);
    } else {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#ef4444', '#3b82f6']
      });
      flashVoiceFeedback(`🎉 All Steps Completed!`);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      flashVoiceFeedback(`👈 Moved back to Step ${currentStepIndex}`);
    }
  };

  // Web Speech API Voice Reader
  const toggleSpeakStep = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `Step ${currentStep.stepNumber}. ${currentStep.title ? currentStep.title + '. ' : ''}${currentStep.description}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const flashVoiceFeedback = (msg: string) => {
    setVoiceToast(msg);
    setTimeout(() => setVoiceToast(null), 3000);
  };

  // Web Speech API: Speech Recognition Setup for Hands-Free Navigation
  useEffect(() => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setVoiceError('Voice navigation is not supported on this browser (Chrome, Edge, & Safari supported).');
      return;
    }

    if (!isVoiceActive) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError(null);
    };

    recognition.onresult = (event: any) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript.toLowerCase().trim();
      setRecognizedTranscript(transcript);

      // Handle voice command keywords
      if (
        transcript.includes('next') || 
        transcript.includes('forward') || 
        transcript.includes('continue') ||
        transcript.includes('advance') ||
        transcript.includes('next step')
      ) {
        handleNextStep();
      } else if (
        transcript.includes('previous') || 
        transcript.includes('prev') || 
        transcript.includes('back') || 
        transcript.includes('go back') || 
        transcript.includes('last step')
      ) {
        handlePrevStep();
      } else if (
        transcript.includes('repeat') || 
        transcript.includes('read') || 
        transcript.includes('say again') || 
        transcript.includes('again') ||
        transcript.includes('read step')
      ) {
        flashVoiceFeedback(`🔊 Reading Step ${currentStep.stepNumber}`);
        toggleSpeakStep();
      } else if (
        transcript.includes('start timer') ||
        transcript.includes('play timer') ||
        transcript.includes('timer start')
      ) {
        setIsTimerRunning(true);
        flashVoiceFeedback(`⏱️ Timer Started`);
      } else if (
        transcript.includes('pause timer') ||
        transcript.includes('stop timer')
      ) {
        setIsTimerRunning(false);
        flashVoiceFeedback(`⏸️ Timer Paused`);
      }
    };

    recognition.onerror = (event: any) => {
      // Ignore normal aborts
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setVoiceError('Microphone permission required for voice commands.');
        }
      }
    };

    recognition.onend = () => {
      // If voice active, continuously restart recognition loop
      if (isVoiceActive) {
        try {
          recognition.start();
        } catch {
          setIsListening(false);
        }
      } else {
        setIsListening(false);
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Could not start speech recognition:', e);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, [isVoiceActive, currentStepIndex, currentStep]);

  const isLastStep = currentStepIndex === recipe.instructions.length - 1;
  const totalStepsCount = recipe.instructions.length;
  const progressPercent = ((currentStepIndex + 1) / totalStepsCount) * 100;

  return (
    <div id="cooking-mode-modal" className="fixed inset-0 z-50 bg-stone-950 text-white flex flex-col justify-between overflow-hidden animate-in fade-in-50 duration-200">
      
      {/* Subtle Visual Progress Bar Fixed at Top Edge */}
      <div 
        id="cooking-top-progress-bar"
        className="fixed top-0 inset-x-0 z-50 h-1.5 bg-stone-850 overflow-hidden"
        title={`Step ${currentStepIndex + 1} of ${totalStepsCount} (${Math.round(progressPercent)}% completed)`}
      >
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="px-4 sm:px-8 py-4 pt-5 border-b border-stone-800 flex items-center justify-between bg-stone-900/95 backdrop-blur-md">
        
        {/* Left: Recipe Name and Step X of Y */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 font-bold flex items-center justify-center shadow-md">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest block">
                Hands-Free Cooking Mode
              </span>
              {isListening && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Voice Live
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit',sans-serif] line-clamp-1">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Center: Step Progress & Segmented Visual Dots */}
        <div className="hidden md:flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-stone-300 uppercase tracking-wider">
              Step {currentStepIndex + 1} of {totalStepsCount}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {Math.round(progressPercent)}% Done
            </span>
          </div>

          {/* Segmented Step Pills */}
          <div className="flex items-center gap-1.5">
            {recipe.instructions.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx < currentStepIndex
                    ? 'w-6 bg-emerald-500 hover:bg-emerald-400'
                    : idx === currentStepIndex
                    ? 'w-10 bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)] animate-pulse'
                    : 'w-4 bg-stone-700 hover:bg-stone-500'
                }`}
                title={`Jump to step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Tools & Exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Voice Command Recognition Toggle Button with Ripple Wave */}
          <button
            type="button"
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`relative px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isVoiceActive && isListening
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_16px_rgba(16,185,129,0.4)] animate-listening-ripple'
                : isVoiceActive
                ? 'bg-stone-800 text-amber-400 border-stone-700'
                : 'bg-stone-800 text-stone-500 border-stone-700 hover:text-stone-300'
            }`}
            title={isVoiceActive ? 'Voice navigation active (Say Next / Previous / Repeat)' : 'Enable voice commands'}
          >
            {isVoiceActive ? <Mic className="w-4 h-4 text-emerald-400" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{isVoiceActive ? 'Voice On' : 'Voice Off'}</span>
          </button>

          {/* Ingredients Drawer Toggle */}
          <button
            type="button"
            onClick={() => setShowIngredientsDrawer(!showIngredientsDrawer)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
              showIngredientsDrawer 
                ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
            }`}
            title="Toggle ingredients"
          >
            <Utensils className="w-4 h-4" />
            <span className="hidden sm:inline">Ingredients</span>
          </button>

          {/* Voice Narration Button */}
          {'speechSynthesis' in window && (
            <button
              type="button"
              onClick={toggleSpeakStep}
              className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                isSpeaking 
                  ? 'bg-amber-500 text-stone-950 border-amber-500 animate-pulse shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                  : 'bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700'
              }`}
              title={isSpeaking ? 'Stop narration' : 'Read step aloud'}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}

          {/* Close Cooking Mode Button */}
          <button
            type="button"
            onClick={closeCookingMode}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 hover:text-white text-stone-300 border border-stone-700 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            title="Exit Cooking Mode"
          >
            <X className="w-5 h-5" />
          </button>

        </div>
      </header>

      {/* Voice Commands Cheatsheet Banner */}
      <div className="px-4 sm:px-8 py-2 bg-stone-900/80 border-b border-stone-800/80 flex items-center justify-between text-xs text-stone-300 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Voice Commands:</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-stone-800 border border-stone-700 text-stone-200 font-mono">
              "Next"
            </span>
            <span className="text-stone-500">·</span>
            <span className="px-2 py-0.5 rounded-md bg-stone-800 border border-stone-700 text-stone-200 font-mono">
              "Previous"
            </span>
            <span className="text-stone-500">·</span>
            <span className="px-2 py-0.5 rounded-md bg-stone-800 border border-stone-700 text-stone-200 font-mono">
              "Repeat"
            </span>
            <span className="text-stone-500">·</span>
            <span className="px-2 py-0.5 rounded-md bg-stone-800 border border-stone-700 text-stone-200 font-mono">
              "Start Timer"
            </span>
          </div>
        </div>

        {/* Live Detected Transcript Toast */}
        {voiceToast ? (
          <span className="px-3 py-0.5 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs animate-bounce shadow-md">
            {voiceToast}
          </span>
        ) : recognizedTranscript ? (
          <span className="text-[11px] text-stone-400 font-mono italic truncate max-w-xs">
            Heard: "{recognizedTranscript}"
          </span>
        ) : null}
      </div>

      {/* Segmented Step Indicator (Mobile) */}
      <div className="md:hidden px-4 py-2 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
        <span className="text-xs font-bold text-stone-300">
          Step {currentStepIndex + 1} of {totalStepsCount} ({Math.round(progressPercent)}%)
        </span>
        <div className="flex items-center gap-1">
          {recipe.instructions.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all ${
                idx < currentStepIndex
                  ? 'w-3 bg-emerald-500'
                  : idx === currentStepIndex
                  ? 'w-5 bg-amber-400'
                  : 'w-2 bg-stone-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Focus Canvas */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 flex flex-col justify-center relative overflow-y-auto">
        
        <div className="space-y-6 animate-in fade-in-50 duration-300">
          
          {/* Step Indicator & Voice Pill */}
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-sm font-extrabold uppercase tracking-wider font-['Outfit',sans-serif]">
              Step {currentStep.stepNumber} of {recipe.instructions.length}
            </span>

            {isAwakeActive && (
              <span className="text-xs text-stone-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Screen Awake Active
              </span>
            )}
          </div>

          {/* Step Title */}
          {currentStep.title && (
            <h3 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] text-white tracking-tight leading-tight">
              {currentStep.title}
            </h3>
          )}

          {/* Large High-Contrast Step Description */}
          <div className="p-6 sm:p-10 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-2xl">
            <p className="text-xl sm:text-3xl text-stone-100 font-medium leading-relaxed font-['Plus_Jakarta_Sans',sans-serif]">
              {currentStep.description}
            </p>

            {/* Chef Tip inside Cooking Mode */}
            {currentStep.tip && (
              <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm sm:text-base flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-amber-300 block mb-0.5">Chef's Secret:</strong>
                  <span>{currentStep.tip}</span>
                </div>
              </div>
            )}
          </div>

          {/* Active Step Timer Panel */}
          {currentStep.timerMinutes && (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-850 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  isTimerRunning ? 'bg-amber-500 text-stone-950 animate-pulse' : 'bg-stone-800 text-amber-400'
                }`}>
                  <TimerIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 uppercase tracking-wider block font-semibold">
                    Step Timer Countdown
                  </span>
                  <span className="text-3xl sm:text-4xl font-mono font-bold text-amber-400 tracking-wider">
                    {formatTime(stepTimerSeconds)}
                  </span>
                </div>
              </div>

              {/* Timer Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 sm:flex-initial px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 ${
                    isTimerRunning
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isTimerRunning ? 'Pause Timer' : 'Start Timer'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setStepTimerSeconds(initialStepSeconds);
                  }}
                  className="p-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Floating Ingredients Slide-Over Drawer */}
      {showIngredientsDrawer && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl z-50 p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
              <div className="flex items-center gap-2 font-bold text-lg text-white font-['Outfit',sans-serif]">
                <Utensils className="w-5 h-5 text-amber-400" />
                <span>Ingredients Checklist</span>
              </div>
              <button
                type="button"
                onClick={() => setShowIngredientsDrawer(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
              {recipe.ingredients.map((ing) => (
                <li key={ing.id} className="p-3 rounded-xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-between text-sm">
                  <span className="text-stone-200 font-medium">• {ing.name}</span>
                  <strong className="text-amber-400 font-bold ml-2 whitespace-nowrap">
                    {ing.quantity} {ing.unit}
                  </strong>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setShowIngredientsDrawer(false)}
            className="w-full py-3 rounded-xl bg-stone-800 text-stone-200 font-bold text-sm hover:bg-stone-700 transition-colors"
          >
            Back to Step
          </button>
        </div>
      )}

      {/* Bottom Navigation Toolbar */}
      <footer className="px-4 sm:px-8 py-5 border-t border-stone-800 bg-stone-900/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          
          {/* Previous Step Button */}
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-stone-800 text-stone-500'
                : 'bg-stone-800 hover:bg-stone-700 text-white shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {/* Next / Complete Step Button */}
          <button
            type="button"
            onClick={handleNextStep}
            className={`px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl transition-transform hover:scale-105 ${
              isLastStep
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-stone-950 font-extrabold'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950'
            }`}
          >
            <span>{isLastStep ? 'Complete Recipe! 🎉' : 'Next Step'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </footer>

    </div>
  );
};
