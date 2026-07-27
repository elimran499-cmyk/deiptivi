import { Channel, Movie, TVSeries, UserSubscription } from '../types';

export const INITIAL_USER_SUBSCRIPTION: UserSubscription = {
  planName: 'VIP Ultra 4K IPTV Pas',
  status: 'Active',
  expiryDate: '2027-08-15',
  maxConnections: 4,
  activeConnections: 2,
  serverRegion: 'Nederland (Amsterdam AMS-IX Node)',
  pingMs: 6,
  autoRenew: true,
  qualityAccess: ['4K HDR', '1080p60', '720p', '5.1 Dolby Surround']
};

export const CATEGORIES = [
  { id: 'all', name: 'Alle zenders', icon: 'Tv' },
  { id: 'Sports', name: 'Live sport', icon: 'Trophy' },
  { id: 'Movies', name: 'Films & cinema', icon: 'Film' },
  { id: 'News', name: 'Nieuws', icon: 'Newspaper' },
  { id: 'Entertainment', name: 'Entertainment', icon: 'Sparkles' },
  { id: 'Documentaries', name: 'Documentaires', icon: 'Compass' },
  { id: 'Kids', name: 'Kids & familie', icon: 'Smile' },
  { id: 'Music', name: 'Muziek 24/7', icon: 'Music' },
  { id: 'VIP 4K', name: 'VIP 4K streams', icon: 'Zap' }
];

