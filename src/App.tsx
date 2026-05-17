import React, { useState, useEffect } from "react";
import { User, Baby, Heart, Home, Settings, Bell, PenLine, HelpCircle, LayoutGrid, Users, Plus, ChevronLeft, ChevronRight, Thermometer, MessageCircle, Camera, Check, MoreVertical } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AppState, DiaryEntry, SharedQuestion, Notification } from "./types";
import { INITIAL_QUESTIONS, THEME } from "./constants";
import Onboarding from "./components/Onboarding";
import HomePage from "./components/HomePage";
import DiaryPage from "./components/DiaryPage";
import QuestionPage from "./components/QuestionPage";
import DecoratePage from "./components/DecoratePage";
import FriendPage from "./components/FriendPage";
import MorePage from "./components/MorePage";
import NotificationPage from "./components/NotificationPage";

const INITIAL_STATE: AppState = {
  onboarded: false,
  user: { name: "", partnerName: "" },
  fetus: { dream: "", nickname: "", week: 1, gender: "unknown" },
  diaryEntries: [],
  sharedQuestions: INITIAL_QUESTIONS.map((q, i) => ({ id: `q-${i}`, question: q })),
  happinessIndex: 50,
  ownedDecorations: [],
  placedDecorations: [],
  notifications: [
    { id: "n-1", type: "walking", message: "엄마 오늘 5,000걸음 걸으셨네요! 대단해요!", timestamp: new Date().toISOString() },
    { id: "n-2", type: "growth", message: "곧 태동이 시작될 거예요!", timestamp: new Date().toISOString() }
  ]
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem("kkumteul_state");
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [activeTab, setActiveTab] = useState("home");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    localStorage.setItem("kkumteul_state", JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  if (!state.onboarded) {
    return <Onboarding onComplete={(user, fetus) => updateState({ onboarded: true, user, fetus })} />;
  }

  const renderTab = () => {
    if (showNotifications) return <NotificationPage notifications={state.notifications} onClose={() => setShowNotifications(false)} />;
    if (showMore) return <MorePage state={state} onClose={() => setShowMore(false)} />;

    switch (activeTab) {
      case "diary": return <DiaryPage state={state} setState={setState} />;
      case "question": return <QuestionPage state={state} setState={setState} />;
      case "decorate": return <DecoratePage state={state} setState={setState} />;
      case "friends": return <FriendPage state={state} setState={setState} />;
      default: return <HomePage state={state} setState={setState} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-brand-bg relative overflow-hidden font-sans border-x border-brand-text/5">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white/40 backdrop-blur-md z-20 sticky top-0 border-b border-white/60">
        <div className="flex flex-col">
          <h1 className="text-2xl font-serif italic font-semibold text-brand-text tracking-tight">꿈틀 <span className="text-sm font-light opacity-50 ml-1 italic">Ggum-teul</span></h1>
          {activeTab === "home" && (
            <div className="text-[10px] font-bold text-brand-text/60 bg-brand-primary/10 px-3 py-1 rounded-full mt-1 inline-block w-fit">
              🥔 {state.fetus.nickname}과 {state.user.name}엄마 {state.fetus.week}주차째
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowNotifications(true)}
            className="w-10 h-10 rounded-full border border-brand-text/10 flex items-center justify-center bg-white shadow-sm hover:bg-brand-bg transition-colors relative"
            id="notif-btn"
          >
            <Bell size={18} className="text-brand-text/70" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-primary rounded-full border-2 border-white"></span>
          </button>
          <button 
            onClick={() => setShowMore(true)}
            className="w-10 h-10 rounded-full border border-brand-text/10 flex items-center justify-center bg-white shadow-sm hover:bg-brand-bg transition-colors"
            id="more-btn"
          >
            <MoreVertical size={18} className="text-brand-text/70" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (showNotifications ? "-notif" : "") + (showMore ? "-more" : "")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/60 backdrop-blur-xl border-t border-white px-4 py-2 flex justify-around items-center z-30 shadow-[0_-10px_30px_rgba(74,63,53,0.05)] rounded-t-[32px]">
        <NavButton active={activeTab === "diary"} onClick={() => {setActiveTab("diary"); setShowNotifications(false); setShowMore(false);}} icon={<PenLine size={20} />} label="Diary" />
        <NavButton active={activeTab === "question"} onClick={() => {setActiveTab("question"); setShowNotifications(false); setShowMore(false);}} icon={<HelpCircle size={20} />} label="Ask" />
        <NavButton active={activeTab === "home"} onClick={() => {setActiveTab("home"); setShowNotifications(false); setShowMore(false);}} icon={<Home size={22} />} label="Home" isCenter />
        <NavButton active={activeTab === "decorate"} onClick={() => {setActiveTab("decorate"); setShowNotifications(false); setShowMore(false);}} icon={<LayoutGrid size={20} />} label="Decor" />
        <NavButton active={activeTab === "friends"} onClick={() => {setActiveTab("friends"); setShowNotifications(false); setShowMore(false);}} icon={<Users size={20} />} label="Friends" />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label, isCenter }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, isCenter?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all group py-1`}
    >
      <div className={`p-3 rounded-[20px] transition-all duration-300 ${
        isCenter 
          ? active ? "bg-brand-text text-white shadow-lg scale-110" : "bg-white text-brand-text shadow-md ring-1 ring-brand-text/5" 
          : active ? "bg-brand-primary text-white shadow-sm" : "hover:bg-brand-primary/10 text-brand-text/40"
      }`}>
        {icon}
      </div>
      <span className={`text-[9px] font-black tracking-widest uppercase ${active ? "text-brand-primary" : "text-brand-text/30"}`}>{label}</span>
    </button>
  );
}
