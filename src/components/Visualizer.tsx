import React from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene.tsx";

interface VisualizerProps {
  analyzer: AnalyserNode;
  dataArray: Uint8Array;
}

const Visualizer: React.FC<VisualizerProps> = ({ analyzer, dataArray }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      style={{ background: "black", height: "100vh", width: "100vw" }}
    >
      <Scene analyzer={analyzer} dataArray={dataArray} />
    </Canvas>
  );
};

export default Visualizer;
