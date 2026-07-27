import React from 'react';
import { Trophy } from 'lucide-react';
import { IMDB_TOP_SERIES } from '../data/mockData';
import { PosterMarquee } from './PosterMarquee';

export const ImdbTopSeries: React.FC = () => (
  <PosterMarquee
    title="Best beoordeelde series ter wereld"
    description={`De ${IMDB_TOP_SERIES.length} hoogst gewaardeerde series aller tijden`}
    icon={Trophy}
    durationSeconds={130}
    items={IMDB_TOP_SERIES.map((serie) => ({
      imdbId: serie.imdbId,
      title: serie.title,
      subtitle: `${serie.years} • ${serie.stars}`,
      poster: serie.poster
    }))}
  />
);
