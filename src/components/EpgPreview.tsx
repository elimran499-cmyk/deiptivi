import React, { useState } from 'react';
import { CalendarClock, Play, Radio } from 'lucide-react';
import { Channel } from '../types';

interface EpgPreviewProps {
  channels: Channel[];
  onPlayChannel: (channel: Channel) => void;
}

/**
 * Live programme guide built from the same EPG data the player uses, so what
 * visitors see here is exactly what they get after subscribing.
 */
export const EpgPreview: React.FC<EpgPreviewProps> = ({ channels, onPlayChannel }) => {
  const guideChannels = channels.slice(0, 8);
  const [selectedId, setSelectedId] = useState(guideChannels[0]?.id);

  const selected = guideChannels.find((c) => c.id === selectedId) ?? guideChannels[0];
  if (!selected) return null;

  const now = selected.currentProgram;
  const upcoming = selected.upcomingPrograms ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-amber-400" />
          Live tv-gids
        </h2>
        <p className="text-xs text-slate-400">
          Wat er nu speelt en wat er zo komt — dezelfde gids die je in de app gebruikt
        </p>
      </div>

      <div className="rounded-3xl border border-white/15 bg-slate-900/60 backdrop-blur-xl overflow-hidden grid grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Channel rail */}
        <div className="md:border-r border-white/10 max-h-80 overflow-y-auto flex md:block gap-2 p-2 overflow-x-auto">
          {guideChannels.map((channel) => {
            const isActive = channel.id === selected.id;
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedId(channel.id)}
                className={`shrink-0 md:w-full min-h-[48px] px-3 py-2.5 rounded-2xl flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                  isActive ? 'bg-white text-indigo-950' : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <img
                  src={channel.logo}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 rounded-lg object-cover shrink-0"
                />
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold truncate max-w-[9rem]">
                    {channel.name}
                  </span>
                  <span
                    className={`block text-[10px] font-medium ${
                      isActive ? 'text-indigo-950/60' : 'text-slate-400'
                    }`}
                  >
                    CH {channel.number} • {channel.quality}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Programme detail */}
        <div className="p-5 sm:p-6 space-y-5">
          {now && (
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-red-400">
                <Radio className="w-3 h-3 animate-pulse" />
                Nu live
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">{now.title}</h3>
                <span className="text-xs font-mono text-slate-300">
                  {now.startTime} – {now.endTime}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{now.description}</p>
              <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-300"
                  style={{ width: `${now.progressPercent}%` }}
                />
              </div>
              <button
                onClick={() => onPlayChannel(selected)}
                className="mt-1 min-h-[44px] px-5 rounded-2xl bg-white hover:bg-white/90 text-indigo-950 font-black text-sm inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-indigo-950" />
                Kijk nu
              </button>
            </div>
          )}

          {upcoming.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                Hierna
              </p>
              {upcoming.map((programme) => (
                <div
                  key={programme.id}
                  className="flex items-start justify-between gap-4 py-1.5 hover:bg-white/5 rounded-xl px-2 -mx-2 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-100 truncate">{programme.title}</p>
                    <p className="text-[11px] text-slate-400 truncate">{programme.description}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 shrink-0">
                    {programme.startTime}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
