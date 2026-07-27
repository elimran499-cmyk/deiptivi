import React from 'react';
import { 
  LayoutGrid, 
  Radio, 
  BookmarkCheck, 
  Film, 
  Monitor, 
  Upload, 
  SlidersHorizontal,
  Zap,
  Globe2,
  Tv,
  CheckCircle2
} from 'lucide-react';
import { UserSubscription } from '../types';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  subscribedCount: number;
  totalChannelsCount: number;
  subscription: UserSubscription;
  onOpenM3uImport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  subscribedCount,
  totalChannelsCount,
  subscription,
  onOpenM3uImport
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, count: null },
    { id: 'channels', label: 'Live tv-zenders', icon: Radio, count: totalChannelsCount },
    { id: 'subscription', label: 'Mijn zenders', icon: BookmarkCheck, count: subscribedCount, badge: 'Actief' },
    { id: 'movies', label: 'Films & series', icon: Film, count: '4K' },
    { id: 'multiview', label: 'Multiview', icon: Monitor, badge: 'Nieuw' },
  ];

  return (
    <aside className="w-16 md:w-64 border-r border-white/10 flex flex-col justify-between shrink-0 select-none py-4 px-2 md:px-3 min-h-[calc(100vh-61px)]">
      <div className="space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          <div className="hidden md:block px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Navigatie
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
                title={item.label}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'
                  }`} />
                  <span className="hidden md:inline truncate">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`hidden md:inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className={`hidden md:inline-block px-1.5 py-0.2 rounded text-[9px] uppercase font-extrabold tracking-wider ${
                    item.badge === 'Nieuw'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Tools */}
        <div className="space-y-1 pt-4 border-t border-slate-800/80">
          <div className="hidden md:block px-3 pb-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            Afspeellijst
          </div>
          <button
            onClick={onOpenM3uImport}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-400 hover:text-indigo-300 hover:bg-indigo-950/30 border border-transparent hover:border-indigo-800/50 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">M3U-link importeren</span>
          </button>
        </div>
      </div>

      {/* Subscription Status Card */}
      <div className="hidden md:block mt-auto pt-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 space-y-3 relative overflow-hidden shadow-inner">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-bold text-slate-200">{subscription.planName}</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="space-y-1 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Actieve streams:</span>
              <span className="font-semibold text-slate-200">{subscription.activeConnections} van {subscription.maxConnections}</span>
            </div>
            <div className="flex justify-between">
              <span>Zenders in lijst:</span>
              <span className="font-semibold text-cyan-400">{subscribedCount} zenders</span>
            </div>
            <div className="flex justify-between">
              <span>Verlengt op:</span>
              <span className="font-semibold text-slate-300">{subscription.expiryDate}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('subscription')}
            className="w-full py-1.5 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Abonnement beheren
          </button>
        </div>
      </div>
    </aside>
  );
};
