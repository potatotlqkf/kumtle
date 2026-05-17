import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, X, Sparkles, Check, Heart } from "lucide-react";

interface HealingGameProps {
  onClose: (happinessGain: number) => void;
}

export default function HealingGame({ onClose }: HealingGameProps) {
  const [completed, setCompleted] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#E89E8D");
  const [grid, setGrid] = useState(Array(100).fill("#FFFFFF"));

  const COLORS = ["#E89E8D", "#FFD1BA", "#8A9A5B", "#D2B48C", "#4A3F35"];

  const handlePixelClick = (idx: number) => {
    const newGrid = [...grid];
    newGrid[idx] = selectedColor;
    setGrid(newGrid);

    // Auto complete if many pixels are filled
    if (newGrid.filter(c => c !== "#FFFFFF").length >= 40) {
      setCompleted(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-text/20 backdrop-blur-md z-[60] flex items-center justify-center px-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/90 backdrop-blur-2xl w-full max-w-sm rounded-[48px] shadow-2xl overflow-hidden p-10 flex flex-col items-center gap-8 border border-white"
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary">
              <Palette size={20} />
            </div>
            <h3 className="text-xl font-serif italic font-bold text-brand-text tracking-tight">미술 치료</h3>
          </div>
          <button onClick={() => onClose(0)} className="text-brand-text/20 hover:text-brand-text transition-colors"><X size={24} /></button>
        </div>

        <p className="text-xs sans font-bold text-brand-text/40 text-center uppercase tracking-widest leading-relaxed">
          마음이 가는 색으로 자유롭게 칠해보세요.<br/>오늘의 감정을 색으로 표현합니다.
        </p>

        {/* Pixel Grid */}
        <div className="grid grid-cols-10 gap-1 bg-brand-bg/50 p-3 rounded-2xl border border-brand-text/5 aspect-square w-full shadow-inner">
          {grid.map((color, i) => (
            <div 
              key={i} 
              onClick={() => handlePixelClick(i)}
              className="aspect-square rounded-sm cursor-pointer transition-colors hover:scale-110 active:scale-90"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Color Palette */}
        <div className="flex gap-4">
          {COLORS.map(c => (
            <button 
              key={c}
              onClick={() => setSelectedColor(c)}
              className={`w-10 h-10 rounded-full border-4 transition-all shadow-md ${selectedColor === c ? 'border-white scale-125 shadow-xl ring-2 ring-brand-primary/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <AnimatePresence>
          {completed && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-8 bg-brand-accent/5 rounded-[32px] border border-brand-accent/20 flex flex-col items-center gap-4 text-center mt-2 shadow-sm"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-md">
                <Sparkles size={28} />
              </div>
              <p className="text-base font-child font-bold text-brand-accent italic leading-tight">
                "엄마! 오늘 게임을 통해서 엄마의 마음 속 편안함이 15% 증가했습니다! 오늘 밤은 어제보다 편안하게 주무실거예요"
              </p>
              <button 
                onClick={() => onClose(15)}
                className="bg-brand-accent text-white px-10 py-4 rounded-[20px] font-black sans flex items-center gap-3 shadow-lg shadow-brand-accent/20 uppercase tracking-widest text-xs"
              >
                고마워 <Check size={18} strokeWidth={3} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
