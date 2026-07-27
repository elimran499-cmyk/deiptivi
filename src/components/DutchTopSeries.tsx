import React from 'react';
import { Tv } from 'lucide-react';
import { DUTCH_TOP_SERIES } from '../data/mockData';
import { PosterMarquee } from './PosterMarquee';

export const DutchTopSeries: React.FC = () => (
  <PosterMarquee
    title="Populairste Nederlandse series"
    description={`De ${DUTCH_TOP_SERIES.length} best bekeken Nederlandse en Vlaamse series`}
    icon={Tv}
    durationSeconds={130}
    direction="right"
    items={DUTCH_TOP_SERIES.map((serie) => ({
      imdbId: serie.imdbId,
      title: serie.title,
      subtitle: `${serie.years} • ${serie.stars}`,
      poster: serie.poster
    }))}
  />
);
