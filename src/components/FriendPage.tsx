import React from "react";
import { motion } from "motion/react";
import { Users, Search, Flower2, Heart, MessageCircle, ChevronRight, User } from "lucide-react";
import { AppState } from "../types";

interface FriendPageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const MOCK_FRIENDS = [
  { id: 'f-1', name: '사랑엄마', nickname: '행복이', characterColor: 'bg-rose-100' },
  { id: 'f-2', name: '토리맘', nickname: '도토리', characterColor: 'bg-amber-100' },
  { id: 'f-3', name: '현아엄마', nickname: '축복이', characterColor: 'bg-blue-100' },
];

export default function FriendPage({ state, setState }: FriendPageProps) {
  return (
    <div className="h-full flex flex-col bg-brand-bg">
      <div className="p-8">
        <h2 className="text-3xl font-serif italic font-bold text-brand-text">산모 커뮤니티</h2>
        <p className="text-xs sans font-bold text-brand-text/30 mt-2 uppercase tracking-[0.15em]">Ggum-teul Community</p>

        <div className="mt-8 relative">
          <input 
            type="text"
            placeholder="친구 태명이나 이름 검색"
            className="w-full bg-white/60 px-14 py-5 rounded-[32px] shadow-sm border border-white focus:ring-4 focus:ring-brand-primary/10 outline-none text-sm transition-all font-medium text-brand-text"
          />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-text/20" size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 space-y-6 pb-16 no-scrollbar">
        <div className="flex justify-between items-center px-2 mb-2">
          <h3 className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em]">Neighborhood</h3>
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">View All</span>
        </div>

        {MOCK_FRIENDS.map((friend) => (
          <motion.div 
            key={friend.id}
            whileTap={{ scale: 0.98 }}
            className="card-soft p-5 flex items-center justify-between group cursor-pointer hover:bg-white transition-all shadow-sm border border-white"
          >
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 bg-brand-bg rounded-[24px] flex items-center justify-center text-brand-text/20 shadow-inner ring-1 ring-brand-text/5`}>
                <User size={32} />
              </div>
              <div>
                <p className="text-base font-bold text-brand-text">{friend.name}</p>
                <p className="text-[11px] sans font-black text-brand-primary uppercase tracking-widest">{friend.nickname}의 마루</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="w-12 h-12 bg-white rounded-2xl text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm border border-brand-text/5">
                <Flower2 size={20} />
              </button>
              <button className="w-12 h-12 bg-white rounded-2xl text-brand-text/20 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all shadow-sm border border-brand-text/5">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Community Suggestion */}
        <div className="bg-gradient-to-br from-[#E0F0E0]/30 to-brand-bg p-10 rounded-[48px] mt-8 text-center space-y-6 border border-white shadow-sm ring-1 ring-brand-accent/10">
          <div className="w-20 h-20 bg-white rounded-[32px] mx-auto flex items-center justify-center text-brand-accent shadow-xl">
            <Heart size={40} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-serif italic font-bold text-brand-text">오늘의 응원 릴레이</h4>
            <p className="text-xs sans font-bold text-brand-accent/60 leading-relaxed uppercase tracking-widest">Share the happiness</p>
          </div>
          <p className="text-sm font-medium text-brand-text/70 leading-relaxed">지금 도토리맘님 마루에 꽃을 심으면<br/>행복지수가 5% 상승해요!</p>
          <button className="w-full bg-brand-accent text-white py-5 rounded-[24px] font-black sans text-xs uppercase tracking-[0.2em] shadow-xl shadow-brand-accent/20 transition-all hover:scale-105 active:scale-95">
            지금 놀러가기
          </button>
        </div>
      </div>
    </div>
  );
}
