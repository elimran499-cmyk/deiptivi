import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  Header 
} from './components/Header';
import {
  HeroBanner 
} from './components/HeroBanner';
import { 
  PricingPlans 
} from './components/PricingPlans';
import { 
  SpeedTest 
} from './components/SpeedTest';
import { 
  SportsShowcase 
} from './components/SportsShowcase';
import { 
  SportsMarquee 
} from './components/SportsMarquee';
import { 
  QualityCompare 
} from './components/QualityCompare';
import { 
  MobileActionBar 
} from './components/MobileActionBar';
import { 
  TrustSignals 
} from './components/TrustSignals';
import { 
  Faq 
} from './components/Faq';
import {
  SiteFooter
} from './components/SiteFooter';
import { 
  DutchTopFilms 
} from './components/DutchTopFilms';
import { 
  DutchTopSeries 
} from './components/DutchTopSeries';
import { 
  ImdbTopSeries 
} from './components/ImdbTopSeries';
import { 
  MOCK_CHANNELS, 
  MOCK_TRENDING_MOVIES, 
  MOCK_SERIES, 
  INITIAL_USER_SUBSCRIPTION 
} from './data/mockData';
import { Channel, Movie, UserSubscription } from './types';
import { useTheme } from './hooks/useTheme';

// Heavy, rarely-opened views. The player alone pulls in hls.js, so none of this
// belongs in the chunk that renders the landing page.
const VideoPlayer = lazy(() =>
  import('./components/VideoPlayer').then((m) => ({ default: m.VideoPlayer }))
);
const SearchModal = lazy(() =>
  import('./components/SearchModal').then((m) => ({ default: m.SearchModal }))
);
const M3uImportModal = lazy(() =>
  import('./components/M3uImportModal').then((m) => ({ default: m.M3uImportModal }))
);
const MovieDetailsModal = lazy(() =>
  import('./components/MovieDetailsModal').then((m) => ({ default: m.MovieDetailsModal }))
);
import { 
  Radio, 
  Tv, 
  Film, 
  Sparkles, 
  Trophy, 
  Newspaper, 
  Compass, 
  Smile, 
  Music, 
  Zap, 
  Search, 
  Check,
  Star
} from 'lucide-react';

const CHANNELS_KEY = 'deiptivi_channels_nl';

