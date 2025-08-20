export const THEME = {
  light: {
    name: 'light',
    background: '#FFFFFF',
    surface: '#F7F9FC',
    panel: '#FFFFFF',
    text: '#1B263B',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    primary: '#1B263B',
    secondary: '#415A77',
    accent: '#FFC300',
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#EF4444',
    grid: '#E5E7EB',
    shadow: '0 8px 24px rgba(27, 38, 59, 0.08)',
  },
} as const;

export type Theme = typeof THEME.light;

export const COLORS = {
  primary: '#1B263B',
  secondary: '#415A77',
  accent: '#FFC300',
} as const;

// PUBLIC_INTERFACE
export const getTheme = (name: keyof typeof THEME = 'light'): Theme => {
  /** Get the current UI theme. */
  return THEME[name];
};