export const MOCK_CHANNELS: Channel[] = [
  {
    id: 'ch-1',
    name: 'Ziggo Sport Totaal 4K',
    number: 101,
    category: 'Sports',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    isSubscribed: true,
    isFavorite: true,
    isTrending: true,
    viewersCount: 142500,
    currentProgram: {
      id: 'epg-101-1',
      title: 'Eredivisie: Ajax - PSV',
      description: 'Live vanuit de Johan Cruijff ArenA in 4K HDR met ultralage vertraging en Dolby Atmos commentaar.',
      startTime: '14:30',
      endTime: '16:30',
      durationMinutes: 120,
      progressPercent: 68,
      category: 'Sport',
      rating: 'AL'
    },
    upcomingPrograms: [
      {
        id: 'epg-101-2',
        title: 'Rondo: nabeschouwing',
        description: 'Analyse van de topper, tactische uitleg, spelersinterviews en de stand in de Eredivisie.',
        startTime: '16:30',
        endTime: '17:30',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Sport'
      },
      {
        id: 'epg-101-3',
        title: 'Formule 1: samenvatting Zandvoort',
        description: 'De mooiste momenten van de Dutch Grand Prix met deskundig commentaar en onboard beelden.',
        startTime: '17:30',
        endTime: '19:00',
        durationMinutes: 90,
        progressPercent: 0,
        category: 'Sport'
      }
    ]
  },
  {
    id: 'ch-2',
    name: 'ESPN 1 NL',
    number: 102,
    category: 'Sports',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&auto=format&fit=crop&q=80',
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isSubscribed: true,
    isFavorite: true,
    isTrending: true,
    viewersCount: 98400,
    currentProgram: {
      id: 'epg-102-1',
      title: 'Eredivisie: Feyenoord - AZ',
      description: 'Klassieker in De Kuip met meerdere camerastandpunten, live in 60 beelden per seconde.',
      startTime: '14:00',
      endTime: '16:30',
      durationMinutes: 150,
      progressPercent: 52,
      category: 'Sport'
    },
    upcomingPrograms: [
      {
        id: 'epg-102-2',
        title: 'Voetbalpraat Live',
        description: 'Alle uitslagen, transfernieuws, statistieken en de tien mooiste goals van de week.',
        startTime: '16:30',
        endTime: '18:00',
        durationMinutes: 90,
        progressPercent: 0,
        category: 'Sport'
      }
    ]
  },
  {
    id: 'ch-3',
    name: 'Viaplay Sport 1 4K',
    number: 103,
    category: 'Sports',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: false,
    viewersCount: 75200,
    currentProgram: {
      id: 'epg-103-1',
      title: 'Premier League: Liverpool - Arsenal',
      description: 'Topduel vanuit Anfield met Nederlands commentaar en keuze uit meerdere camerahoeken.',
      startTime: '15:00',
      endTime: '17:00',
      durationMinutes: 120,
      progressPercent: 30,
      category: 'Sport'
    },
    upcomingPrograms: [
      {
        id: 'epg-103-2',
        title: 'Darts: Premier League Night',
        description: 'Vooruitblik op de avondsessie, hoogtepunten en analyse door de experts.',
        startTime: '17:00',
        endTime: '19:00',
        durationMinutes: 120,
        progressPercent: 0,
        category: 'Sport'
      }
    ]
  },
  {
    id: 'ch-4',
    name: 'Eurosport 1 NL 4K',
    number: 104,
    category: 'Sports',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    isSubscribed: true,
    isFavorite: true,
    isTrending: true,
    viewersCount: 110400,
    currentProgram: {
      id: 'epg-104-1',
      title: 'Wielrennen: Amstel Gold Race',
      description: 'Live vanuit Limburg, de complete finale over de Cauberg in ultra HDR met 60 fps.',
      startTime: '14:45',
      endTime: '16:45',
      durationMinutes: 120,
      progressPercent: 55,
      category: 'Sport'
    },
    upcomingPrograms: [
      {
        id: 'epg-104-2',
        title: 'Schaatsen: WK Afstanden Heerenveen',
        description: 'De 5000 meter heren en 3000 meter dames vanuit Thialf.',
        startTime: '16:45',
        endTime: '17:45',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Sport'
      }
    ]
  },
  {
    id: 'ch-5',
    name: 'Film1 Premiere 4K',
    number: 201,
    category: 'Movies',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    isSubscribed: true,
    isFavorite: true,
    isTrending: true,
    viewersCount: 84200,
    currentProgram: {
      id: 'epg-201-1',
      title: 'Dune: Part Two (4K IMAX-editie)',
      description: 'Paul Atreides sluit zich aan bij Chani en de Fremen en zint op wraak op de samenzweerders die zijn familie vernietigden.',
      startTime: '13:45',
      endTime: '16:30',
      durationMinutes: 165,
      progressPercent: 78,
      category: 'Sci-Fi / Actie',
      rating: '12'
    },
    upcomingPrograms: [
      {
        id: 'epg-201-2',
        title: 'House of the Dragon S2: finale',
        description: 'De Targaryen-burgeroorlog escaleert terwijl draken boven Westeros met elkaar in gevecht gaan, in 4K Dolby Vision.',
        startTime: '16:30',
        endTime: '17:45',
        durationMinutes: 75,
        progressPercent: 0,
        category: 'Fantasy'
      }
    ]
  },
  {
    id: 'ch-6',
    name: 'HBO Max Cinema 4K',
    number: 202,
    category: 'Movies',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: false,
    viewersCount: 38900,
    currentProgram: {
      id: 'epg-202-1',
      title: 'John Wick: Chapter 4',
      description: 'John Wick ontdekt een manier om De Hoge Tafel te verslaan en neemt het in Parijs op tegen meesters in de vechtkunst.',
      startTime: '14:00',
      endTime: '16:50',
      durationMinutes: 170,
      progressPercent: 45,
      category: 'Actiethriller'
    },
    upcomingPrograms: [
      {
        id: 'epg-202-2',
        title: 'Mad Max: Fury Road Black & Chrome',
        description: 'Het post-apocalyptische meesterwerk van George Miller, geremasterd in hoog contrast.',
        startTime: '16:50',
        endTime: '18:50',
        durationMinutes: 120,
        progressPercent: 0,
        category: 'Actie / Sci-Fi'
      }
    ]
  },
  {
    id: 'ch-7',
    name: 'NOS Journaal 24 4K',
    number: 301,
    category: 'News',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: true,
    viewersCount: 62100,
    currentProgram: {
      id: 'epg-301-1',
      title: 'NOS Journaal & Techtop live',
      description: 'Het laatste binnenlandse nieuws, reacties uit Den Haag en live verslaggeving vanaf de techtop in Amsterdam.',
      startTime: '15:00',
      endTime: '16:00',
      durationMinutes: 60,
      progressPercent: 40,
      category: 'Nieuws'
    },
    upcomingPrograms: [
      {
        id: 'epg-301-2',
        title: 'Nieuwsuur Special',
        description: 'Diepgaande interviews met wereldleiders en Nederlandse AI-pioniers.',
        startTime: '16:00',
        endTime: '16:30',
        durationMinutes: 30,
        progressPercent: 0,
        category: 'Interview'
      }
    ]
  },
  {
    id: 'ch-8',
    name: 'RTL Nieuws HD',
    number: 302,
    category: 'News',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&auto=format&fit=crop&q=80',
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyplays.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: false,
    viewersCount: 48900,
    currentProgram: {
      id: 'epg-302-1',
      title: 'RTL Nieuws Middageditie',
      description: 'Uitgebreide analyse van de landelijke politiek, de economie en het internationale nieuws.',
      startTime: '15:00',
      endTime: '16:00',
      durationMinutes: 60,
      progressPercent: 25,
      category: 'Nieuws'
    },
    upcomingPrograms: [
      {
        id: 'epg-302-2',
        title: 'RTL Z Beurs Live',
        description: 'Actueel beursnieuws vanaf het Damrak met commentaar van analisten.',
        startTime: '16:00',
        endTime: '17:00',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Nieuws'
      }
    ]
  },
  {
    id: 'ch-9',
    name: 'RTL 4 HD',
    number: 701,
    category: 'Entertainment',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&auto=format&fit=crop&q=80',
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    isSubscribed: true,
    isFavorite: true,
    isTrending: true,
    viewersCount: 132700,
    currentProgram: {
      id: 'epg-701-1',
      title: 'The Voice of Holland: liveshow',
      description: 'De halve finale met optredens van de laatste acht kandidaten en het oordeel van de coaches.',
      startTime: '14:30',
      endTime: '16:00',
      durationMinutes: 90,
      progressPercent: 47,
      category: 'Entertainment'
    },
    upcomingPrograms: [
      {
        id: 'epg-701-2',
        title: 'RTL Boulevard',
        description: 'Het laatste showbizznieuws, royals en entertainment uit binnen- en buitenland.',
        startTime: '16:00',
        endTime: '17:00',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Entertainment'
      }
    ]
  },
  {
    id: 'ch-10',
    name: 'SBS6 HD',
    number: 702,
    category: 'Entertainment',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: false,
    viewersCount: 51200,
    currentProgram: {
      id: 'epg-702-1',
      title: 'Hart van Nederland',
      description: 'Het nieuws van de straat, met verhalen uit alle provincies van Nederland.',
      startTime: '14:00',
      endTime: '15:00',
      durationMinutes: 60,
      progressPercent: 35,
      category: 'Entertainment'
    },
    upcomingPrograms: [
      {
        id: 'epg-702-2',
        title: 'Shownieuws',
        description: 'Non-stop showbizz, interviews en de opvallendste momenten van de dag.',
        startTime: '15:00',
        endTime: '16:00',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Entertainment'
      }
    ]
  },
  {
    id: 'ch-11',
    name: 'NPO 2 Docu 4K',
    number: 401,
    category: 'Documentaries',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isSubscribed: true,
    isFavorite: true,
    isTrending: false,
    viewersCount: 41800,
    currentProgram: {
      id: 'epg-401-1',
      title: 'Planet Earth III: diepzee 4K',
      description: 'Nooit eerder gefilmde lichtgevende zeedieren en koraalriffen, opgenomen op drie kilometer diepte.',
      startTime: '14:30',
      endTime: '15:30',
      durationMinutes: 60,
      progressPercent: 85,
      category: 'Documentaire'
    },
    upcomingPrograms: [
      {
        id: 'epg-401-2',
        title: 'De Waddenzee door de seizoenen',
        description: 'Een jaar lang filmen op het wad: zeehonden, trekvogels en het ritme van eb en vloed.',
        startTime: '15:30',
        endTime: '16:30',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Natuur'
      }
    ]
  },
  {
    id: 'ch-12',
    name: 'Discovery Channel NL',
    number: 402,
    category: 'Documentaries',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&auto=format&fit=crop&q=80',
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: false,
    viewersCount: 29800,
    currentProgram: {
      id: 'epg-402-1',
      title: 'MythBusters 2026: explosielab',
      description: 'Virale natuurkundetheorieën en extreme techniekmythes getest met hogesnelheidscameras.',
      startTime: '15:00',
      endTime: '16:00',
      durationMinutes: 60,
      progressPercent: 20,
      category: 'Wetenschap & techniek'
    },
    upcomingPrograms: [
      {
        id: 'epg-402-2',
        title: 'Deltawerken: strijd tegen het water',
        description: 'Hoe Nederlandse ingenieurs het land beschermen tegen de stijgende zeespiegel.',
        startTime: '16:00',
        endTime: '17:00',
        durationMinutes: 60,
        progressPercent: 0,
        category: 'Techniek'
      }
    ]
  },
  {
    id: 'ch-13',
    name: 'NPO Zapp Kids HD',
    number: 501,
    category: 'Kids',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80',
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: false,
    viewersCount: 34100,
    currentProgram: {
      id: 'epg-501-1',
      title: 'Het Klokhuis',
      description: 'Hoe wordt een stroopwafel gemaakt? De makers zoeken het uit in de fabriek.',
      startTime: '15:15',
      endTime: '15:45',
      durationMinutes: 30,
      progressPercent: 60,
      category: 'Jeugd'
    },
    upcomingPrograms: [
      {
        id: 'epg-501-2',
        title: 'Zappsport',
        description: 'Sportieve uitdagingen met bekende Nederlandse topsporters.',
        startTime: '15:45',
        endTime: '16:15',
        durationMinutes: 30,
        progressPercent: 0,
        category: 'Jeugd'
      }
    ]
  },
  {
    id: 'ch-14',
    name: 'SLAM! TV 4K',
    number: 601,
    category: 'Music',
    country: 'NL',
    logo: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&auto=format&fit=crop&q=80',
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    isSubscribed: true,
    isFavorite: false,
    isTrending: true,
    viewersCount: 51200,
    currentProgram: {
      id: 'epg-601-1',
      title: 'Amsterdam Dance Event Live',
      description: 'Rechtstreeks vanaf de mainstage in de Johan Cruijff ArenA, met lasershow in 4K en 60 fps surround.',
      startTime: '14:00',
      endTime: '18:00',
      durationMinutes: 240,
      progressPercent: 35,
      category: 'Muziek'
    },
    upcomingPrograms: [
      {
        id: 'epg-601-2',
        title: 'Top 40 Hitlijst',
        description: 'Non-stop videoclips, artiesteninterviews en de complete countdown.',
        startTime: '18:00',
        endTime: '20:00',
        durationMinutes: 120,
        progressPercent: 0,
        category: 'Muziek'
      }
    ]
  }
];

