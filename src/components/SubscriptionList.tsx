import React, { useState } from 'react';
import { 
  BookmarkCheck, 
  Search, 
  Radio, 
  Trash2, 
  Download, 
  Upload, 
  Plus, 
  Zap, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Layers,
  Check,
  Tv,
  Globe2,
  List
} from 'lucide-react';
import { Channel, UserSubscription } from '../types';
import { CATEGORIES } from '../data/mockData';
import { ChannelCard } from './ChannelCard';

interface SubscriptionListProps {
  subscribedChannels: Channel[];
  allChannels: Channel[];
  subscription: UserSubscription;
  onPlayChannel: (channel: Channel) => void;
  onToggleSubscribe: (channel: Channel, e: React.MouseEvent) => void;
  onOpenM3uImport: () => void;
  onAddPresetChannels: () => void;
}

export const SubscriptionList: React.FC<SubscriptionListProps> = ({
  subscribedChannels,
  allChannels,
  subscription,
  onPlayChannel,
  onToggleSubscribe,
  onOpenM3uImport,
  onAddPresetChannels
}) => {
  const [subSearchQuery, setSubSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [speedTestActive, setSpeedTestActive] = useState(false);
  const [testPing, setTestPing] = useState(subscription.pingMs);

  // Filter subscribed channels
  const filteredSubscribed = subscribedChannels.filter((ch) => {
    const matchesSearch = 
      ch.name.toLowerCase().includes(subSearchQuery.toLowerCase()) ||
      ch.category.toLowerCase().includes(subSearchQuery.toLowerCase()) ||
      ch.currentProgram.title.toLowerCase().includes(subSearchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || ch.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Extract unique categories from subscribed
  const categories: string[] = ['all', ...Array.from(new Set<string>(subscribedChannels.map(c => c.category)))];

  // Channel categories are stored under English ids; show the Dutch label instead.
  const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.name ?? id;

  // Handle Export M3U Playlist
  const handleExportM3U = () => {
    setIsExporting(true);
    let m3uContent = '#EXTM3U\n';
    subscribedChannels.forEach((ch) => {
      m3uContent += `#EXTINF:-1 tvg-id="${ch.id}" tvg-name="${ch.name}" tvg-logo="${ch.logo}" group-title="${ch.category}",${ch.name}\n`;
      m3uContent += `${ch.streamUrl}\n`;
    });

    const blob = new Blob([m3uContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deiptivi-subscription-${Date.now()}.m3u`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleRunSpeedTest = () => {
    setSpeedTestActive(true);
    setTimeout(() => {
      setTestPing(Math.floor(Math.random() * 10) + 10); // 10-20ms
      setSpeedTestActive(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner: Subscription Plan Status */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800/80 p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ABONNEMENT ACTIEF
              </span>
              <span className="text-xs text-slate-400 font-medium">Ref: #SP-998241</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight flex items-center gap-3">
              <BookmarkCheck className="w-7 h-7 text-cyan-400" />
              Mijn zenderlijst
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Je hebt <strong className="text-cyan-300 font-bold">{subscribedChannels.length} zenders</strong> in je persoonlijke IPTV-lijst. Kijk live in 4K of exporteer je eigen `.m3u`-bestand.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl space-y-0.5">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Actieve verbindingen</div>
              <div className="text-sm font-extrabold text-cyan-300">
                {subscription.activeConnections} / {subscription.maxConnections} schermen
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl space-y-0.5">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Serverlatentie</div>
              <div className="text-sm font-extrabold text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                {testPing} ms
              </div>
            </div>

            <button
              onClick={handleRunSpeedTest}
              disabled={speedTestActive}
              className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              title="Serversnelheid testen"
            >
              <RefreshCw className={`w-4 h-4 text-cyan-400 ${speedTestActive ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportM3U}
              disabled={isExporting || subscribedChannels.length === 0}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-slate-100 font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exporteren...' : 'M3U-afspeellijst exporteren (.m3u)'}
            </button>

            <button
              onClick={onOpenM3uImport}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-indigo-400" />
              Eigen M3U importeren
            </button>
          </div>

          <button
            onClick={onAddPresetChannels}
            className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-cyan-400 hover:text-cyan-300 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Alle beschikbare zenders toevoegen ({allChannels.length})
          </button>
        </div>
      </div>

      {/* Subscription Channels Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 shadow-md">
        {/* Search input specifically for subscribed channels */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={subSearchQuery}
            onChange={(e) => setSubSearchQuery(e.target.value)}
            placeholder="Zoek binnen mijn zenders..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          {subSearchQuery && (
            <button
              onClick={() => setSubSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 text-xs"
            >
              Wissen
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-850'
              }`}
            >
              {cat === 'all' ? `Alles opgeslagen (${subscribedChannels.length})` : categoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Subscribed Channels */}
      {filteredSubscribed.length === 0 ? (
        <div className="text-center py-16 bg-slate-950/60 rounded-3xl border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
            <Radio className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-extrabold text-base text-slate-200">
              {subscribedChannels.length === 0
                ? 'Je zenderlijst is nog leeg'
                : 'Geen zenders gevonden met dit filter'}
            </h3>
            <p className="text-xs text-slate-400">
              {subscribedChannels.length === 0
                ? 'Voeg zenders toe vanuit het zenderoverzicht of importeer een M3U-afspeellijst.'
                : `Geen zenders gevonden voor "${subSearchQuery}".`}
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onAddPresetChannels}
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              VIP-zenderpakket toevoegen
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSubscribed.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onPlay={onPlayChannel}
              onToggleSubscribe={onToggleSubscribe}
            />
          ))}
        </div>
      )}
    </div>
  );
};
