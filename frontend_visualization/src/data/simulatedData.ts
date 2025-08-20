import { Bus, Route, Stop } from '../types';
import { COLORS } from '../theme';

const stopsA: Stop[] = [
  { id: 'A1', name: 'Main Gate', lat: 12.971, lng: 77.593 },
  { id: 'A2', name: 'Library', lat: 12.972, lng: 77.596 },
  { id: 'A3', name: 'Hostel Block', lat: 12.974, lng: 77.6 },
  { id: 'A4', name: 'Sports Complex', lat: 12.975, lng: 77.604 },
];

const stopsB: Stop[] = [
  { id: 'B1', name: 'South Gate', lat: 12.969, lng: 77.59 },
  { id: 'B2', name: 'Auditorium', lat: 12.97, lng: 77.595 },
  { id: 'B3', name: 'Cafeteria', lat: 12.9715, lng: 77.5995 },
  { id: 'B4', name: 'Tech Park', lat: 12.973, lng: 77.605 },
];

export const ROUTES: Route[] = [
  {
    id: 'R1',
    name: 'Campus Loop A',
    color: COLORS.secondary,
    stops: stopsA,
    segments: [
      { fromStopId: 'A1', toStopId: 'A2', distanceKm: 0.5, typicalDurationMin: 3 },
      { fromStopId: 'A2', toStopId: 'A3', distanceKm: 0.7, typicalDurationMin: 4 },
      { fromStopId: 'A3', toStopId: 'A4', distanceKm: 0.8, typicalDurationMin: 5 },
      { fromStopId: 'A4', toStopId: 'A1', distanceKm: 1.0, typicalDurationMin: 6 },
    ],
  },
  {
    id: 'R2',
    name: 'Campus Loop B',
    color: COLORS.primary,
    stops: stopsB,
    segments: [
      { fromStopId: 'B1', toStopId: 'B2', distanceKm: 0.6, typicalDurationMin: 3 },
      { fromStopId: 'B2', toStopId: 'B3', distanceKm: 0.6, typicalDurationMin: 4 },
      { fromStopId: 'B3', toStopId: 'B4', distanceKm: 1.2, typicalDurationMin: 6 },
      { fromStopId: 'B4', toStopId: 'B1', distanceKm: 1.4, typicalDurationMin: 7 },
    ],
  },
];

export const INITIAL_BUSES: Bus[] = [
  { id: 'Bus-01', name: 'Bus 01', routeId: 'R1', capacity: 40, occupancy: 0.35, status: 'on-time', currentStopIndex: 0, progressBetweenStops: 0, speedKmh: 18 },
  { id: 'Bus-02', name: 'Bus 02', routeId: 'R2', capacity: 40, occupancy: 0.8, status: 'delayed', currentStopIndex: 1, progressBetweenStops: 0.25, speedKmh: 16 },
];

export function simulateTick(prev: Bus[], dtSeconds: number): Bus[] {
  // naive loop progression for demo
  return prev.map((b) => {
    const route = ROUTES.find((r) => r.id === b.routeId);
    if (!route) return b;
    const nextSegIndex = b.currentStopIndex % route.segments.length;
    const seg = route.segments[nextSegIndex];
    const typicalSec = seg.typicalDurationMin * 60;
    const delta = dtSeconds / typicalSec;

    let progress = b.progressBetweenStops + delta;
    let currentStopIndex = b.currentStopIndex;
    if (progress >= 1) {
      progress = progress - 1;
      currentStopIndex = (currentStopIndex + 1) % route.stops.length;
    }

    // random-ish occupancy sway
    const occ = Math.max(0, Math.min(1, b.occupancy + (Math.sin(Date.now() / 5000 + Number(b.id.replace(/\D/g, ''))) * 0.002)));

    // status based on occupancy and a small oscillation
    const t = Date.now() / 10000;
    const delayedOsc = Math.sin(t + nextSegIndex) > 0.8;
    const status: Bus['status'] = delayedOsc ? 'delayed' : occ > 0.85 ? 'ahead' : 'on-time';

    return {
      ...b,
      progressBetweenStops: progress,
      currentStopIndex,
      occupancy: occ,
      status,
    };
  });
}