export const MOCK_TRENDING_MOVIES: Movie[] = [
  {
    id: 'mov-1',
    title: 'Cyberpunk Odyssee 2099',
    tagline: 'Neonregen boven een stad gebouwd op gebroken herinneringen.',
    overview: 'In een doorregende futuristische metropool stuit een afvallige agent op een verborgen synthetisch bewustzijn dat de balans tussen de mensheid en hyperintelligente AI-concerns kan verstoren.',
    poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    rating: 8.9,
    year: 2025,
    duration: '2u 28m',
    genres: ['Sci-Fi', 'Actie', 'Cyberpunk'],
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    cast: ['Ryan Gosling', 'Ana de Armas', 'Sylvia Hoeks', 'Harrison Ford'],
    director: 'Denis Villeneuve',
    isTrending: true,
    isPopular: true
  },
  {
    id: 'mov-2',
    title: 'Interstellaire Horizon',
    tagline: 'De mensheid is op aarde geboren, maar hoort hier niet te sterven.',
    overview: 'Een team ontdekkingsreizigers reist door een pas ontdekt wormgat bij Saturnus om het voortbestaan van de mensheid veilig te stellen buiten een stervende planeet.',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
    rating: 9.2,
    year: 2024,
    duration: '2u 49m',
    genres: ['Sci-Fi', 'Avontuur', 'Drama'],
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    director: 'Christopher Nolan',
    isTrending: true,
    isPopular: true
  },
  {
    id: 'mov-3',
    title: 'Schaduwrijk: de Apex-jacht',
    tagline: 'Vrees het duister dat terugjaagt.',
    overview: 'Een elite-eenheid huurlingen die wordt uitgezonden naar een niet in kaart gebrachte Arctische onderzoeksbunker ontdekt daar een eeuwenoud biomechanisch roofdier dat in het geheim werd gekweekt.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    rating: 8.4,
    year: 2025,
    duration: '1u 56m',
    genres: ['Actie', 'Horror', 'Thriller'],
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
    cast: ['Karl Urban', 'Frank Grillo', 'Florence Pugh'],
    director: 'Sam Raimi',
    isTrending: true,
    isPopular: false
  },
  {
    id: 'mov-4',
    title: 'Formule Snelheid: Zandvoort 4K',
    tagline: 'Elke milliseconde is een strijd om onsterfelijkheid.',
    overview: 'Snelle documentaire die rivaliserende raceteams volgt die de grenzen van aerodynamica en menselijk uithoudingsvermogen opzoeken in de gevaarlijkste motorsport ter wereld.',
    poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&auto=format&fit=crop&q=80',
    rating: 8.8,
    year: 2026,
    duration: '1u 48m',
    genres: ['Documentaire', 'Sport'],
    quality: '4K',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    cast: ['Lewis Hamilton', 'Max Verstappen', 'Charles Leclerc'],
    director: 'Joseph Kosinski',
    isTrending: true,
    isPopular: true
  },
  {
    id: 'mov-5',
    title: 'De Stille Alpen',
    tagline: 'Eenzaamheid bewaart de dodelijkste geheimen.',
    overview: 'Een eenzame bergmeteoroloog ontdekt grillige seismische signalen die wijzen op een ongekarteerd grottenstelsel met prehistorische vorstorganismen.',
    poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&auto=format&fit=crop&q=80',
    rating: 8.1,
    year: 2025,
    duration: '2u 04m',
    genres: ['Mysterie', 'Thriller'],
    quality: 'FHD',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    cast: ['Mads Mikkelsen', 'Noomi Rapace'],
    director: 'Guillermo del Toro',
    isTrending: false,
    isPopular: true
  }
];

