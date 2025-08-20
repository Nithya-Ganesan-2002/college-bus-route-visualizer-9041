# Remotion video

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Welcome to your Remotion project!

This project has been scaffolded for a College Bus Route Visualizer:
- Sidebar-driven dashboard UI (previewed inside Remotion Studio)
- Central animation panel using `@remotion/player`
- Remotion composition `BusRoutes` for CLI renders
- Modular components for routes, buses, stops, dashboards, and export panel
- Simulated live data to visualize movement

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

This launches Remotion Studio and mounts the dashboard UI. You can interact with the sidebar and inspect the `BusRoutes` composition.

**Render video**

```console
# Render the BusRoutes composition to MP4
npx remotion render src/index.ts BusRoutes out/video.mp4
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Structure

- `src/App.tsx` — Main dashboard layout with sidebar, animation, dashboards, export panel.
- `src/compositions/BusRouteComposition.tsx` — Remotion composition for export.
- `src/components/` — UI components (Sidebar, AnimationPanel, DashboardPanel, ExportPanel).
- `src/components/visualization/RouteMap.tsx` — SVG map for routes, stops, buses.
- `src/data/simulatedData.ts` — Dummy routes and live ticking bus positions.
- `src/theme.ts` — Theme and color system.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
