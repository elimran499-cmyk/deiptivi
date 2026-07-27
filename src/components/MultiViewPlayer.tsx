import React, { useState } from 'react';
import { Monitor, Volume2, VolumeX, Maximize2, X, Plus, Radio, Tv } from 'lucide-react';
import { Channel } from '../types';

interface MultiViewPlayerProps {
  channels: Channel[];
}

export const MultiViewPlayer: React.FC<MultiViewPlayerProps> = ({ channels }) => {
  // Store up to 4 selected channels for 2x2 Quad View
  const [slotChannels, setSlotChannels] = useState<(Channel | null)[]>([
    channels[0] || null,
    channels[1] || null,
    channels[2] || null,
    channels[3] || null,
  ]);

  const [activeAudioSlot, setActiveAudioSlot] = useState<number | null>(0);
  const [pickerSlotIndex, setPickerSlotIndex] = useState<number | null>(null);

  const handleSelectChannelForSlot = (slotIdx: number, channel: Channel) => {
    const updated = [...slotChannels];
    updated[slotIdx] = channel;
    setSlotChannels(updated);
    setPickerSlotIndex(null);
  };

  const handleRemoveSlot = (slotIdx: number) => {
    const updated = [...slotChannels];
    updated[slotIdx] = null;
    setSlotChannels(updated);
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="font-extrabold text-lg text-slate-100 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-amber-400" />
            Multiview: vier schermen
          </h2>
          <p className="text-xs text-slate-400">
            Bekijk tot vier livewedstrijden of nieuwszenders tegelijk. Klik op het geluidsicoon om een stream te ontdempen.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20">
            2x2-raster
          </span>
        </div>
      </div>

      {/* 2x2 Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 aspect-video md:aspect-[16/9] w-full bg-black rounded-3xl overflow-hidden p-2 border border-slate-800 shadow-2xl">
        {slotChannels.map((channel, idx) => (
          <div
            key={idx}
            className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/90 flex flex-col items-center justify-center group"
          >
            {channel ? (
              <div className="relative w-full h-full bg-slate-950 flex flex-col justify-between p-3">
                {/* Embedded Video Player or Canvas Feed */}
                <video
                  src={channel.streamUrl}
                  autoPlay
                  playsInline
                  loop
                  muted={activeAudioSlot !== idx}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Stream Overlay info */}
                <div className="relative z-10 flex items-center justify-between bg-black/70 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <img src={channel.logo} alt={channel.name} className="w-6 h-6 rounded bg-slate-900 object-cover" />
                    <span className="text-xs font-bold text-white truncate">{channel.name}</span>
                    <span className="px-1 py-0.2 text-[8px] font-extrabold bg-slate-800 text-cyan-400 rounded">
                      {channel.quality}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveAudioSlot(activeAudioSlot === idx ? null : idx)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        activeAudioSlot === idx
                          ? 'bg-amber-500 text-black font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                      title={activeAudioSlot === idx ? 'Dempen' : 'Geluid aanzetten'}
                    >
                      {activeAudioSlot === idx ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => handleRemoveSlot(idx)}
                      className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-red-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Scherm leegmaken"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Live Banner */}
                <div className="relative z-10 mt-auto bg-black/60 backdrop-blur-md p-2 rounded-xl text-[10px] text-slate-300 font-medium flex items-center justify-between">
                  <span className="truncate">{channel.currentProgram.title}</span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 text-red-500 animate-pulse" /> LIVE
                  </span>
                </div>
              </div>
            ) : (
              /* Empty Slot Button */
              <button
                onClick={() => setPickerSlotIndex(idx)}
                className="w-full h-full min-h-[160px] flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-indigo-400 bg-slate-900/40 hover:bg-slate-900/80 transition-all cursor-pointer border border-dashed border-slate-800 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold">Kies zender {idx + 1}</span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Channel Picker Modal */}
      {pickerSlotIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
                <Tv className="w-4 h-4 text-cyan-400" />
                Select Channel for Screen #{pickerSlotIndex + 1}
              </h3>
              <button
                onClick={() => setPickerSlotIndex(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChannelForSlot(pickerSlotIndex, ch)}
                  className="w-full p-3 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-left transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={ch.logo} alt={ch.name} className="w-8 h-8 rounded bg-slate-950 object-cover" />
                    <div>
                      <div className="font-bold text-xs text-slate-100">{ch.number}. {ch.name}</div>
                      <div className="text-[10px] text-slate-400">{ch.category}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 font-mono text-cyan-400 font-bold">
                    {ch.quality}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