export const MOCK_SERIES: TVSeries[] = [
  {
    id: 'ser-1',
    title: 'De Laatste Grens 2090',
    overview: 'Kolonisten op Europa krijgen te maken met onverklaarbare thermische anomalieën en ondergrondse levensvormen.',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
    rating: 9.1,
    year: 2025,
    seasonsCount: 3,
    episodesCount: 28,
    genres: ['Sci-Fi', 'Drama'],
    quality: '4K',
    isTrending: true
  },
  {
    id: 'ser-2',
    title: 'Onder Nul: Tactisch',
    overview: 'Undercoveragenten ontmantelen hightech wapennetwerken op de zwarte markt.',
    poster: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=500&auto=format&fit=crop&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    rating: 8.7,
    year: 2024,
    seasonsCount: 2,
    episodesCount: 16,
    genres: ['Actie', 'Thriller'],
    quality: '4K',
    isTrending: true
  }
];

// Top 30 Dutch Movie Classics — sourced from the IMDb list ls094196590.
// Titles, years, ratings and poster art come from IMDb; posters are served from
// their CDN with a width transform appended to the base image URL.
export interface DutchFilm {
  imdbId: string;
  rank: number;
  title: string;
  year: number;
  rating: number;
  stars: string;
  poster: string;
}

const imdbPoster = (key: string) =>
  `https://m.media-amazon.com/images/M/${key.replace('._V1_.jpg', '._V1_QL75_UX380_.jpg')}`;

const imdbStill = (key: string) =>
  `https://m.media-amazon.com/images/M/${key.replace('._V1_.jpg', '._V1_QL75_UX1600_.jpg')}`;

