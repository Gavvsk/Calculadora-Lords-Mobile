import type { SpeedupDenomination } from './types.ts';

export const ACCELERATORS: { id: SpeedupDenomination; label: string; value: number }[] = [
  { id: 'm1', label: '1m', value: 1 },
  { id: 'm3', label: '3m', value: 3 },
  { id: 'm5', label: '5m', value: 5 },
  { id: 'm10', label: '10m', value: 10 },
  { id: 'm15', label: '15m', value: 15 },
  { id: 'm30', label: '30m', value: 30 },
  { id: 'm60', label: '60m', value: 60 },
  { id: 'h3', label: '3h', value: 3 * 60 },
  { id: 'h8', label: '8h', value: 8 * 60 },
  { id: 'h15', label: '15h', value: 15 * 60 },
  { id: 'h24', label: '24h', value: 24 * 60 },
  { id: 'd3', label: '3d', value: 3 * 24 * 60 },
  { id: 'd7', label: '7d', value: 7 * 24 * 60 },
  { id: 'd30', label: '30d', value: 30 * 24 * 60 },
];