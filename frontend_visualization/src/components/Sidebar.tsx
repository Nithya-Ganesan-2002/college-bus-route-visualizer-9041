import React from 'react';
import { getTheme } from '../theme';

type NavKey = 'visualization' | 'dashboard' | 'export';

type SidebarProps = {
  active: NavKey;
  onChange: (key: NavKey) => void;
};

const NavItem: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => {
  const theme = getTheme();
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: '12px 14px',
        marginBottom: 8,
        borderRadius: 10,
        border: '1px solid ' + theme.border,
        background: active ? theme.secondary : theme.panel,
        color: active ? '#FFFFFF' : theme.text,
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 200ms ease',
        boxShadow: active ? theme.shadow : 'none',
      }}
    >
      {label}
    </button>
  );
};

// PUBLIC_INTERFACE
export const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  /** The left navigation sidebar to switch between views. */
  const theme = getTheme();
  return (
    <aside
      style={{
        width: 260,
        minWidth: 220,
        borderRight: `1px solid ${theme.border}`,
        padding: 16,
        background: theme.surface,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: theme.accent,
            boxShadow: `0 0 0 4px ${theme.accent}22`,
          }}
        />
        <h2 style={{ margin: 0, color: theme.text, fontSize: 18 }}>College Bus Visualizer</h2>
      </div>
      <NavItem active={active === 'visualization'} onClick={() => onChange('visualization')} label="Route Visualization" />
      <NavItem active={active === 'dashboard'} onClick={() => onChange('dashboard')} label="Dashboards & Stats" />
      <NavItem active={active === 'export'} onClick={() => onChange('export')} label="Export Video" />
      <div style={{ marginTop: 16, color: theme.mutedText, fontSize: 12 }}>
        Theme: Light • Primary {theme.primary}
      </div>
    </aside>
  );
};
