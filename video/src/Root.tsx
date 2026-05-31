import React from "react";
import { Composition } from "remotion";
import { AmaraSizzle, SIZZLE_DURATION } from "./AmaraSizzle";
import { FPS } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AmaraSizzle"
      component={AmaraSizzle}
      durationInFrames={SIZZLE_DURATION}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
