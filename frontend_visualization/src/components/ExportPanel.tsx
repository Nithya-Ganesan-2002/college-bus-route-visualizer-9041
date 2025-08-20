import React, { useState } from 'react';
import { getTheme } from '../theme';
import { ExportFormat } from '../types';

// PUBLIC_INTERFACE
export const ExportPanel: React.FC = () => {
  /** Export panel stub: explains how to export via Remotion CLI and provides basic controls placeholder. */
  const theme = getTheme();
  const [format, setFormat] = useState<ExportFormat>('mp4');

  return (
    <div
      style={{
        background: theme.panel,
        border: `1px solid ${theme.border}`,
        borderRadius: 16,
        padding: 16,
        boxShadow: theme.shadow,
      }}
    >
      <h3 style={{ marginTop: 0, color: theme.text }}>Export Options</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label style={{ color: theme.text }}>Format:</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as ExportFormat)}
          style={{ padding: 8, borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.surface, color: theme.text }}
        >
          <option value="mp4">MP4</option>
          <option value="gif">GIF</option>
        </select>
        <span style={{ color: theme.mutedText, fontSize: 12 }}>
          Rendering is performed via Remotion CLI in this template.
        </span>
      </div>

      <div style={{ background: theme.surface, border: `1px dashed ${theme.border}`, borderRadius: 12, padding: 12, color: theme.mutedText }}>
        To export from CLI:
        <pre
          style={{
            margin: '8px 0 0 0',
            padding: 12,
            background: '#0b0f16',
            color: '#c9d1d9',
            borderRadius: 8,
            overflowX: 'auto',
          }}
        >
{`# From the container root:
npm run dev   # preview in Studio

# Render a composition:
npx remotion render src/index.ts BusRoutes out/video.${format}

# Or render GIF (requires imagemagick or gifcodec setup):
npx remotion render --codec=gif src/index.ts BusRoutes out/animation.gif
`}
        </pre>
      </div>
    </div>
  );
};
