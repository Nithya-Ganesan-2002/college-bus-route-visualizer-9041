import React, { useEffect, useState } from 'react';
import { getTheme } from './theme';
import { Sidebar } from './components/Sidebar';
import { AnimationPanel } from './components/AnimationPanel';
import { DashboardPanel } from './components/DashboardPanel';
import { ExportPanel } from './components/ExportPanel';
import { INITIAL_BUSES, ROUTES, simulateTick } from './data/simulatedData';
import { Bus } from './types';
import { getWindow, now } from './utils/browser';

// PUBLIC_INTERFACE
export const App: React.FC = () => {
  /** Main dashboard app with sidebar navigation and content areas. Simulates bus state in preview. */
  const theme = getTheme();
  const [active, setActive] = useState<'visualization' | 'dashboard' | 'export'>('visualization');
  const [buses, setBuses] = useState<Bus[]>(INITIAL_BUSES);

  // Simulate live bus movement in Studio preview
  useEffect(() => {
    let mounted = true;
    let last = now();
    const step = () => {
      const current = now();
      const dt = (current - last) / 1000;
      last = current;
      if (mounted) {
        setBuses((prev) => simulateTick(prev, dt));
        const w = getWindow();
        if (w?.requestAnimationFrame) {
          w.requestAnimationFrame(step);
        }
      }
    };
    const w = getWindow();
    const raf = w?.requestAnimationFrame ? w.requestAnimationFrame(step) : undefined;
    return () => {
      mounted = false;
      if (raf && w?.cancelAnimationFrame) {
        w.cancelAnimationFrame(raf);
      }
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
        background: theme.background,
        color: theme.text,
        height: '100vh',
        display: 'flex',
      }}
    >
      <Sidebar active={active} onChange={setActive} />
      <main style={{ flex: 1, padding: 16, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {active === 'visualization' && (
            <>
              <AnimationPanel buses={buses} routes={ROUTES} />
              <DashboardPanel buses={buses} />
            </>
          )}
          {active === 'dashboard' && (
            <>
              <DashboardPanel buses={buses} />
            </>
          )}
          {active === 'export' && (
            <>
              <ExportPanel />
            </>
          )}
        </div>
      </main>
    </div>
  );
};
