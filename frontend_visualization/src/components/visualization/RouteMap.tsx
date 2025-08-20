import React from 'react';
import { getTheme, COLORS } from '../../theme';
import { Bus, Route, Stop } from '../../types';



// simple lat/lng -> x/y projector onto a given box
function createProjector(stops: Stop[], width: number, height: number) {
  const lats = stops.map((s) => s.lat);
  const lngs = stops.map((s) => s.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const pad = 0.05; // padding around edges
  const latSpan = (maxLat - minLat) || 1;
  const lngSpan = (maxLng - minLng) || 1;

  return (lat: number, lng: number) => {
    const x = ((lng - minLng) / lngSpan) * (1 - 2 * pad) * width + pad * width;
    const y = (1 - (lat - minLat) / latSpan) * (1 - 2 * pad) * height + pad * height;
    return { x, y };
  };
}

const Grid: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const theme = getTheme();
  const step = 40;
  const lines = [];
  for (let x = 0; x < width; x += step) lines.push(<line key={`vx-${x}`} x1={x} y1={0} x2={x} y2={height} stroke={theme.grid} strokeWidth={1} />);
  for (let y = 0; y < height; y += step) lines.push(<line key={`hz-${y}`} x1={0} y1={y} x2={width} y2={y} stroke={theme.grid} strokeWidth={1} />);
  return <g>{lines}</g>;
};

const RoutePath: React.FC<{ route: Route; project: (lat: number, lng: number) => { x: number; y: number } }> = ({ route, project }) => {
  const points = route.stops.map((s) => project(s.lat, s.lng));
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const color = route.color || COLORS.secondary;
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
    </g>
  );
};

const StopDot: React.FC<{ stop: Stop; x: number; y: number }> = ({ stop, x, y }) => {
  const theme = getTheme();
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill={theme.panel} stroke={theme.secondary} strokeWidth={2} />
      <text x={x + 8} y={y - 8} fontSize={10} fill={theme.text}>
        {stop.name}
      </text>
    </g>
  );
};

const BusMarker: React.FC<{ busName: string; x: number; y: number; occupancy: number; status: 'on-time' | 'delayed' | 'ahead' }> = ({
  busName,
  x,
  y,
  occupancy,
  status,
}) => {
  const theme = getTheme();
  const fill =
    status === 'delayed' ? theme.warning : status === 'ahead' ? theme.success : theme.secondary;
  return (
    <g>
      <circle cx={x} cy={y} r={10} fill={fill} stroke={theme.border} strokeWidth={2} />
      <text x={x + 14} y={y + 4} fontSize={11} fill={theme.text}>
        {busName} • {(occupancy * 100).toFixed(0)}%
      </text>
    </g>
  );
};

const Legend: React.FC = () => {
  const theme = getTheme();
  const item = (color: string, label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ width: 12, height: 12, background: color, borderRadius: 3, display: 'inline-block', border: `1px solid ${theme.border}` }} />
      <span style={{ fontSize: 12, color: theme.mutedText }}>{label}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {item(theme.success, 'Ahead')}
      {item(theme.secondary, 'On-time')}
      {item(theme.warning, 'Delayed')}
    </div>
  );
};

// PUBLIC_INTERFACE
export const RouteMap: React.FC<{ width: number; height: number; routes: Route[]; buses: (Bus & { x?: number; y?: number })[] }> = ({
  width,
  height,
  routes,
  buses,
}) => {
  /** SVG-based simple campus map with grid, route polylines, stops and bus markers. */
  const theme = getTheme();
  // gather all stops for projection
  const allStops: Stop[] = Array.from(new Set(routes.flatMap((r) => r.stops)));
  const project = createProjector(allStops, width, height);

  // Place buses along their current segment
  const placedBuses = buses.map((b) => {
    const route = routes.find((r) => r.id === b.routeId);
    if (!route) return { ...b, x: 0, y: 0 };
    const i = b.currentStopIndex % route.stops.length;
    const j = (i + 1) % route.stops.length;
    const a = project(route.stops[i].lat, route.stops[i].lng);
    const d = project(route.stops[j].lat, route.stops[j].lng);
    const x = a.x + (d.x - a.x) * b.progressBetweenStops;
    const y = a.y + (d.y - a.y) * b.progressBetweenStops;
    return { ...b, x, y };
  });

  return (
    <div style={{ position: 'relative' }}>
      <svg width={width} height={height} style={{ background: theme.surface, borderRadius: 12, display: 'block' }}>
        <Grid width={width} height={height} />
        {routes.map((r) => (
          <RoutePath key={r.id} route={r} project={project} />
        ))}
        {routes.flatMap((r) =>
          r.stops.map((s) => {
            const p = project(s.lat, s.lng);
            return <StopDot key={s.id} stop={s} x={p.x} y={p.y} />;
          }),
        )}
        {placedBuses.map((b) => (
          <BusMarker key={b.id} busName={b.name} x={b.x!} y={b.y!} occupancy={b.occupancy} status={b.status} />
        ))}
      </svg>
      <div style={{ position: 'absolute', right: 8, bottom: 8, background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 8, padding: '6px 8px', boxShadow: theme.shadow }}>
        <Legend />
      </div>
    </div>
  );
};
