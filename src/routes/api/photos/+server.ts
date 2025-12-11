import { json } from '@sveltejs/kit';
import { fetchRepositoryPhotos } from '$lib/photo-scraper';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const offset = url.searchParams.get('offset') ?? '0';

  const data = await fetchRepositoryPhotos(offset);
  
  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  });
};