export const DUTCH_TOP_FILMS: DutchFilm[] = [
  { imdbId: 'tt0096163', rank: 1, title: 'The Vanishing', year: 1988, rating: 7.6, stars: 'Bernard-Pierre Donnadieu, Gene Bervoets', poster: imdbPoster('MV5BZTdlMmViNGMtMzJmZC00YTJlLTg3MDMtYTFmNWI1MTlkNzU1XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0389557', rank: 2, title: 'Black Book', year: 2006, rating: 7.7, stars: 'Carice van Houten, Sebastian Koch', poster: imdbPoster('MV5BMTIzMjc2ODQ2NV5BMl5BanBnXkFtZTYwODkzNTA3._V1_.jpg') },
  { imdbId: 'tt0076734', rank: 3, title: 'Soldier of Orange', year: 1977, rating: 7.6, stars: 'Rutger Hauer, Jeroen Krabbé', poster: imdbPoster('MV5BODE2MDc0NDEtNzAwZi00MGYyLThlMDUtZDIwYjA0YWM5YWVhXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0795441', rank: 4, title: 'Winter in Wartime', year: 2008, rating: 7.0, stars: 'Martijn Lakemeier, Jamie Campbell Bower', poster: imdbPoster('MV5BMTgyNTk3ODc0Nl5BMl5BanBnXkFtZTcwNDQ0NTMzNA@@._V1_.jpg') },
  { imdbId: 'tt0119448', rank: 5, title: 'Character', year: 1997, rating: 7.6, stars: 'Jan Decleir, Fedja van Huêt', poster: imdbPoster('MV5BYTkwZTVhZmItZDllNy00NzdkLThjMDktN2U2ZTUwYmY1NWU3XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0070842', rank: 6, title: 'Turkish Delight', year: 1973, rating: 7.1, stars: 'Monique van de Ven, Rutger Hauer', poster: imdbPoster('MV5BMDRlZTM2ZTItOGZjOC00YTA3LTkzNmUtYjg3NTg5ZDBkMDE0XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0112379', rank: 7, title: "Antonia's Line", year: 1995, rating: 7.4, stars: 'Willeke van Ammelrooy, Els Dottermans', poster: imdbPoster('MV5BYzAxYmM1YzQtNDhmOS00N2UxLTljNTctOGE0ZDI3NWIxMTYwXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0094651', rank: 8, title: 'Amsterdamned', year: 1988, rating: 6.6, stars: 'Huub Stapel, Monique van de Ven', poster: imdbPoster('MV5BNmU0M2ZmYmYtMDViYi00YjhiLWJkNmEtMzRjYmZiN2ZjM2VhXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0086543', rank: 9, title: 'The 4th Man', year: 1983, rating: 7.1, stars: 'Jeroen Krabbé, Renée Soutendijk', poster: imdbPoster('MV5BYjk2ZTkyYzAtMDcxZS00NTdjLTkyNzgtYTJiZWQyM2MyYzE5XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0322674', rank: 10, title: 'Twin Sisters', year: 2002, rating: 7.4, stars: 'Ellen Vogel, Nadja Uhl', poster: imdbPoster('MV5BMTgyNjcwODg5OV5BMl5BanBnXkFtZTcwMzE1MzMzMQ@@._V1_.jpg') },
  { imdbId: 'tt0087622', rank: 11, title: 'The Lift', year: 1983, rating: 6.1, stars: 'Huub Stapel, Willeke van Ammelrooy', poster: imdbPoster('MV5BMGJhZTliNzktYzFhOC00NGEzLWI3Y2MtZWFjMzk4YzY0YzIzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1846526', rank: 12, title: 'The Heineken Kidnapping', year: 2011, rating: 6.5, stars: 'Rutger Hauer, Reinout Scholten van Aschat', poster: imdbPoster('MV5BMTA0MDc0ODI3NzJeQTJeQWpwZ15BbWU3MDAwMzUwNTc@._V1_.jpg') },
  { imdbId: 'tt0081547', rank: 13, title: 'Spetters', year: 1980, rating: 6.7, stars: 'Hans van Tongeren, Renée Soutendijk', poster: imdbPoster('MV5BMjg1Yjk2ZjctYjkxZS00YjQ5LTk3NTUtZDM3NDJhNjI2ODIwXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0288861', rank: 14, title: 'Godforsaken', year: 2003, rating: 7.1, stars: 'Egbert Jan Weeber, Tygo Gernandt', poster: imdbPoster('MV5BMzE3NjU0MjgtZjAxZC00NWJmLWI3M2ItZDY1Yzc5NTMxYzBlXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0073233', rank: 15, title: 'Katie Tippel', year: 1975, rating: 6.7, stars: 'Monique van de Ven, Rutger Hauer', poster: imdbPoster('MV5BOWUwOWM0YzgtZjBkZS00M2ViLWE0NTUtMTczODlkM2IwYjIzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2114358', rank: 16, title: 'Black Out', year: 2012, rating: 6.4, stars: 'Raymond Thiry, Cahit Ölmez', poster: imdbPoster('MV5BMTQ3MzcyODUwMV5BMl5BanBnXkFtZTgwODM5OTMwMTE@._V1_.jpg') },
  { imdbId: 'tt0116729', rank: 17, title: 'The Dress', year: 1996, rating: 6.9, stars: 'Henri Garcin, Ariane Schluter', poster: imdbPoster('MV5BODJjMmViMzEtZjViYy00ZTU0LTlmNWMtNDk3YzhkM2NjZmYzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0365289', rank: 18, title: 'Grimm', year: 2003, rating: 6.3, stars: 'Halina Reijn, Jacob Derwig', poster: imdbPoster('MV5BNjViNWQ2MDItOWFiOC00ZTJkLWE2OTktNzdmNTE5MTU2YjQ3XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2171875', rank: 19, title: 'Tricked', year: 2012, rating: 6.1, stars: 'Peter Blok, Sallie Harmsen', poster: imdbPoster('MV5BODM2MTE4MDk1MF5BMl5BanBnXkFtZTgwMTQzNjAzMTE@._V1_.jpg') },
  { imdbId: 'tt0067963', rank: 20, title: 'Wat zien ik', year: 1971, rating: 5.8, stars: 'Ronnie Bierman, Sylvia de Leur', poster: imdbPoster('MV5BYTRiNDE0NTAtZTE4Mi00NjEyLThjOTItM2MyMWFmOTM3MDUzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1467061', rank: 21, title: 'Dusk', year: 2010, rating: 6.3, stars: 'Marcel Hensema, Bracha van Doesburgh', poster: imdbPoster('MV5BMjEwNDkwMzQ0Ml5BMl5BanBnXkFtZTcwMTkxMDc4Mw@@._V1_.jpg') },
  { imdbId: 'tt0155810', rank: 22, title: 'Little Tony', year: 1998, rating: 6.9, stars: 'Ariane Schluter, Rutger Hauer', poster: imdbPoster('MV5BMjA5ODQ1MTcxNl5BMl5BanBnXkFtZTcwOTEwODEzMQ@@._V1_.jpg') },
  { imdbId: 'tt0073387', rank: 23, title: 'My Nights with Susan, Olga, Albert, Julie, Piet & Sandra', year: 1975, rating: 5.3, stars: 'Willeke van Ammelrooy, Nelly Frijda', poster: imdbPoster('MV5BMzEyYjgwNjgtODU4MS00YWM1LWI5MTgtOGU0YzNiM2ZkOGQxXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0070072', rank: 24, title: 'Frank & Eva', year: 1973, rating: 5.7, stars: 'Willeke van Ammelrooy, Hugo Metsers', poster: imdbPoster('MV5BNTEzZTQ4OGItNWM2NC00NWNhLWEyOTYtNWE1NmNjYjEyZmIzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0028211', rank: 25, title: 'Rubber', year: 1936, rating: 5.7, stars: 'Lily Bouwmeester, Adolphe Engers', poster: imdbPoster('MV5BYzZmNGRjOTktM2IyMy00YjkwLThhOTAtMDU2NGQyODU2NjVhXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0025060', rank: 26, title: 'Dood water', year: 1934, rating: 6.4, stars: 'Jan van Ees, Marius Spree', poster: imdbPoster('MV5BYjIxY2IzMTAtMzk0My00OWY0LWEyZGYtOTM0NTNkMjA1MDFiXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0025994', rank: 27, title: 'Willem van Oranje', year: 1934, rating: 5.8, stars: 'Cor van der Lugt Melsert, Enny Meunier', poster: imdbPoster('MV5BNmNjNzA3OGYtOWJkYy00OGNkLTk1MDktMjM5YTRmYTBhYzA4XkEyXkFqcGc@._V1_.jpg') },
];

// 100 Most Popular Dutch TV Series — top 30 of the IMDb chart in0000216.
export interface DutchSeries {
  imdbId: string;
  rank: number;
  title: string;
  years: string;
  rating: number | null;
  stars: string;
  poster: string;
}

export const DUTCH_TOP_SERIES: DutchSeries[] = [
  { imdbId: 'tt7263154', rank: 1, title: 'Undercover', years: '2019–2022', rating: 7.8, stars: 'Tom Waes', poster: imdbPoster('MV5BMDlkMjU4OTktNDFmOC00YzA1LWFjNjgtY2Q5MGMxZGQzYjhlXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt21093806', rank: 2, title: 'High Tides', years: '2023–2026', rating: 7.2, stars: 'Pommelien Thijs', poster: imdbPoster('MV5BYTE0OGEzYjUtNDkxYi00NzgxLTgwM2QtZDRjOTI5ZjM4OGZmXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt8810204', rank: 3, title: 'Mocro Maffia', years: '2018–2024', rating: 8.1, stars: 'Robert de Hoog', poster: imdbPoster('MV5BNzBiNzA3ZWUtNjc0NC00MmIxLTgzZDAtMjgxOTQwODVmZmM0XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt36132573', rank: 4, title: 'Oh, Otto!', years: '2025', rating: 7.8, stars: 'Jonathan Michiels', poster: imdbPoster('MV5BNzZmNmZhOTMtN2M3Ni00NjBkLTk1MTQtOWU2NjY4MGM3MGI5XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0096597', rank: 5, title: 'Goede tijden, slechte tijden', years: 'sinds 1990', rating: 3.6, stars: 'Caroline de Bruijn', poster: imdbPoster('MV5BOTdkOTRiZjMtMTgyMi00MDEyLThiM2EtNDE2MjYxMDM3ODc2XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2253780', rank: 6, title: 'In Flanders Field', years: '2014', rating: 7.5, stars: 'Lize Feryn', poster: imdbPoster('MV5BYmZmNTVjZWYtOTNmZi00MzM4LWJmZDItNmU5MDk0ZGViZjJlXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt33367513', rank: 7, title: 'The Hunt', years: '2024', rating: 7.2, stars: 'Eefje Paddenburg', poster: imdbPoster('MV5BZmMwNGJjZGUtMzQ5MS00NjA1LThiZDEtZjAyYzI1Y2RhM2Y5XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt15469192', rank: 8, title: 'Rough Diamonds', years: '2023', rating: 7.1, stars: 'Kevin Janssens', poster: imdbPoster('MV5BYzhmMWRlYzktNmQyMS00Njk0LWI4MjYtMDZhNDY4OTIyNGExXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt23739022', rank: 9, title: 'Sleepers', years: 'sinds 2022', rating: 7.7, stars: 'Robert de Hoog', poster: imdbPoster('MV5BNjc0YzM3MDQtOWJmNi00ZjE4LWEwMWEtZDRjNjJhNzUxYjA1XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt21034398', rank: 10, title: 'Ongezellig', years: '2018–2022', rating: 8.7, stars: 'Robin Barten', poster: imdbPoster('MV5BNGYyMzZmM2MtM2ZmYi00ZWI2LTg4MDctMzcwZmYwNWFhN2U4XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt28466970', rank: 11, title: 'Ferry: The Series', years: 'sinds 2023', rating: 7.7, stars: 'Frank Lammers', poster: imdbPoster('MV5BNjQ1NDg2ZjAtNzYzZi00NmYwLWE0MDgtYmUwZjM2M2IwNmM3XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt5197860', rank: 12, title: 'Tabula Rasa', years: '2017', rating: 7.9, stars: 'Veerle Baetens', poster: imdbPoster('MV5BNTA1NzgxY2MtMzljNi00OTVhLTkyNTYtMDViMTNhMTJiNmZmXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0286336', rank: 13, title: 'The Animals of Farthing Wood', years: '1993–1995', rating: 8.3, stars: 'Ron Moody', poster: imdbPoster('MV5BMjI3MWIxNDUtNzkzNS00YTdhLWIzODEtMzU0Yjk1ZjQxOWQ0XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0477217', rank: 14, title: 'Gooische vrouwen', years: '2005–2025', rating: 7.4, stars: 'Linda de Mol', poster: imdbPoster('MV5BMWM0MGFhMzUtYmI4Ny00ZjczLThlZTAtZGY5NGM3Y2IxOTJlXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt38454816', rank: 15, title: 'Tonnano', years: '2025', rating: 6.7, stars: 'Khalid Alterch', poster: imdbPoster('MV5BMzlkYjNjM2UtZWY0OC00MTA1LWFmMTYtNGIwNWEzZGVmNjhjXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt39168271', rank: 16, title: 'Grand Hotel aan Zee', years: '2026', rating: null, stars: 'Thekla Reuten', poster: imdbPoster('MV5BZGZjZDU5NTAtYjhlNy00YjAwLTkzY2EtYTA1ODFiM2JkY2I3XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt35067773', rank: 17, title: 'Holy Sh!t', years: 'sinds 2025', rating: 7.8, stars: 'Mona Mina Leon', poster: imdbPoster('MV5BNDM5YjUzOGEtYjZmMC00MzI2LWEzMWEtNTM3M2IxZDVmMTQ5XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0063897', rank: 18, title: 'Floris', years: '1969', rating: 7.9, stars: 'Rutger Hauer', poster: imdbPoster('MV5BNGY3Y2M1NTAtMjQwNS00OTg5LWFjOGQtMDM3YWFlNGUyZTA1XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt22399148', rank: 19, title: 'Season of Sex', years: 'sinds 2022', rating: 6.3, stars: 'Maïmouna Badjie', poster: imdbPoster('MV5BMzU0NmUzOWItZGE4Yi00OTIxLWE1NmEtMGE3OGI3Mjk5ZGE4XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt10540338', rank: 20, title: 'De Joodse Raad', years: '2024', rating: 8.2, stars: 'Pierre Bokma', poster: imdbPoster('MV5BNjRjMDJjYWUtOTUwZS00NzhiLTkxNDgtY2Y0Mzc3NDk1NDUzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0149469', rank: 21, title: 'Heterdaad', years: '1996–1999', rating: 7.3, stars: 'Gilda De Bal', poster: imdbPoster('MV5BYjBhZDg0MzktMTE5ZS00NzZiLWEwZDMtYzhmZWM1YzJiNDMxXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0149468', rank: 22, title: 'Herenstraat 10', years: '1983–1984', rating: 7.1, stars: 'Ellen Vogel', poster: imdbPoster('MV5BNmU3MzgxM2QtYjdiMS00Mjg1LWIyNzMtMjcwNTA0NWRhYzdiXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt38141577', rank: 23, title: 'Kees Flodder', years: '2026', rating: 5.3, stars: 'Tatjana Simic', poster: imdbPoster('MV5BY2VhY2Q5OTctMzk1Zi00ZGE0LTgyNzQtNTg5OTcwZDAwMzZlXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt32307068', rank: 24, title: 'Roosters', years: 'sinds 2025', rating: 6.9, stars: 'Jeroen Spitzenberger', poster: imdbPoster('MV5BMTQzMDliMTktNDhjZi00YzhjLWFkYjYtYTA2ZDY5NzM1ZjVjXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt12258686', rank: 25, title: 'Dertigers', years: '2020–2026', rating: 7.8, stars: 'Wieger Windhorst', poster: imdbPoster('MV5BYzI2ZTFlYzYtOTU1Zi00ZWQ4LTllYmItYjRmNGZiZTNmZjM3XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt31835154', rank: 26, title: 'Amsterdam Empire', years: 'sinds 2025', rating: 6.7, stars: 'Famke Janssen', poster: imdbPoster('MV5BYWQ0ZTMyNTctYjkyZS00NmE4LWFiZTItYzkzZWY1ZmJhNjA5XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt13018574', rank: 27, title: 'Two Summers', years: '2022', rating: 6.8, stars: 'An Miller', poster: imdbPoster('MV5BMzliNGFkMjAtNjJiYi00YmNiLWIxN2YtYjY4NmQ0MTljNDFiXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0379609', rank: 28, title: 'Aspe', years: '2004–2014', rating: 6.8, stars: 'Herbert Flack', poster: imdbPoster('MV5BNGZlNGZiM2YtZDMyYi00NDE2LWI3N2QtODI4NDcwYjQ1NGRjXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt39387604', rank: 29, title: 'Blind Sherlock', years: '2026', rating: 6.5, stars: 'Bart Kelchtermans', poster: imdbPoster('MV5BNWNlZTU1NDctNDU1Ni00ODkxLWI3YjAtMTQyMzhjNzU4NTBmXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1854489', rank: 30, title: 'Purno de Purno', years: '1992–2007', rating: 7.3, stars: 'Theo Wesselo', poster: imdbPoster('MV5BZWQ4OWM5YmMtMzMxNi00MWRiLTkzNzEtNWNjZDJhY2VkOGVjXkEyXkFqcGc@._V1_.jpg') },
];

// IMDb Top 250 TV — the chart's top 30, scraped from imdb.com/chart/toptv.
export const IMDB_TOP_SERIES: DutchSeries[] = [
  { imdbId: 'tt0903747', rank: 1, title: 'Breaking Bad', years: '2008–2013', rating: 9.5, stars: 'Bryan Cranston', poster: imdbPoster('MV5BOWE4NTc3YmYtNmU2Mi00ZjhkLWE1MTItZmM1M2U1ODU3YjFlXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt5491994', rank: 2, title: 'Planet Earth II', years: '2016', rating: 9.4, stars: 'David Attenborough', poster: imdbPoster('MV5BMzY4NDBkMWYtYzdkYy00YzBjLWJmODctMWM4YjYzZTdjNWE5XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0795176', rank: 3, title: 'Planet Earth', years: '2006', rating: 9.4, stars: 'Sigourney Weaver', poster: imdbPoster('MV5BY2NjNDUzOTgtMDFmNC00ZGQ4LWE5MDctMzczNGVlOGU1N2MyXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0185906', rank: 4, title: 'Band of Brothers', years: '2001', rating: 9.4, stars: 'Scott Grimes', poster: imdbPoster('MV5BYjdlNGJlYjQtMDU2Mi00ZjA1LWEwYzgtYzlmNDM5MmE1ZGUwXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt7366338', rank: 5, title: 'Chernobyl', years: '2019', rating: 9.3, stars: 'Jared Harris', poster: imdbPoster('MV5BNzU0OTI4YTQtNGQ1ZS00ZjA4LTg3MTMtZjkyZWNjN2RiZDJmXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0306414', rank: 6, title: 'The Wire', years: '2002–2008', rating: 9.3, stars: 'Dominic West', poster: imdbPoster('MV5BYjIxZTMwZmUtOTUzYS00YmU2LWJhNDAtNzA2NDg0NDA0MjVkXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0417299', rank: 7, title: 'Avatar: The Last Airbender', years: '2005–2008', rating: 9.3, stars: 'Dee Bradley Baker', poster: imdbPoster('MV5BMDMwMThjYWYtY2Q2OS00OGM2LTlkODQtNDJlZTZmMjAyYmFhXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0141842', rank: 8, title: 'The Sopranos', years: '1999–2007', rating: 9.2, stars: 'James Gandolfini', poster: imdbPoster('MV5BZjYwNWQwOTMtMzYwOS00NTcxLWFhNTYtNGQ4YjdmYTcyNDFkXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt6769208', rank: 9, title: 'Blue Planet II', years: '2017', rating: 9.3, stars: 'David Attenborough', poster: imdbPoster('MV5BNmUwYThjM2UtNTg1Yy00MzRlLThhMmYtNjlmOWU0ZmQxZDA3XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2395695', rank: 10, title: 'Cosmos: A Spacetime Odyssey', years: '2014', rating: 9.2, stars: 'Neil deGrasse Tyson', poster: imdbPoster('MV5BYTRlMzk0NzctNTI3Ni00N2E2LWJiNGMtMDdlNjk1YWNmMzkyXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0081846', rank: 11, title: 'Cosmos', years: '1980', rating: 9.3, stars: 'Carl Sagan', poster: imdbPoster('MV5BOTA5MWFhMzAtOWU1OS00Yjk4LTlkNGItNGI3N2VkNzcyNGU2XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt9253866', rank: 12, title: 'Our Planet', years: '2019–2023', rating: 9.2, stars: 'David Attenborough', poster: imdbPoster('MV5BZDE1NzlkNWMtNzFiMC00ZTgxLTgyMmItOTU5OGI2NWQ4MDMxXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0944947', rank: 13, title: 'Game of Thrones', years: '2011–2019', rating: 9.2, stars: 'Emilia Clarke', poster: imdbPoster('MV5BNGYxOGJkMjItZjVkZC00OGEzLWExNjktOTZmNGZhZmRlMTk2XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt7678620', rank: 14, title: 'Bluey', years: 'sinds 2018', rating: 9.3, stars: 'David McCormack', poster: imdbPoster('MV5BYWU1YmQzMjEtMDNjOS00MGIyLWExY2ItZDAzNmU5NWViMGZmXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0071075', rank: 15, title: 'The World at War', years: '1973–1974', rating: 9.2, stars: 'Laurence Olivier', poster: imdbPoster('MV5BM2I1OGUyNmYtZmNiOC00OGQ4LWFlNDEtYTM5ZTAxMDI4ZmMyXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2560140', rank: 16, title: 'Attack on Titan', years: '2013–2023', rating: 9.1, stars: 'Jessie James Grelle', poster: imdbPoster('MV5BZjliODY5MzQtMmViZC00MTZmLWFhMWMtMjMwM2I3OGY1MTRiXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1355642', rank: 17, title: 'Fullmetal Alchemist: Brotherhood', years: '2009–2010', rating: 9.1, stars: 'Kent Williams', poster: imdbPoster('MV5BMzNiODA5NjYtYWExZS00OTc4LTg3N2ItYWYwYTUyYmM5MWViXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1533395', rank: 18, title: 'Life', years: '2009', rating: 9.1, stars: 'Oprah Winfrey', poster: imdbPoster('MV5BZDJjMzJiMTktMWZkZi00YWY0LWJjNGUtY2ZmNTFlOThhZTA4XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt8420184', rank: 19, title: 'The Last Dance', years: '2020', rating: 9.0, stars: 'Michael Jordan', poster: imdbPoster('MV5BOTQyYmQ1N2UtYjFkNS00NzgyLTk5YTUtYjExMDdjOTA3MGU2XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0052520', rank: 20, title: 'The Twilight Zone', years: '1959–1964', rating: 9.0, stars: 'Rod Serling', poster: imdbPoster('MV5BYjkyZmRmYmMtYTg5Zi00MjA0LTliYmQtMDU0NzBiZDcxNzA0XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1877514', rank: 21, title: 'The Vietnam War', years: '2017', rating: 9.1, stars: 'Peter Coyote', poster: imdbPoster('MV5BYTQ1ZWYzMmQtNWU5OC00YWY0LTkyMWMtMTU0NjYxMjJkMmNjXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2861424', rank: 22, title: 'Rick and Morty', years: 'sinds 2013', rating: 9.0, stars: 'Chris Parnell', poster: imdbPoster('MV5BZGQyZjk2MzMtMTcyNC00NGU3LTlmNjItNDExMWM4ZDFhYmQ2XkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt1475582', rank: 23, title: 'Sherlock', years: '2010–2017', rating: 9.0, stars: 'Benedict Cumberbatch', poster: imdbPoster('MV5BMjRhZDdjMDYtMTg5Yy00NGI4LWI3ZDgtYjNkNDc4MzJkNDRjXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0103359', rank: 24, title: 'Batman: The Animated Series', years: '1992–1995', rating: 9.0, stars: 'Kevin Conroy', poster: imdbPoster('MV5BYjgwZWUzMzUtYTFkNi00MzM0LWFkMWUtMDViMjMxNGIxNDUxXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt3032476', rank: 25, title: 'Better Call Saul', years: '2015–2022', rating: 9.0, stars: 'Bob Odenkirk', poster: imdbPoster('MV5BMTAxOTQ0MjUzMzJeQTJeQWpwZ15BbWU4MDY0NTAxNzMx._V1_.jpg') },
  { imdbId: 'tt0386676', rank: 26, title: 'The Office', years: '2005–2013', rating: 9.0, stars: 'Steve Carell', poster: imdbPoster('MV5BZjQwYzBlYzUtZjhhOS00ZDQ0LWE0NzAtYTk4MjgzZTNkZWEzXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt11126994', rank: 27, title: 'Arcane', years: '2021–2024', rating: 9.0, stars: 'Kevin Alejandro', poster: imdbPoster('MV5BYjA2NzhlMDItNWRmZC00MzRjLWE3ZjAtZjBlZDAwOWY2ODdjXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt0296310', rank: 28, title: 'The Blue Planet', years: '2001', rating: 9.0, stars: 'David Attenborough', poster: imdbPoster('MV5BYjgyODJmY2YtZTk4Yy00MjBlLWFlM2YtNDIyMDk5YmQxMTllXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt10541088', rank: 29, title: "Clarkson's Farm", years: 'sinds 2021', rating: 9.0, stars: 'Jeremy Clarkson', poster: imdbPoster('MV5BNzA1Yzk0NzEtMmQwNi00ZmQyLWFmYTUtM2NjYjBkMGE3NDRkXkEyXkFqcGc@._V1_.jpg') },
  { imdbId: 'tt2098220', rank: 30, title: 'Hunter X Hunter', years: '2011–2014', rating: 9.0, stars: 'Issei Futamata', poster: imdbPoster('MV5BYzYxOTlkYzctNGY2MC00MjNjLWIxOWMtY2QwYjcxZWIwMmEwXkEyXkFqcGc@._V1_.jpg') },
];

// Hero rotation — the top of IMDb's Top 250, with real facts and real poster art.
// No synopsis: IMDb only serves one in the visitor's locale, and inventing a
// Dutch one for a real film would be making things up.
export interface FeaturedFilm {
  imdbId: string;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  director: string;
  cast: string[];
  poster: string;
  /** Real landscape still from the film, used as the hero background. */
  backdrop: string;
  streamUrl: string;
}

const SAMPLE_STREAMS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
];

export const FEATURED_FILMS: FeaturedFilm[] = ([
  {
    imdbId: 'tt0111161',
    title: 'The Shawshank Redemption',
    year: 1994,
    rating: 9.3,
    duration: '2u 22m',
    genres: ['Drama'],
    director: 'Frank Darabont',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    poster: imdbPoster('MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg'),
    backdrop: imdbStill('MV5BMTk3NDE2Nzg3Nl5BMl5BanBnXkFtZTcwNTMxNDY3Mw@@._V1_.jpg'),
  },
  {
    imdbId: 'tt0068646',
    title: 'The Godfather',
    year: 1972,
    rating: 9.2,
    duration: '2u 55m',
    genres: ['Misdaad', 'Drama'],
    director: 'Francis Ford Coppola',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    poster: imdbPoster('MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_.jpg'),
    backdrop: imdbStill('MV5BMTgwNmEzNWUtOTFmYy00OTY5LTk3M2ItZDIwZTNkMDhjYjBiXkEyXkFqcGc@._V1_.jpg'),
  },
  {
    imdbId: 'tt0468569',
    title: 'The Dark Knight',
    year: 2008,
    rating: 9.1,
    duration: '2u 32m',
    genres: ['Misdaad', 'Thriller'],
    director: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    poster: imdbPoster('MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg'),
    backdrop: imdbStill('MV5BMjA5ODU3NTI0Ml5BMl5BanBnXkFtZTcwODczMTk2Mw@@._V1_.jpg'),
  },
  {
    imdbId: 'tt0071562',
    title: 'The Godfather Part II',
    year: 1974,
    rating: 9,
    duration: '3u 22m',
    genres: ['Misdaad', 'Drama'],
    director: 'Francis Ford Coppola',
    cast: ['Al Pacino', 'Robert De Niro', 'Robert Duvall'],
    poster: imdbPoster('MV5BMDIxMzBlZDktZjMxNy00ZGI4LTgxNDEtYWRlNzRjMjJmOGQ1XkEyXkFqcGc@._V1_.jpg'),
    backdrop: imdbStill('MV5BNDI0Mzg1MDA4NF5BMl5BanBnXkFtZTgwMTM4NjIwMjE@._V1_.jpg'),
  },
  {
    imdbId: 'tt0167260',
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
    rating: 9,
    duration: '3u 21m',
    genres: ['Avontuur', 'Drama', 'Fantasy'],
    director: 'Peter Jackson',
    cast: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen'],
    poster: imdbPoster('MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_.jpg'),
    backdrop: imdbStill('MV5BMTk1ODY0NDg2M15BMl5BanBnXkFtZTcwNTU2MTk2Mw@@._V1_.jpg'),
  },
  {
    imdbId: 'tt0050083',
    title: '12 Angry Men',
    year: 1957,
    rating: 9,
    duration: '1u 36m',
    genres: ['Misdaad', 'Drama'],
    director: 'Sidney Lumet',
    cast: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
    poster: imdbPoster('MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_.jpg'),
    backdrop: imdbStill('MV5BNGRlZjVhNWMtOTUxYi00MTYxLWEzOWUtMTM1NDc3ZWRjMDZjXkEyXkFqcGdeQWRpZWdtb25n._V1_.jpg'),
  },
] as Omit<FeaturedFilm, 'streamUrl'>[]).map((film, i) => ({
  ...film,
  streamUrl: SAMPLE_STREAMS[i % SAMPLE_STREAMS.length],
}));
