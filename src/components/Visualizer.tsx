import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene.tsx";

interface VisualizerProps {
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

const Visualizer: React.FC<VisualizerProps> = ({ analyser, dataArray }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ background: "black", height: "100vh", width: "100vw" }}
    >
      <Scene analyser={analyser} dataArray={dataArray} />
    </Canvas>
  );
};

export default Visualizer;
