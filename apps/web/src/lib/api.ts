import axios from 'axios';

// The Backend API URL
// Use internal network when on server, and public URL when on client
const API_URL = (typeof window === 'undefined' ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
});

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Homily {
  id: string;
  title: string;
  datePublished?: string;
  liturgicalYear?: string;
  liturgicalSeason?: string;
  biblePassage?: string;
  slug: string;
  content?: string;
  videoLink?: string;
}

export async function fetchHomilies(search: string = '', page: number = 1, year: string = ''): Promise<PaginatedResponse<Homily>> {
  const { data } = await api.get<PaginatedResponse<Homily>>('/homilies', {
    params: { search, page, limit: 1000, year: year || undefined },
  });
  return data;
}

export async function fetchHomily(slug: string): Promise<Homily> {
  const { data } = await api.get<Homily>(`/homilies/${slug}`);
  return data;
}
