import { motion, AnimatePresence } from "motion/react";
import { X, Bell, Footprints, PenLine, HelpCircle, Sparkles, ChevronRight, Clock } from "lucide-react";
import { Notification } from "../types";

interface NotificationPageProps {
  notifications: Notification[];
  onClose: () => void;
}

export default function NotificationPage({ notifications, onClose }: NotificationPageProps) {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'walking': return <Footprints className="text-brand-accent" />;
      case 'diary': return <PenLine className="text-brand-primary" />;
      case 'question': return <HelpCircle className="text-brand-secondary" />;
      case 'growth': return <Sparkles className="text-brand-accent" />;
      default: return <Bell className="text-brand-text/40" />;
    }
  };

  const getBg = (type: Notification['type']) => {
    switch (type) {
      case 'walking': return 'bg-brand-accent/10';
      case 'diary': return 'bg-brand-primary/10';
      case 'question': return 'bg-brand-secondary/10';
      case 'growth': return 'bg-brand-accent/10';
      default: return 'bg-brand-bg';
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-bg z-50 flex flex-col pt-4">
      {/* Header */}
      <div className="p-8 flex justify-between items-center bg-white/40 backdrop-blur-md sticky top-0 z-10 border-b border-white/60">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-[20px] text-brand-primary flex items-center justify-center shadow-sm">
            <Bell size={24} />
          </div>
          <h2 className="text-2xl font-serif italic font-bold text-brand-text">알림톡</h2>
        </div>
        <button onClick={onClose} className="w-12 h-12 bg-white/60 rounded-[20px] text-brand-text/30 hover:bg-white transition-colors flex items-center justify-center shadow-sm">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6 no-scrollbar pb-16">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-[10px] font-black text-brand-text/30 uppercase tracking-[0.3em]">Today's News</h3>
          <button className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Mark All Read</button>
        </div>

        <AnimatePresence>
          {notifications.map((n, idx) => (
            <motion.div 
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="card-soft p-6 flex gap-6 group cursor-pointer hover:bg-white shadow-sm border border-white"
            >
              <div className={`w-16 h-16 shrink-0 rounded-[24px] flex items-center justify-center ${getBg(n.type)} transition-all group-hover:scale-110 shadow-inner`}>
                {getIcon(n.type)}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] sans font-black text-brand-text/20 uppercase tracking-[0.2em]">
                    {n.type === 'walking' ? 'Wellness' : n.type.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-brand-text/20">
                    <Clock size={10} />
                    <span className="text-[10px] font-bold">NOW</span>
                  </div>
                </div>
                <p className="text-base font-bold text-brand-text leading-tight">{n.message}</p>
                <div className="flex items-center gap-1 text-brand-primary pt-1 group-hover:translate-x-2 transition-transform">
                  <span className="text-[10px] font-black uppercase tracking-widest">Check Now</span>
                  <ChevronRight size={12} strokeWidth={3} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty state simulation */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
            <Bell size={64} className="text-slate-200" />
            <p className="text-sm text-slate-400 font-medium">새로운 알림이 없어요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
