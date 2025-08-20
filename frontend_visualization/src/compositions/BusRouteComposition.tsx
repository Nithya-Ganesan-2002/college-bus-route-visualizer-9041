import React, { useMemo } from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { RouteMap } from '../components/visualization/RouteMap';
import { Bus, Route } from '../types';
import { getTheme } from '../theme';

type Props = {
  buses: Bus[];
  routes: Route[];
  colors: { primary: string; secondary: string; accent: string };
};

// PUBLIC_INTERFACE
export const BusRouteComposition: React.FC<Props> = ({ buses, routes }) => {
  /** Remotion composition that renders bus routes and moving buses for export or in-UI preview. */
  const theme = getTheme();
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // simple fade in/out
  const opacity = interpolate(frame, [0, 15, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Freeze bus positions - for exported render, external logic should inject frame-based positions.
  const busesForFrame = useMemo(() => buses, [buses]);

  return (
    <AbsoluteFill style={{ backgroundColor: theme.background, opacity }}>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: theme.text }}>Campus Bus Visualization</h2>
          <div style={{ padding: '4px 10px', borderRadius: 999, background: theme.surface, border: `1px solid ${theme.border}`, color: theme.mutedText, fontSize: 12 }}>
            Frame {frame}
          </div>
        </div>
        <RouteMap width={1280} height={640} routes={routes} buses={busesForFrame} />
      </div>
    </AbsoluteFill>
  );
};
