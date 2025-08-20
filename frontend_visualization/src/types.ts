export type Stop = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export type RouteSegment = {
  fromStopId: string;
  toStopId: string;
  distanceKm: number;
  typicalDurationMin: number;
};

export type Route = {
  id: string;
  name: string;
  color?: string;
  stops: Stop[];
  segments: RouteSegment[];
};

export type Bus = {
  id: string;
  name: string;
  routeId: string;
  capacity: number;
  occupancy: number; // 0..1
  status: 'on-time' | 'delayed' | 'ahead';
  currentStopIndex: number; // index into route.stops
  progressBetweenStops: number; // 0..1 progress along segment
  speedKmh: number;
};

export type LiveBusFrame = {
  timestamp: number;
  buses: Bus[];
};

export type DashboardStats = {
  utilization: number; // 0..1
  passengerFlowPerHour: number[];
  onTimePerformance: number; // 0..1
};

export type ExportFormat = 'mp4' | 'gif';
