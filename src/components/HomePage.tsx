import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Thermometer, ChevronLeft, ChevronRight, Flower2, Heart, Sparkles, Baby } from "lucide-react";
import { AppState } from "../types";
import HealingGame from "./HealingGame";

interface HomePageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export default function HomePage({ state, setState }: HomePageProps) {
  const [showGame, setShowGame] = useState(false);
  const happinessWidth = `${state.happinessIndex}%`;

  const handleGameClose = (gain: number) => {
    setShowGame(false);
    if (gain > 0) {
      setState(prev => ({ ...prev, happinessIndex: Math.min(100, prev.happinessIndex + gain) }));
    }
  };

  return (
    <div className="h-full flex flex-col relative w-full overflow-hidden">
      {showGame && <HealingGame onClose={handleGameClose} />}
      {/* Background Layer with soft gradient */}
      <div 
        className="absolute inset-0 transition-all duration-1000 bg-gradient-to-b from-[#E0F0E0]/30 to-brand-bg"
      >
        {state.fetus.backgroundImageUrl ? (
          <img 
            src={state.fetus.backgroundImageUrl} 
            className="w-full h-full object-cover opacity-60" 
            alt="background"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#8A9A5B 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        )}
      </div>

      {/* Happiness Index - Compact vertical gauge on the side */}
      <div className="absolute top-20 right-6 z-10 flex flex-col items-center gap-2">
        <div className="bg-white/60 backdrop-blur-md p-3 rounded-full shadow-sm border border-brand-primary/10 flex flex-col items-center gap-2">
          <span className="sans font-bold text-brand-primary text-[10px]">{state.happinessIndex}%</span>
          <div className="h-20 w-1.5 bg-brand-bg/50 rounded-full relative overflow-hidden">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${state.happinessIndex}%` }}
              className="absolute bottom-0 w-full bg-gradient-to-t from-brand-primary to-brand-secondary happiness-glow"
            />
          </div>
          <Thermometer size={12} className="text-brand-primary/40" />
        </div>
      </div>

      {/* Main Character Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-12">
        <motion.div
          animate={{ 
            y: [0, -12, 0],
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative group mt-12"
        >
          {/* Character Image with soft glow/ring */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl -z-10 group-hover:bg-brand-primary/20 transition-all"></div>
            {state.fetus.characterImageUrl ? (
              <img 
                src={state.fetus.characterImageUrl} 
                className="w-56 h-56 object-contain drop-shadow-[0_20px_50px_rgba(74,63,53,0.15)] ring-8 ring-white/50 rounded-full" 
                alt="character"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-56 h-56 bg-brand-secondary/30 backdrop-blur-xl rounded-full flex items-center justify-center border-4 border-dashed border-white shadow-inner">
                <Baby size={80} className="text-brand-primary/50" />
              </div>
            )}
            
            {/* Growth Label */}
            <div className="absolute -bottom-2 -right-2 bg-white shadow-xl px-4 py-1.5 rounded-full border border-brand-text/5 flex items-center gap-2">
              <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">W{state.fetus.week}</span>
            </div>
          </div>

          {/* Speech Bubble - Restored to top-center above the character */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-4 rounded-[32px] shadow-xl border border-white min-w-[200px] text-center z-20"
          >
            <p className="text-sm serif italic font-medium text-brand-text leading-tight">
              {state.fetus.week > 20 ? "\"엄마, 저 지금 발차기 했어요! 느껴지세요?\"" : "\"엄마, 오늘도 맛있는 거 많이 드세요!\""}
            </p>
            <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white/90"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="p-8 flex justify-center items-center z-10 gap-4">
          <button 
            onClick={() => setShowGame(true)}
            className="card-soft p-5 px-8 flex flex-col items-center gap-1 group transition-all hover:bg-brand-primary hover:text-white group"
          >
            <Flower2 size={24} className="text-brand-primary group-hover:text-white group-hover:rotate-12 transition-all" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Care</span>
          </button>
          
          <button 
            className="card-soft p-5 px-8 flex flex-col items-center gap-1 group transition-all hover:bg-brand-accent hover:text-white"
          >
            <Heart size={24} className="text-brand-accent group-hover:text-white group-hover:scale-125 transition-all" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">Love</span>
          </button>
      </div>
    </div>
  );
}
