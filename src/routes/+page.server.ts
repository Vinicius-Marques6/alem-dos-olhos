import { fetchRepositoryPhotos } from '$lib/photo-scraper';
import highlightsData from '$lib/data/highlights.json';

export const load = async () => {
  const photos = await fetchRepositoryPhotos('0');

  return {
    highlights: highlightsData,
    photos: photos
  };
};