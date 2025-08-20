import React from 'react';
import { getTheme } from '../theme';
import { Bus } from '../types';

type DashboardPanelProps = {
  buses: Bus[];
};

// simple pill metric
const Metric: React.FC<{ label: string; value: string; tone?: 'success' | 'warning' | 'danger' | 'neutral' }> = ({ label, value, tone = 'neutral' }) => {
  const theme = getTheme();
  const tones: Record<string, string> = {
    success: theme.success,
    warning: theme.warning,
    danger: theme.danger,
    neutral: theme.secondary,
  };
  const bg = tones[tone] + '22';
  return (
    <div style={{ padding: 12, borderRadius: 12, border: `1px solid ${theme.border}`, background: bg, minWidth: 160 }}>
      <div style={{ fontSize: 12, color: theme.mutedText }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: theme.text }}>{value}</div>
    </div>
  );
};

// PUBLIC_INTERFACE
export const DashboardPanel: React.FC<DashboardPanelProps> = ({ buses }) => {
  /** Dashboard area with basic KPI tiles and simple placeholder charts for statistics. */
  const theme = getTheme();

  const avgOcc = buses.length ? buses.reduce((a, b) => a + b.occupancy, 0) / buses.length : 0;
  const delayed = buses.filter((b) => b.status === 'delayed').length;
  const ahead = buses.filter((b) => b.status === 'ahead').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Metric label="Average Utilization" value={`${Math.round(avgOcc * 100)}%`} tone="neutral" />
        <Metric label="Delayed Buses" value={`${delayed}`} tone="warning" />
        <Metric label="Ahead of Schedule" value={`${ahead}`} tone="success" />
        <Metric label="Total Buses" value={`${buses.length}`} tone="neutral" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, background: theme.panel, minHeight: 180 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: theme.text }}>Passenger Flow (placeholder)</div>
          <div style={{ height: 120, background: theme.surface, borderRadius: 8, border: `1px dashed ${theme.border}` }} />
        </div>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: 12, padding: 12, background: theme.panel, minHeight: 180 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, color: theme.text }}>On-time Performance (placeholder)</div>
          <div style={{ height: 120, background: theme.surface, borderRadius: 8, border: `1px dashed ${theme.border}` }} />
        </div>
      </div>
    </div>
  );
};
