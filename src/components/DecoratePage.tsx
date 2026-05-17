import React, { useRef } from "react";
import { motion } from "motion/react";
import { LayoutGrid, Palette, Flower, TreeDeciduous, Star, Cloud, Sun, ShoppingBag, Trash2, ChevronLeft, Plus, Check, PenLine } from "lucide-react";
import { AppState, DecorationItem } from "../types";

interface DecoratePageProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const SAMPLE_ITEMS: DecorationItem[] = [
  { id: 'item-1', name: '꿈틀이 침대', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3034/3034873.png', type: 'background_item' },
  { id: 'item-2', name: '별나라 모빌', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3081/3081977.png', type: 'character_accessory' },
  { id: 'item-3', name: '초록 화분', imageUrl: 'https://cdn-icons-png.flaticon.com/512/628/628283.png', type: 'background_item' },
  { id: 'item-4', name: '구름 창문', imageUrl: 'https://cdn-icons-png.flaticon.com/512/1000/1000803.png', type: 'background_item' },
  { id: 'item-5', name: '푹신한 카페트', imageUrl: 'https://cdn-icons-png.flaticon.com/512/2855/2855214.png', type: 'background_item' },
  { id: 'item-6', name: '나무 장난감', imageUrl: 'https://cdn-icons-png.flaticon.com/512/3082/3082015.png', type: 'background_item' },
];

export default function DecoratePage({ state, setState }: DecoratePageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddItem = (item: DecorationItem) => {
    const newItem = {
      ...item,
      instanceId: `placed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: { x: 50, y: 50 } // Default center in %
    } as any;

    setState(prev => ({
      ...prev,
      placedDecorations: [...prev.placedDecorations, newItem]
    }));
  };

  const updatePosition = (instanceId: string, x: number, y: number) => {
    setState(prev => ({
      ...prev,
      placedDecorations: prev.placedDecorations.map(d => 
        (d as any).instanceId === instanceId ? { ...d, position: { x, y } } : d
      )
    }));
  };

  const removeItem = (instanceId: string) => {
    setState(prev => ({
      ...prev,
      placedDecorations: prev.placedDecorations.filter(d => (d as any).instanceId !== instanceId)
    }));
  };

  return (
    <div className="h-full flex flex-col bg-[#A8D15A] overflow-hidden relative">
      {/* Top Header UI - Game Style */}
      <div className="absolute top-6 left-6 z-50 flex gap-3">
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-b-4 border-gray-200 active:border-b-0 active:translate-y-1 transition-all">
          <ChevronLeft className="text-[#3BB4C1]" size={28} />
        </button>
      </div>

      <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <div className="bg-white rounded-full pl-3 pr-6 py-1.5 flex items-center gap-2 shadow-lg border-b-4 border-gray-200">
          <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center text-white text-[10px] shadow-sm font-black">G</div>
          <span className="text-sm font-black text-gray-700">11,010</span>
          <Plus className="text-yellow-400" size={14} />
        </div>
        <div className="relative">
          <div className="bg-white rounded-full p-2.5 shadow-lg border-b-4 border-gray-200">
            <Check className="text-yellow-600" size={20} />
          </div>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">5</span>
        </div>
      </div>

      {/* Main Room Area (Isometric View) */}
      <div 
        ref={containerRef}
        className="relative flex-1 flex flex-col items-center justify-center p-4 pt-20 overflow-hidden"
      >
        {/* Isometric Room Construction */}
        <div className="relative w-[85%] aspect-[4/5] -mt-10">
          {/* Floor */}
          <div className="absolute inset-0 bg-[#D97E52] border-4 border-white shadow-2xl skew-y-[15deg] transform origin-bottom-right rotate-[15deg] scale-y-[1.2]"></div>
          
          {/* Left Wall */}
          <div className="absolute top-[-100px] left-[-40px] w-full h-full bg-[#FFD1E0] skew-y-[15deg] border-l-4 border-white">
             {/* Window */}
             <div className="absolute top-20 left-10 w-24 h-16 bg-[#6CB4EE] border-4 border-white flex shadow-inner">
                <div className="flex-1 border-r-2 border-white"></div>
                <div className="absolute inset-x-0 top-1/2 h-1 bg-white"></div>
             </div>
          </div>

          {/* Right Wall */}
          <div className="absolute top-[-100px] right-[-40px] w-full h-full bg-[#FFB5CC] -skew-y-[15deg] border-r-4 border-white"></div>
        </div>

        {/* Placing Container Layer */}
        <div className="absolute inset-x-0 top-24 bottom-24 z-20">
          {/* Placed Items */}
          {state.placedDecorations.map((item: any) => (
            <motion.div
              key={item.instanceId}
              drag
              dragConstraints={containerRef}
              dragElastic={0}
              onDragStart={(e) => e.stopPropagation()}
              onDragEnd={(_, info) => {
                if (containerRef.current) {
                  const rect = containerRef.current.getBoundingClientRect();
                  const x = ((info.point.x - rect.left) / rect.width) * 100;
                  const y = ((info.point.y - rect.top) / rect.height) * 100;
                  updatePosition(item.instanceId, x, y);
                }
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                position: 'absolute',
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                transform: 'translate(-50%, -50%)',
                width: item.id === 'item-5' ? '140px' : item.type === 'character_accessory' ? '60px' : '90px',
                height: item.id === 'item-5' ? '80px' : item.type === 'character_accessory' ? '60px' : '90px',
                zIndex: item.type === 'character_accessory' ? 100 : 50,
                cursor: 'grab'
              }}
              className="group"
            >
              <img 
                src={item.imageUrl} 
                className="w-full h-full object-contain drop-shadow-md pointer-events-none" 
                alt={item.name} 
                referrerPolicy="no-referrer" 
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(item.instanceId);
                }}
                className="absolute -top-6 -right-6 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}

          {/* Character */}
          <motion.div 
            drag
            dragConstraints={containerRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-grab active:cursor-grabbing"
          >
            <div className="relative">
              <div className="w-44 h-44 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl relative ring-8 ring-white/30 border-4 border-white/50">
                {state.fetus.characterImageUrl ? (
                  <img src={state.fetus.characterImageUrl} className="w-36 h-36 object-contain" alt="preview" />
                ) : (
                  <Palette size={64} className="text-white opacity-20" />
                )}
              </div>
              
              {/* Task Indicator Bubble */}
              <div className="absolute -top-12 -right-4 bg-white rounded-2xl p-3 shadow-xl border-2 border-yellow-400 animate-bounce">
                <PenLine className="text-red-500" size={24} />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[8px] border-t-yellow-400"></div>
              </div>

              {/* Thought Bubble */}
              <div className="absolute -top-24 -left-16 w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                 <div className="flex gap-0.5">
                    <div className="w-4 h-4 bg-orange-400 rounded-sm"></div>
                    <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                 </div>
                 <div className="absolute -bottom-4 right-4 w-4 h-4 bg-white/80 rounded-full"></div>
                 <div className="absolute -bottom-7 right-6 w-2 h-2 bg-white/80 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Menu - Game Style */}
      <div className="absolute bottom-24 right-6 z-50">
        <button className="bg-yellow-400 text-gray-800 px-10 py-5 rounded-[24px] font-black shadow-xl border-b-[6px] border-yellow-600 active:border-b-0 active:translate-y-1 transition-all flex items-center gap-3">
          메뉴
          <span className="w-5 h-5 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center border-2 border-white font-black">N</span>
        </button>
      </div>

      {/* Item Store/Inventory Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white/90 backdrop-blur-3xl rounded-t-[48px] shadow-[0_-20px_60px_rgba(0,0,0,0.1)] h-[350px] transform translate-y-[260px] hover:translate-y-0 transition-transform duration-500 border-t-4 border-brand-primary group">
          <div className="w-16 h-1.5 bg-brand-primary/20 rounded-full mx-auto mt-4 mb-2"></div>
          <div className="text-center mb-4">
             <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest animate-pulse">Shop Window</span>
          </div>
          
          <div className="px-10 h-full overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif italic font-bold text-brand-text">가구 마켓</h3>
              <div className="bg-white px-5 py-2 rounded-full border border-brand-text/5 flex items-center gap-3 shadow-sm ring-1 ring-brand-text/5">
                <Star size={18} className="text-brand-primary fill-brand-primary" />
                <span className="text-sm font-black text-brand-text">1,200</span>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto no-scrollbar pb-10">
              <div className="flex gap-6 w-max">
                {SAMPLE_ITEMS.map((item) => (
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    key={item.id}
                    onClick={() => handleAddItem(item)}
                    className="w-32 h-40 card-soft p-4 flex flex-col items-center justify-center gap-3 border border-transparent hover:border-brand-primary/20 hover:bg-white transition-all group shadow-sm bg-white/40"
                  >
                    <div className="w-20 h-20 bg-brand-bg rounded-[24px] flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
                      <img src={item.imageUrl} className="w-14 h-14 object-contain" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] font-bold text-brand-text">{item.name}</p>
                      <p className="text-[9px] font-black text-brand-primary uppercase mt-1">Get Item</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