export default function App() {
  const [channels, setChannels] = useState<Channel[]>(() => {
    // Falls back to the pre-rebrand key so imported channels survive the rename.
    const saved =
      localStorage.getItem(CHANNELS_KEY) ?? localStorage.getItem('streampulse_channels_nl');
    return saved ? JSON.parse(saved) : MOCK_CHANNELS;
  });

  const [movies] = useState<Movie[]>(MOCK_TRENDING_MOVIES);
  const [subscription] = useState<UserSubscription>(INITIAL_USER_SUBSCRIPTION);

  const [activePage, setActivePage] = useState<string>('home');

  // Modals & Active media
  const [activePlayingChannel, setActivePlayingChannel] = useState<Channel | null>(null);
  const [activePlayingMovie, setActivePlayingMovie] = useState<Movie | null>(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState<Movie | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isM3uImportOpen, setIsM3uImportOpen] = useState(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const { theme, toggleTheme } = useTheme();

  // Save channels to localStorage
  useEffect(() => {
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(channels));
  }, [channels]);

  // Keyboard shortcut Command+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Each nav entry is a page of its own, so switching resets the scroll position.
  const goToPage = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const goToPackages = () => goToPage('pakketten');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Channel Subscription Toggle
  const handleToggleSubscribe = (channel: Channel, e: React.MouseEvent) => {
    e.stopPropagation();
    setChannels((prev) =>
      prev.map((c) => {
        if (c.id === channel.id) {
          const nextState = !c.isSubscribed;
          showToast(
            nextState
              ? `"${c.name}" toegevoegd aan je zenderlijst`
              : `"${c.name}" verwijderd uit je zenderlijst`
          );
          return { ...c, isSubscribed: nextState };
        }
        return c;
      })
    );
  };

  // Add imported channels from M3U parser
  const handleImportChannels = (newChannels: Channel[]) => {
    setChannels((prev) => [...newChannels, ...prev]);
    showToast(`${newChannels.length} geïmporteerde zenders toegevoegd aan je lijst.`);
  };

  // Add preset channels
  const handleAddPresetChannels = () => {
    setChannels((prev) =>
      prev.map((c) => ({ ...c, isSubscribed: true }))
    );
    showToast('Alle beschikbare IPTV-zenders zijn toegevoegd aan je zenderlijst!');
  };

  const subscribedChannels = channels.filter((c) => c.isSubscribed);


  return (
    <div className="min-h-screen bg-slate-950 bg-grid text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-black antialiased">
      {/* Top Fixed Header */}
      <Header
        subscription={subscription}
        activePage={activePage}
        onSelectPage={goToPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Dashboard Main View Container */}
        {/* Full-bleed: no max-width here, so the hero and rows reach both edges.
            Sections that need a readable measure cap themselves (max-w-5xl/3xl). */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 w-full pb-28 lg:pb-8">
          {/* PAGE: HOME */}
          {activePage === 'home' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Sleek Hero Carousel with Trending Movies & Featured Live Sports */}
              <HeroBanner onGoToPackages={goToPackages} />

              {/* Sport teaser, ahead of the film rows */}
              <SportsMarquee onOpenSports={() => goToPage('sport')} />

              {/* Dutch film classics and series charts */}
              <DutchTopFilms />

              <DutchTopSeries />

              <ImdbTopSeries />

              {/* The offer, then everything that makes it safe to accept */}
              <PricingPlans />

              <TrustSignals />

              <Faq onOpenSpeedTest={() => goToPage('snelheid')} />
            </div>
          )}

          {/* PAGE: SPORT */}
          {activePage === 'sport' && <SportsShowcase />}

          {/* PAGE: PACKAGES */}
          {activePage === 'pakketten' && (
            <div className="space-y-8 animate-fadeIn">
              <PricingPlans />
              <TrustSignals />
              <Faq onOpenSpeedTest={() => goToPage('snelheid')} />
            </div>
          )}

          {/* PAGE: QUALITY COMPARISON */}
          {activePage === 'kwaliteit' && <QualityCompare />}

          {/* PAGE: SPEED TEST */}
          {activePage === 'snelheid' && <SpeedTest />}

        </main>
      </div>

      <Suspense fallback={null}>
      {/* Video Stream Player Modal */}
      {activePlayingChannel && (
        <VideoPlayer
          channel={activePlayingChannel}
          allChannels={channels}
          onClose={() => setActivePlayingChannel(null)}
          onSelectChannel={(ch) => setActivePlayingChannel(ch)}
          onToggleSubscribe={handleToggleSubscribe}
        />
      )}

      {/* Movie Video Stream Player */}
      {activePlayingMovie && (
        <VideoPlayer
          channel={{
            id: activePlayingMovie.id,
            name: activePlayingMovie.title,
            number: 999,
            category: 'VOD-film',
            country: 'NL',
            logo: activePlayingMovie.poster,
            quality: activePlayingMovie.quality,
            streamUrl: activePlayingMovie.streamUrl,
            isSubscribed: true,
            isFavorite: true,
            viewersCount: 15200,
            currentProgram: {
              id: `mov-epg-${activePlayingMovie.id}`,
              title: activePlayingMovie.title,
              description: activePlayingMovie.overview,
              startTime: '00:00',
              endTime: activePlayingMovie.duration,
              durationMinutes: 120,
              progressPercent: 15,
            },
            upcomingPrograms: []
          }}
          allChannels={channels}
          onClose={() => setActivePlayingMovie(null)}
          onSelectChannel={() => {}}
          onToggleSubscribe={() => {}}
        />
      )}

      {/* Movie Details Modal */}
      <MovieDetailsModal
        movie={selectedMovieDetails}
        onClose={() => setSelectedMovieDetails(null)}
        onPlayMovie={(m) => setActivePlayingMovie(m)}
      />

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        channels={channels}
        movies={movies}
        series={MOCK_SERIES}
        onPlayChannel={(c) => setActivePlayingChannel(c)}
        onPlayMovie={(m) => setActivePlayingMovie(m)}
        onToggleSubscribe={handleToggleSubscribe}
      />

      {/* M3U Playlist Importer Modal */}
      <M3uImportModal
        isOpen={isM3uImportOpen}
        onClose={() => setIsM3uImportOpen(false)}
        onImportChannels={handleImportChannels}
      />
      </Suspense>

      <SiteFooter onSelectPage={goToPage} />

      {/* Persistent mobile actions */}
      <MobileActionBar onOpenPackages={goToPackages} />

      {/* Toast Popup Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/40 text-slate-100 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-bold">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  );
}
