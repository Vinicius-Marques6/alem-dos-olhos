import { writable } from 'svelte/store';

export interface Photo {
  id: string;
  url: string;
  title: string;
  creator: string;
}

export const selectedPhoto = writable<Photo | null>(null);