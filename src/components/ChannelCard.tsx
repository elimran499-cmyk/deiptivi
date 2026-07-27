import React from 'react';
import { Play, Radio, Bookmark, BookmarkCheck, Users, Clock, Sparkles } from 'lucide-react';
import { Channel } from '../types';

interface ChannelCardProps {
  channel: Channel;
  onPlay: (channel: Channel) => void;
  onToggleSubscribe: (channel: Channel, e: React.MouseEvent) => void;
  onToggleFavorite?: (channel: Channel, e: React.MouseEvent) => void;
  viewMode?: 'grid' | 'compact' | 'epg';
}

export const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  onPlay,
  onToggleSubscribe,
  viewMode = 'grid'
}) => {
  const { currentProgram } = channel;

  if (viewMode === 'compact') {
    return (
      <div 
        onClick={() => onPlay(channel)}
        className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-3 flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer shadow-md hover:shadow-indigo-500/10"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo container */}
          <div className="relative w-12 h-12 rounded-xl bg-slate-950 p-1.5 border border-slate-800 shrink-0 overflow-hidden flex items-center justify-center">
            <img
              src={channel.logo}
              alt={channel.name}
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              onError={(e) => {
                // Fallback icon if logo URL fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute top-1 right-1 px-1 py-0.2 rounded text-[8px] font-extrabold bg-slate-900 text-cyan-400 border border-slate-700">
              {channel.quality}
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-slate-100 truncate group-hover:text-cyan-400 transition-colors">
                {channel.number}. {channel.name}
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-semibold bg-slate-800 text-slate-400 rounded">
                {channel.country}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {currentProgram ? currentProgram.title : channel.category}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => onToggleSubscribe(channel, e)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              channel.isSubscribed
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-slate-800 text-slate-400 hover:text-slate-100'
            }`}
            title={channel.isSubscribed ? 'In je lijst' : 'Toevoegen aan lijst'}
          >
            {channel.isSubscribed ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => onPlay(channel)}
            className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-slate-100 hover:scale-105 transition-transform shadow-md cursor-pointer"
            title="Bekijk livestream"
          >
            <Play className="w-3.5 h-3.5 fill-slate-100" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => onPlay(channel)}
      className="group relative bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Top Bar: Logo, Quality, Country, Favorite/Subscription Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-xl bg-slate-950 p-1.5 border border-slate-800/90 shrink-0 overflow-hidden flex items-center justify-center shadow-inner">
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  CH {channel.number}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                  channel.quality === '4K'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-100'
                    : 'bg-slate-800 text-slate-300'
                }`}>
                  {channel.quality}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800/80 text-slate-400">
                  {channel.country}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors truncate mt-1">
                {channel.name}
              </h3>
            </div>
          </div>

          <button
            onClick={(e) => onToggleSubscribe(channel, e)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              channel.isSubscribed
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-950 hover:bg-slate-800 text-slate-500 hover:text-slate-200 border border-slate-800'
            }`}
            title={channel.isSubscribed ? 'Zender in je lijst' : 'Toevoegen aan lijst'}
          >
            {channel.isSubscribed ? (
              <BookmarkCheck className="w-4 h-4 text-cyan-400" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Current Program Section */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-2 mb-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              <Radio className="w-3 h-3 animate-pulse text-red-500" />
              NU LIVE
            </span>
            <span className="text-slate-400 font-mono text-[10px]">
              {currentProgram.startTime} - {currentProgram.endTime}
            </span>
          </div>
          
          <p className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-slate-100 transition-colors">
            {currentProgram.title}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${currentProgram.progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Footer Info & Watch Action */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <span>{(channel.viewersCount / 1000).toFixed(1)}k kijkers</span>
        </div>

        <div className="flex items-center gap-2 text-indigo-400 font-bold group-hover:text-cyan-300 transition-colors">
          <span>Kijk</span>
          <div className="w-6 h-6 rounded-full bg-indigo-600/30 group-hover:bg-indigo-600 text-slate-100 flex items-center justify-center transition-all">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
