import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Heart, ChevronRight, User, Baby, Check } from "lucide-react";
import { AppState, SharedQuestion } from "../types";

interface QuestionPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export default function QuestionPage({ state, setState }: QuestionPageProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<SharedQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState<'mom' | 'dad'>('mom');

  const handleAnswer = () => {
    if (!selectedQuestion || !answer.trim()) return;

    setState(prev => ({
      ...prev,
      sharedQuestions: prev.sharedQuestions.map(q => 
        q.id === selectedQuestion.id 
          ? { ...q, [role === 'mom' ? 'momAnswer' : 'dadAnswer']: answer } 
          : q
      ),
      happinessIndex: Math.min(100, prev.happinessIndex + 5)
    }));

    setAnswer("");
    setSelectedQuestion(null);
  };

  return (
    <div className="h-full flex flex-col bg-brand-bg px-8 py-10">
      <div className="mb-10">
        <h2 className="text-3xl font-serif italic font-bold text-brand-text tracking-tight">마음 잇기</h2>
        <p className="text-xs sans font-bold text-brand-text/30 mt-2 uppercase tracking-[0.2em]">Soul Connection</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pb-10">
        {state.sharedQuestions.map((q) => (
          <button 
            key={q.id}
            onClick={() => setSelectedQuestion(q)}
            className="w-full text-left card-soft p-8 shadow-sm flex items-center justify-between group transition-all hover:bg-white hover:shadow-md border border-white"
          >
            <div className="flex-1 mr-4">
              <span className="text-[10px] sans font-black text-brand-primary uppercase tracking-[0.3em] mb-2 block opacity-60">Question</span>
              <p className="text-brand-text font-semibold text-lg leading-snug group-hover:text-brand-primary transition-colors">{q.question}</p>
              <div className="flex gap-4 mt-6">
                <div className={`w-10 h-10 rounded-2xl ring-2 ring-white shadow-sm flex items-center justify-center transition-all ${q.momAnswer ? 'bg-brand-primary text-white' : 'bg-brand-bg text-brand-text/20'}`}>
                  <User size={18} />
                </div>
                <div className={`w-10 h-10 rounded-2xl ring-2 ring-white shadow-sm flex items-center justify-center transition-all ${q.dadAnswer ? 'bg-brand-accent text-white' : 'bg-brand-bg text-brand-text/20'}`}>
                  <User size={18} />
                </div>
              </div>
            </div>
            <ChevronRight className="text-brand-text/20 group-hover:translate-x-2 transition-all" size={24} />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedQuestion && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuestion(null)}
              className="fixed inset-0 bg-brand-text/20 backdrop-blur-md z-50 flex items-center justify-center px-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 backdrop-blur-2xl w-full max-w-sm rounded-[48px] shadow-[0_40px_100px_rgba(74,63,53,0.2)] overflow-hidden border border-white"
              >
                <div className="bg-brand-primary p-10 text-white">
                  <span className="text-[10px] sans font-black uppercase tracking-[0.3em] opacity-60 mb-3 block">Daily Question</span>
                  <h3 className="text-2xl font-serif italic font-bold leading-tight tracking-tight">{selectedQuestion.question}</h3>
                </div>
                
                <div className="p-10 space-y-8">
                  <div className="flex bg-brand-bg/50 p-1.5 rounded-[24px] border border-brand-text/5 shadow-inner">
                    <button 
                      onClick={() => setRole('mom')}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[18px] font-bold text-sm tracking-widest transition-all ${role === 'mom' ? 'bg-white shadow-md text-brand-primary ring-1 ring-brand-text/5' : 'text-brand-text/30'}`}
                    >
                      엄마 Mom
                    </button>
                    <button 
                      onClick={() => setRole('dad')}
                      className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[18px] font-bold text-sm tracking-widest transition-all ${role === 'dad' ? 'bg-white shadow-md text-brand-accent ring-1 ring-brand-text/5' : 'text-brand-text/30'}`}
                    >
                      아빠 Dad
                    </button>
                  </div>

                  <textarea 
                    autoFocus
                    placeholder={`${role === 'mom' ? '엄마' : '아빠'}의 진심을 들려주세요...`}
                    className="w-full bg-brand-bg/30 p-8 rounded-[32px] min-h-[180px] outline-none placeholder:text-brand-text/20 text-brand-text font-medium text-lg leading-relaxed border border-white"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />

                  <button 
                    disabled={!answer.trim()}
                    onClick={handleAnswer}
                    className={`w-full py-5 rounded-[24px] font-black sans uppercase tracking-[0.2em] text-xs text-white shadow-xl transition-all flex items-center justify-center gap-3 ${role === 'mom' ? 'bg-brand-primary shadow-brand-primary/20' : 'bg-brand-accent shadow-brand-accent/20'}`}
                  >
                    <Check size={18} strokeWidth={3} /> Submit Answer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
