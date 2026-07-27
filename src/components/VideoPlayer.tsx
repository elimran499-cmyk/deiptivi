import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Radio, 
  X, 
  Settings, 
  ChevronRight, 
  ChevronLeft, 
  BookmarkCheck, 
  Bookmark,
  Tv,
  List,
  Layers,
  Sparkles,
  Wifi
} from 'lucide-react';
import { Channel } from '../types';

interface VideoPlayerProps {
  channel: Channel;
  allChannels: Channel[];
  onClose: () => void;
  onSelectChannel: (channel: Channel) => void;
  onToggleSubscribe: (channel: Channel, e: React.MouseEvent) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  channel,
  allChannels,
  onClose,
  onSelectChannel,
  onToggleSubscribe
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChannelList, setShowChannelList] = useState(false);
  const [streamQuality, setStreamQuality] = useState<'Auto' | '4K' | '1080p' | '720p'>('Auto');
  const [streamError, setStreamError] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Setup HLS / Video source
  useEffect(() => {
    setStreamError(false);
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const isM3U8 = channel.streamUrl.endsWith('.m3u8') || channel.streamUrl.includes('m3u8');

    if (isM3U8 && Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hls.loadSource(channel.streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => setIsPlaying(false));
      });
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.warn('HLS stream load error, falling back to canvas video simulator');
          setStreamError(true);
        }
      });
    } else {
      video.src = channel.streamUrl;
      video.play().catch(() => {
        // Fallback or autoplay policy
        setStreamError(true);
      });
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [channel.streamUrl]);

  // Simulated TV Canvas Stream when direct stream has CORS/network limits
  useEffect(() => {
    if (!streamError) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const renderSimulator = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Dark background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Moving graphic waves / sound spectrum effect
      ctx.lineWidth = 3;
      const waveCount = 12;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${ (frame + i * 20) % 360 }, 80%, 60%, 0.4)`;
        for (let x = 0; x < w; x += 10) {
          const y = h / 2 + Math.sin((x + frame * 4 + i * 50) * 0.015) * (40 + i * 8);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Live Watermark and channel badge
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(`STREAM PULSE LIVE 4K • ${channel.name.toUpperCase()}`, 40, 60);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '16px sans-serif';
      ctx.fillText(`NU: ${channel.currentProgram.title}`, 40, 90);

      animId = requestAnimationFrame(renderSimulator);
    };

    renderSimulator();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [streamError, channel]);

  // Controls auto hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 4000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.log(err));
      setIsFullscreen(false);
    }
  };

  const togglePIP = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    }
  };

  const currentIdx = allChannels.findIndex((c) => c.id === channel.id);
  const handlePrevChannel = () => {
    if (allChannels.length === 0) return;
    const prevIdx = (currentIdx - 1 + allChannels.length) % allChannels.length;
    onSelectChannel(allChannels[prevIdx]);
  };

  const handleNextChannel = () => {
    if (allChannels.length === 0) return;
    const nextIdx = (currentIdx + 1) % allChannels.length;
    onSelectChannel(allChannels[nextIdx]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6 animate-fadeIn">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-6xl aspect-video bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col justify-between group select-none"
      >
        {/* Video or Fallback Canvas */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            className={`w-full h-full object-contain ${streamError ? 'hidden' : 'block'}`}
            playsInline
            autoPlay
            onError={() => setStreamError(true)}
          />

          {streamError && (
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Top Floating Header Controls */}
        <div 
          className={`relative z-20 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shrink-0">
              <img src={channel.logo} alt={channel.name} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">{channel.name}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white">
                  {channel.quality}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Wifi className="w-3 h-3 animate-pulse" /> 60 FPS • LAGE LATENCY
                </span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-1">
                {channel.currentProgram.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleSubscribe(channel, e)}
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                channel.isSubscribed
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
              title={channel.isSubscribed ? 'Zender in je lijst' : 'Zender toevoegen'}
            >
              {channel.isSubscribed ? <BookmarkCheck className="w-4 h-4 text-cyan-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowChannelList(!showChannelList)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                showChannelList
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
              title="Snel wisselen van zender"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-red-600 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
              title="Speler sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Channel List Drawer Overlay */}
        {showChannelList && (
          <div className="absolute right-0 top-16 bottom-20 z-30 w-72 sm:w-80 bg-slate-950/95 border-l border-slate-800 backdrop-blur-xl p-4 overflow-y-auto space-y-2 shadow-2xl animate-slideLeft">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-extrabold text-xs text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Tv className="w-4 h-4 text-cyan-400" />
                Snelle zendergids
              </span>
              <span className="text-[10px] text-slate-400">{allChannels.length} zenders</span>
            </div>

            {allChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChannel(ch);
                  setShowChannelList(false);
                }}
                className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                  ch.id === channel.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-cyan-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded bg-slate-900 p-0.5 border border-slate-800 shrink-0">
                    <img src={ch.logo} alt={ch.name} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs truncate font-semibold">{ch.number}. {ch.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{ch.currentProgram.title}</p>
                  </div>
                </div>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-slate-800 font-mono text-slate-400">
                  {ch.quality}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Bottom Floating Video Player Controls Bar */}
        <div 
          className={`relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent space-y-3 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* EPG Live Program Progress */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
                {channel.currentProgram.title}
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                {channel.currentProgram.startTime} - {channel.currentProgram.endTime}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-300"
                style={{ width: `${channel.currentProgram.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Player Buttons Row */}
          <div className="flex items-center justify-between gap-4 pt-1">
            {/* Left Controls: Play/Pause, Next/Prev Channel */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevChannel}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
                title="Vorige zender"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:scale-105 transition-transform shadow-lg shadow-indigo-600/30 cursor-pointer"
                title={isPlaying ? 'Pauzeren' : 'Afspelen'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              </button>

              <button
                onClick={handleNextChannel}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
                title="Volgende zender"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Volume */}
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            </div>

            {/* Right Controls: Stream Quality Selector, PIP, Fullscreen */}
            <div className="flex items-center gap-2">
              <select
                value={streamQuality}
                onChange={(e) => setStreamQuality(e.target.value as any)}
                className="bg-slate-900 text-slate-300 border border-slate-800 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="Auto">Automatisch (4K HDR)</option>
                <option value="4K">2160p 4K</option>
                <option value="1080p">1080p60</option>
                <option value="720p">720p</option>
              </select>

              <button
                onClick={togglePIP}
                className="hidden sm:block p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
                title="Beeld-in-beeld"
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all cursor-pointer"
                title="Volledig scherm"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
