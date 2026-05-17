import React from "react";
import { motion } from "motion/react";
import { X, Camera, Mic, Play, ChevronRight, User, Heart, Settings, Shield, HelpCircle, LogOut, Video } from "lucide-react";
import { AppState } from "../types";

interface MorePageProps {
  state: AppState;
  onClose: () => void;
}

export default function MorePage({ state, onClose }: MorePageProps) {
  const ultrasoundPhotos = state.diaryEntries.filter(e => e.imageUrl).map(e => e.imageUrl);

  return (
    <div className="fixed inset-0 bg-brand-bg z-50 overflow-y-auto no-scrollbar flex flex-col pt-4">
      {/* Header */}
      <div className="p-8 flex justify-between items-center bg-white/40 backdrop-blur-md sticky top-0 z-10 border-b border-white/60">
        <h2 className="text-3xl font-serif italic font-bold text-brand-text">더보기</h2>
        <button onClick={onClose} className="w-12 h-12 bg-white/60 rounded-[20px] text-brand-text/30 hover:bg-white transition-colors flex items-center justify-center shadow-sm">
          <X size={24} />
        </button>
      </div>

      <div className="px-8 py-10 space-y-12 pb-24">
        {/* User Profile Info */}
        <div className="card-soft p-10 flex items-center gap-6 shadow-sm border border-white">
          <div className="w-24 h-24 bg-brand-bg rounded-[28px] flex items-center justify-center text-brand-primary shadow-inner ring-1 ring-brand-text/5">
            <User size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-serif italic font-bold text-brand-text leading-tight">{state.user.name} 엄마</h3>
            <p className="text-[10px] sans font-black text-brand-primary mt-2 uppercase tracking-[0.2em]">{state.fetus.nickname}의 가족</p>
          </div>
        </div>

        {/* Ultrasound Gallery */}
        <section>
          <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="text-xl font-serif italic font-bold text-brand-text flex items-center gap-3">
              <Camera size={24} className="text-brand-primary" />
              첫 만남의 기록
            </h3>
            <button className="text-[10px] sans font-black text-brand-text/30 uppercase tracking-widest border-b border-brand-text/10">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {ultrasoundPhotos.length > 0 ? ultrasoundPhotos.slice(0, 4).map((url, i) => (
              <motion.div 
                key={i}
                whileTap={{ scale: 0.98 }}
                className="aspect-square bg-white rounded-[32px] overflow-hidden shadow-sm border-4 border-white"
              >
                <img src={url!} className="w-full h-full object-cover" alt="ultrasound" />
              </motion.div>
            )) : (
              <div className="col-span-2 card-soft p-12 text-center border-dashed border-brand-primary/20 flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-brand-primary/5 rounded-full flex items-center justify-center text-brand-primary/30">
                  <Camera size={32} />
                </div>
                <p className="text-sm font-medium text-brand-text/40 leading-relaxed">아직 등록된 사진이 없어요.<br/>일기에 초음파 사진을 남겨보세요!</p>
              </div>
            )}
          </div>
        </section>

        {/* AI Growth Video Simulation */}
        <section>
          <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="text-xl font-serif italic font-bold text-brand-text flex items-center gap-3">
              <Video size={24} className="text-brand-primary" />
              {state.fetus.nickname}의 메시지
            </h3>
          </div>

          <div className="relative aspect-video bg-brand-text rounded-[48px] overflow-hidden shadow-2xl group cursor-pointer border-8 border-white">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-brand-primary/20 rounded-full animate-ping absolute inset-0"></div>
                <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center text-white relative z-10 shadow-lg shadow-black/40 transition-transform group-hover:scale-110">
                  <Play fill="white" size={36} className="ml-1" />
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-10 right-10 z-20 space-y-3">
              <div className="flex items-center gap-2">
                <Mic size={14} className="text-brand-primary" />
                <span className="text-[10px] sans font-black text-brand-primary uppercase tracking-[0.2em]">Soul AI Message</span>
              </div>
              <p className="text-white font-serif italic text-xl leading-snug">"엄마, 저 지금 꿈에서 엄마랑 손 잡고 걷고 있어요..."</p>
            </div>

            <div className="absolute inset-0 bg-brand-primary/5 backdrop-blur-[1px]"></div>
          </div>
          <p className="mt-6 text-center text-[11px] sans font-bold text-brand-text/30 px-8 leading-relaxed uppercase tracking-widest">
            AI Voice Generated Connection
          </p>
        </section>

        {/* Settings Menu */}
        <div className="card-soft overflow-hidden shadow-sm border border-white">
          <MenuButton icon={<Settings size={18}/>} label="내 계정 정보" />
          <MenuButton icon={<Shield size={18}/>} label="보안 및 개인정보" />
          <MenuButton icon={<HelpCircle size={18}/>} label="자주 묻는 질문" />
          <MenuButton icon={<LogOut size={18}/>} label="로그아웃" isRed />
        </div>
      </div>
    </div>
  );
}

function MenuButton({ icon, label, isRed }: { icon: React.ReactNode, label: string, isRed?: boolean }) {
  return (
    <button className={`w-full flex items-center justify-between p-7 hover:bg-white/40 transition-all border-b border-white last:border-0 ${isRed ? 'text-brand-primary' : 'text-brand-text'}`}>
      <div className="flex items-center gap-5">
        <div className={`p-2.5 rounded-xl ${isRed ? 'bg-brand-primary/10' : 'bg-brand-bg shadow-inner'}`}>
          {icon}
        </div>
        <span className="text-base font-bold">{label}</span>
      </div>
      <ChevronRight size={20} className="text-brand-text/20" />
    </button>
  );
}
