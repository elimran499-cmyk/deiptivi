import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Tv, 
  Film, 
  Radio, 
  Star, 
  Sparkles, 
  ArrowRight, 
  Filter,
  BookmarkCheck,
  Zap
} from 'lucide-react';
import { Channel, Movie, TVSeries, ContentType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  channels: Channel[];
  movies: Movie[];
  series: TVSeries[];
  onPlayChannel: (channel: Channel) => void;
  onPlayMovie: (movie: Movie) => void;
  onToggleSubscribe: (channel: Channel, e: React.MouseEvent) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  channels,
  movies,
  series,
  onPlayChannel,
  onPlayMovie,
  onToggleSubscribe
}) => {
  const [query, setQuery] = useState('');
  const [contentType, setContentType] = useState<ContentType>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  // Filter channels
  const filteredChannels = channels.filter((c) => {
    const matchesQuery = 
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase()) ||
      c.country.toLowerCase().includes(query.toLowerCase()) ||
      c.currentProgram.title.toLowerCase().includes(query.toLowerCase());

    const matchesQuality = selectedQuality === 'all' || c.quality === selectedQuality;
    return matchesQuery && matchesQuality;
  });

  // Filter movies
  const filteredMovies = movies.filter((m) => {
    const matchesQuery = 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.overview.toLowerCase().includes(query.toLowerCase()) ||
      m.genres.some(g => g.toLowerCase().includes(query.toLowerCase()));

    const matchesQuality = selectedQuality === 'all' || m.quality === selectedQuality;
    return matchesQuery && matchesQuality;
  });

  const hasResults = 
    (contentType === 'all' || contentType === 'live') && filteredChannels.length > 0 ||
    (contentType === 'all' || contentType === 'movie') && filteredMovies.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center gap-3 bg-slate-900/50">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Typ een zendernaam, wedstrijd, filmtitel of genre (bijv. Ziggo Sport, Eredivisie, Dune, 4K)..."
            className="w-full bg-transparent text-slate-100 text-sm sm:text-base font-medium focus:outline-none placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="p-3 bg-slate-900/30 border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setContentType('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                contentType === 'all'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-100'
              }`}
            >
              Alles ({filteredChannels.length + filteredMovies.length})
            </button>
            <button
              onClick={() => setContentType('live')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                contentType === 'live'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-100'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              Live zenders ({filteredChannels.length})
            </button>
            <button
              onClick={() => setContentType('movie')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                contentType === 'movie'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-slate-100 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-100'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-amber-400" />
              Films ({filteredMovies.length})
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-500 uppercase font-extrabold">Kwaliteit:</span>
            {['all', '4K', 'FHD'].map((q) => (
              <button
                key={q}
                onClick={() => setSelectedQuality(q)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                  selectedQuality === q
                    ? 'bg-cyan-500 text-black'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {q === 'all' ? 'alles' : q}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!hasResults && (
            <div className="text-center py-12 space-y-3">
              <Tv className="w-12 h-12 text-slate-700 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">
                No matching channels or movies found for "{query}".
              </p>
              <p className="text-xs text-slate-500">
                Probeer te zoeken op competities, nieuwszenders, films, 4K of een genre.
              </p>
            </div>
          )}

          {/* Live Channels Results Section */}
          {(contentType === 'all' || contentType === 'live') && filteredChannels.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
                <span className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-cyan-400" />
                  Live tv-zenders ({filteredChannels.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredChannels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => {
                      onPlayChannel(channel);
                      onClose();
                    }}
                    className="group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 p-3 rounded-2xl flex items-center justify-between gap-3 transition-all cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 p-1 border border-slate-800 shrink-0 flex items-center justify-center">
                        <img src={channel.logo} alt={channel.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-100 group-hover:text-cyan-300 truncate">
                            {channel.number}. {channel.name}
                          </span>
                          <span className="px-1 py-0.2 text-[9px] font-extrabold bg-slate-800 text-cyan-400 rounded">
                            {channel.quality}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {channel.currentProgram.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSubscribe(channel, e);
                        }}
                        className={`p-2 rounded-xl transition-all ${
                          channel.isSubscribed
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-100'
                        }`}
                        title={channel.isSubscribed ? 'In je lijst' : 'Toevoegen'}
                      >
                        <BookmarkCheck className="w-4 h-4" />
                      </button>
                      <div className="p-2 rounded-xl bg-indigo-600 text-slate-100 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VOD Movies Results Section */}
          {(contentType === 'all' || contentType === 'movie') && filteredMovies.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
                <span className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  Populaire films ({filteredMovies.length})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      onPlayMovie(movie);
                      onClose();
                    }}
                    className="group bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 p-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer shadow-sm"
                  >
                    <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                      <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-100 group-hover:text-amber-300 truncate">
                          {movie.title}
                        </span>
                        <span className="px-1.5 py-0.2 text-[9px] font-bold bg-amber-500/20 text-amber-400 rounded flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-current" /> {movie.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {movie.overview}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-semibold">
                        <span>{movie.year}</span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{movie.quality}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
