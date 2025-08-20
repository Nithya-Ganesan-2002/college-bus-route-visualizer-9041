import { registerRoot } from "remotion";
import React from "react";
import { RemotionRoot } from "./Root";
import { App } from "./App";

// In Remotion Studio, mount the dashboard App and also register compositions for CLI renders.
const Root: React.FC = () => (
  <>
    <App />
    <RemotionRoot />
  </>
);

registerRoot(Root);
