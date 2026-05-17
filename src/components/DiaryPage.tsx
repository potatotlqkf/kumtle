import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, Camera, Send, Plus, X, Loader2, Sparkles } from "lucide-react";
import { AppState, DiaryEntry } from "../types";
import { geminiService } from "../services/geminiService";

interface DiaryPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

export default function DiaryPage({ state, setState }: DiaryPageProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    const babyComment = await geminiService.getBabyCommentForDiary(content, state.fetus.nickname);

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      imageUrl: image || undefined,
      babyComment
    };

    setState(prev => ({
      ...prev,
      diaryEntries: [newEntry, ...prev.diaryEntries],
      happinessIndex: Math.min(100, prev.happinessIndex + 10)
    }));

    setContent("");
    setImage(null);
    setIsWriting(false);
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col bg-brand-bg">
      <div className="p-8">
        <h2 className="text-3xl font-serif italic font-bold text-brand-text flex items-center gap-3">
          우리의 기록
          <span className="text-xs sans font-bold text-brand-text/30 bg-brand-text/5 px-3 py-1 rounded-full uppercase tracking-widest">{state.diaryEntries.length} entries</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto px-8 space-y-10 pb-12 no-scrollbar">
        <AnimatePresence>
          {state.diaryEntries.map((entry, idx) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-10 border-l border-brand-text/10"
            >
              <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-brand-primary rounded-full ring-4 ring-white shadow-sm"></div>
              
              <div className="card-soft p-6 space-y-4 shadow-sm">
                <span className="text-[10px] sans font-black text-brand-primary uppercase tracking-[0.2em]">
                  {new Date(entry.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                
                {entry.imageUrl && (
                  <div className="rounded-[24px] overflow-hidden border border-white">
                    <img src={entry.imageUrl} className="w-full h-52 object-cover" alt="diary" referrerPolicy="no-referrer" />
                  </div>
                )}
                
                <p className="text-brand-text font-medium leading-relaxed whitespace-pre-wrap">{entry.content}</p>

                {entry.babyComment && (
                  <div className="bg-brand-primary/5 p-5 rounded-[24px] border border-white flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-brand-primary" />
                      <span className="text-[11px] sans font-black text-brand-primary uppercase tracking-widest">{state.fetus.nickname}의 한마디</span>
                    </div>
                    <p className="text-base font-child font-bold text-brand-primary italic leading-tight">"{entry.babyComment}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Action Button */}
      {!isWriting ? (
        <div className="fixed bottom-24 right-8">
          <button 
            onClick={() => setIsWriting(true)}
            className="w-14 h-14 bg-brand-text text-white rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <Plus size={28} />
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          className="fixed inset-x-0 bottom-0 max-w-md mx-auto bg-white rounded-t-[48px] shadow-[0_-20px_50px_rgba(74,63,53,0.1)] p-8 z-40 space-y-4 border-t border-white"
        >
          <div className="flex justify-between items-center mb-2 px-2">
            <h3 className="font-serif italic font-bold text-brand-text text-xl">오늘의 마음</h3>
            <button onClick={() => setIsWriting(false)} className="p-2 bg-brand-bg rounded-xl text-brand-text/30"><X size={20} /></button>
          </div>

          <div className="flex flex-col gap-4">
            <textarea 
              autoFocus
              placeholder="무슨 일이 있었나요? 행복한 마음을 기록해보세요."
              className="w-full p-6 h-48 rounded-[32px] bg-brand-bg/50 focus:ring-2 focus:ring-brand-primary/20 outline-none text-brand-text placeholder:text-brand-text/20 resize-none font-medium text-lg leading-relaxed border border-white shadow-inner"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {image && (
              <div className="relative w-24 h-24 ring-4 ring-white shadow-md rounded-2xl overflow-hidden">
                <img src={image} className="w-full h-full object-cover" alt="upload" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-brand-text/80 text-white p-1 rounded-full scale-75"
                ><X size={14} /></button>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-12 h-12 bg-white rounded-2xl text-brand-text/50 hover:bg-brand-primary/10 hover:text-brand-primary transition-all shadow-sm border border-brand-text/5"
                >
                  <ImageIcon size={22} className="mx-auto" />
                </button>
                <input type="file" hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                <button className="w-12 h-12 bg-white rounded-2xl text-brand-text/50 hover:bg-brand-primary/10 hover:text-brand-primary transition-all shadow-sm border border-brand-text/5">
                  <Camera size={22} className="mx-auto" />
                </button>
              </div>
              
              <button 
                disabled={!content.trim() || loading}
                onClick={handleSubmit}
                className="bg-brand-primary text-white h-12 px-8 rounded-2xl font-bold flex items-center gap-3 shadow-lg shadow-brand-primary/20 disabled:opacity-50 transition-all hover:scale-105"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span className="sans tracking-widest text-sm uppercase">Post</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
