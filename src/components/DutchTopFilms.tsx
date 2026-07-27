import React from 'react';
import { Film } from 'lucide-react';
import { DUTCH_TOP_FILMS } from '../data/mockData';
import { PosterMarquee } from './PosterMarquee';

export const DutchTopFilms: React.FC = () => (
  <PosterMarquee
    title="Topfilms uit Nederland"
    description={`${DUTCH_TOP_FILMS.length} Nederlandse filmklassiekers, hoog gewaardeerd door kijkers`}
    icon={Film}
    durationSeconds={120}
    items={DUTCH_TOP_FILMS.map((film) => ({
      imdbId: film.imdbId,
      title: film.title,
      subtitle: `${film.year} • ${film.stars.split(', ')[0]}`,
      poster: film.poster
    }))}
  />
);
