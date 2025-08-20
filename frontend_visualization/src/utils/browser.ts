export const hasWindow = typeof window !== 'undefined';

// PUBLIC_INTERFACE
export const getWindow = () => {
  /** Returns the browser window if available, otherwise undefined (SSR-safe). */
  return hasWindow ? window : undefined;
};

// PUBLIC_INTERFACE
export const now = () => {
  /** Returns a high-resolution timestamp using performance.now() if available. */
  const w = getWindow();
  return w?.performance?.now ? w.performance.now() : Date.now();
};
