import React from 'react';
import { X, Play, Star, Clock, Calendar, Film, ShieldCheck, UserCheck, Plus, Check } from 'lucide-react';
import { Movie } from '../types';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlayMovie: (movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  onPlayMovie
}) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        {/* Backdrop Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md transition-all cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Badges on Backdrop */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase bg-cyan-500 text-black">
                {movie.quality} HDR
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-slate-900/90 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400" /> {movie.rating}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-slate-300 border border-slate-800">
                {movie.year}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-slate-300 border border-slate-800">
                {movie.duration}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Tagline & Overview */}
          {movie.tagline && (
            <p className="text-xs font-bold text-cyan-400 italic">
              "{movie.tagline}"
            </p>
          )}

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {movie.overview}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 pt-1">
            {movie.genres.map((g) => (
              <span key={g} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                {g}
              </span>
            ))}
          </div>

          {/* Details Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-500 block mb-1">Regisseur</span>
              <p className="font-bold text-slate-100">{movie.director}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-500 block mb-1">Hoofdrollen</span>
              <p className="font-bold text-slate-100 truncate">{movie.cast.join(', ')}</p>
            </div>
          </div>

          {/* Play Action Button */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs"
            >
              Terug
            </button>
            <button
              onClick={() => {
                onClose();
                onPlayMovie(movie);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 text-white font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white" />
              Film streamen in 4K
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
