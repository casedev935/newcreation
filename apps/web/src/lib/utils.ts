import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYearColor(year?: string | null) {
  switch (year?.toUpperCase()) {
    case 'A': return 'bg-[#10B981]'; // Emerald/Green
    case 'B': return 'bg-[#3B82F6]'; // Blue
    case 'C': return 'bg-[#F59E0B]'; // Amber/Orange
    case 'ABC': return 'bg-[#8B5CF6]'; // Purple
    default: return 'bg-primary'; // Red fallback
  }
}

export function getSeasonColor(season?: string | null) {
  if (!season) return 'bg-black';
  const s = season.toLowerCase();
  if (s.includes('advent')) return 'bg-[#7C3AED]'; // Purple
  if (s.includes('lent')) return 'bg-[#6D28D9]'; // Dark Purple
  if (s.includes('easter')) return 'bg-[#EAB308]'; // Gold/Yellow
  if (s.includes('ordinary') || s.includes('ot')) return 'bg-[#059669]'; // Green
  if (s.includes('christmas')) return 'bg-[#38BDF8]'; // Sky Blue
  if (s.includes('friday') || s.includes('maundy') || s.includes('palm')) return 'bg-[#DC2626]'; // Red
  return 'bg-black'; // Default
}

export function getPassageColor(passage?: string | null) {
  if (!passage) return 'bg-black';
  const p = passage.toLowerCase();
  if (p.includes('matthew')) return 'bg-[#E11D48]'; // Rose
  if (p.includes('mark')) return 'bg-[#F97316]'; // Orange
  if (p.includes('luke')) return 'bg-[#84CC16]'; // Lime
  if (p.includes('john')) return 'bg-[#0EA5E9]'; // Sky
  return 'bg-black'; // Default
}
