export type ContentType = 'all' | 'live' | 'movie' | 'series';

export interface EPGProgram {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO or HH:mm
  endTime: string;
  durationMinutes: number;
  progressPercent: number; // 0-100
  category?: string;
  rating?: string;
}

export interface Channel {
  id: string;
  name: string;
  number: number;
  category: string;
  country: string;
  logo: string;
  quality: '4K' | 'FHD' | 'HD' | 'SD';
  streamUrl: string;
  isSubscribed: boolean;
  isFavorite: boolean;
  isTrending?: boolean;
  viewersCount: number;
  currentProgram: EPGProgram;
  upcomingPrograms: EPGProgram[];
  groupTitle?: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline?: string;
  overview: string;
  poster: string;
  backdrop: string;
  rating: number; // 0-10
  year: number;
  duration: string; // e.g. "2h 15m"
  genres: string[];
  quality: '4K' | 'FHD' | 'HD';
  streamUrl: string;
  trailerUrl?: string;
  cast: string[];
  director: string;
  isTrending?: boolean;
  isPopular?: boolean;
}

export interface TVSeries {
  id: string;
  title: string;
  overview: string;
  poster: string;
  backdrop: string;
  rating: number;
  year: number;
  seasonsCount: number;
  episodesCount: number;
  genres: string[];
  quality: '4K' | 'FHD';
  isTrending?: boolean;
}

export interface UserSubscription {
  planName: string;
  status: 'Active' | 'Expiring Soon' | 'Expired';
  expiryDate: string;
  maxConnections: number;
  activeConnections: number;
  serverRegion: string;
  pingMs: number;
  autoRenew: boolean;
  qualityAccess: string[];
}

export interface SearchFilterState {
  query: string;
  contentType: ContentType;
  category: string;
  quality: string;
  onlySubscribed: boolean;
}
