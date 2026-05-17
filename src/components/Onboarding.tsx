import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Baby, Sparkles, Heart, ChevronRight, Wand2, Loader2 } from "lucide-react";
import { UserInfo, FetusInfo } from "../types";
import { geminiService } from "../services/geminiService";

interface OnboardingProps {
  onComplete: (user: UserInfo, fetus: FetusInfo) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserInfo>({ name: "", partnerName: "" });
  const [fetus, setFetus] = useState<FetusInfo>({
    dream: "",
    nickname: "",
    week: 1,
    gender: "unknown",
  });

  const nextStep = () => setStep(prev => prev + 1);

  const handleSubmit = async () => {
    setLoading(true);
    // Generate AI content
    const aiContent = await geminiService.generateCharacterAndBackground(fetus.nickname, fetus.dream);
    
    if (aiContent) {
      const charUrl = await geminiService.generateImageUrl(aiContent.characterImagePrompt, fetus.week);
      const bgUrl = await geminiService.generateImageUrl(aiContent.backgroundImagePrompt, fetus.week);

      onComplete(user, {
        ...fetus,
        characterDescription: aiContent.characterDescription,
        backgroundDescription: aiContent.backgroundDescription,
        characterImageUrl: charUrl,
        backgroundImageUrl: bgUrl
      });
    } else {
      // Fallback
      onComplete(user, fetus);
    }
  };

  return (
    <div className="h-full flex flex-col bg-brand-bg px-10 py-16 items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8A9A5B 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-10 w-full z-10"
          >
            <div className="w-28 h-28 bg-brand-primary/10 rounded-[40px] flex items-center justify-center text-brand-primary shadow-xl ring-8 ring-white/50">
              <User size={56} />
            </div>
            <div className="space-y-6 w-full">
              <h2 className="text-3xl font-serif italic font-bold text-brand-text leading-tight tracking-tight">반가워요!<br/>엄마의 성함을 알려주세요</h2>
              <div className="space-y-4">
                <input 
                  type="text"
                  placeholder="엄마 이름 Mom"
                  className="w-full p-6 h-16 rounded-[24px] border border-white bg-white/60 shadow-inner focus:ring-4 focus:ring-brand-primary/10 outline-none text-center text-xl font-bold text-brand-text placeholder:text-brand-text/20 transition-all"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <input 
                  type="text"
                  placeholder="아빠 이름 Dad"
                  className="w-full p-6 h-16 rounded-[24px] border border-white bg-white/60 shadow-inner focus:ring-4 focus:ring-brand-primary/10 outline-none text-center text-xl font-bold text-brand-text placeholder:text-brand-text/20 transition-all mt-2"
                  value={user.partnerName}
                  onChange={(e) => setUser({ ...user, partnerName: e.target.value })}
                />
              </div>
            </div>
            <button 
              disabled={!user.name || !user.partnerName}
              onClick={nextStep}
              className="w-full bg-brand-primary text-white py-6 rounded-[24px] font-black sans uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl shadow-brand-primary/20 transition-all hover:scale-105"
            >
              Next Step <ChevronRight size={20} strokeWidth={3} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center gap-8 w-full z-10"
          >
            <div className="w-28 h-28 bg-brand-secondary/20 rounded-[40px] flex items-center justify-center text-brand-primary shadow-xl ring-8 ring-white/50">
              <Baby size={56} />
            </div>
            <div className="space-y-5 w-full">
              <h2 className="text-3xl font-serif italic font-bold text-brand-text leading-tight tracking-tight">아이와의 소중한 공간<br/>태아 정보를 알려주세요</h2>
              <div className="space-y-3">
                <input 
                  type="text"
                  placeholder="태명 (예: 감자, 샛별)"
                  className="w-full p-5 rounded-[24px] border border-white bg-white/60 shadow-inner focus:ring-4 focus:ring-brand-primary/10 outline-none text-center font-bold text-brand-text"
                  value={fetus.nickname}
                  onChange={(e) => setFetus({ ...fetus, nickname: e.target.value })}
                />
                <textarea 
                  placeholder="태몽을 들려주세요 (캐릭터 생성의 모티브가 됩니다)"
                  className="w-full p-6 rounded-[24px] border border-white bg-white/60 shadow-inner focus:ring-4 focus:ring-brand-primary/10 outline-none min-h-[120px] text-center font-medium text-brand-text"
                  value={fetus.dream}
                  onChange={(e) => setFetus({ ...fetus, dream: e.target.value })}
                />
                <div className="flex gap-3 w-full">
                  <div className="w-1/2 relative">
                    <input 
                      type="number"
                      placeholder="현재 주차"
                      className="w-full p-5 rounded-[24px] border border-white bg-white/60 shadow-inner focus:ring-4 focus:ring-brand-primary/10 outline-none text-center font-bold text-brand-text"
                      value={fetus.week || ""}
                      onChange={(e) => setFetus({ ...fetus, week: parseInt(e.target.value) })}
                    />
                  </div>
                  <select 
                    className="w-1/2 p-5 rounded-[24px] border border-white bg-white/60 shadow-inner focus:ring-4 focus:ring-brand-primary/10 outline-none text-center appearance-none font-bold text-brand-text text-sm"
                    value={fetus.gender}
                    onChange={(e) => setFetus({ ...fetus, gender: e.target.value as any })}
                  >
                    <option value="unknown">성별을 몰라요</option>
                    <option value="male">멋진 왕자님</option>
                    <option value="female">예쁜 공주님</option>
                  </select>
                </div>
              </div>
            </div>
            <button 
              disabled={!fetus.nickname || !fetus.dream || loading}
              onClick={handleSubmit}
              className="w-full bg-brand-text text-white py-6 rounded-[24px] font-black sans flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin text-brand-primary" size={24} />
                  Creating Universe...
                </>
              ) : (
                <>
                  <Wand2 size={22} className="text-brand-primary" />
                  Enter Ggum-teul
                </>
              )}
            </button>
            {loading && (
              <p className="text-[11px] sans font-black text-brand-text/30 uppercase tracking-[0.25em] animate-pulse">
                AI is crafting your unique character...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
