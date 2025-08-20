import React from 'react';
import { getTheme, COLORS } from '../theme';
import { Bus, Route } from '../types';
import { Player } from '@remotion/player';
import { BusRouteComposition } from '../compositions/BusRouteComposition';

type AnimationPanelProps = {
  buses: Bus[];
  routes: Route[];
  onExport?: () => void;
};

// PUBLIC_INTERFACE
export const AnimationPanel: React.FC<AnimationPanelProps> = ({ buses, routes, onExport }) => {
  /** Central panel rendering the live animation using Remotion Player with overlay controls and stats. */
  const theme = getTheme();
  const utilization =
    buses.length === 0 ? 0 : buses.reduce((acc, b) => acc + b.occupancy, 0) / buses.length;

  return (
    <div
      style={{
        background: theme.panel,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 16,
        boxShadow: theme.shadow,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: theme.text }}>Live Route Animation</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <span
            style={{
              fontSize: 12,
              padding: '6px 10px',
              borderRadius: 999,
              background: `${COLORS.accent}22`,
              color: theme.text,
              border: `1px solid ${theme.border}`,
            }}
          >
            Utilization {(utilization * 100).toFixed(0)}%
          </span>
          <button
            onClick={onExport}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: `1px solid ${theme.border}`,
              background: theme.secondary,
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Export
          </button>
        </div>
      </div>

      <Player
        component={BusRouteComposition}
        durationInFrames={600}
        fps={30}
        compositionWidth={960}
        compositionHeight={540}
        style={{ width: '100%', borderRadius: 12, overflow: 'hidden', border: `1px solid ${theme.border}` }}
        inputProps={{
          buses,
          routes,
          colors: COLORS,
        }}
        loop
        controls
      />
    </div>
  );
};
