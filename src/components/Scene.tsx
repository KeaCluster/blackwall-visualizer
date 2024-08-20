import { Environment } from "@react-three/drei";
import React, { Suspense } from "react";
import Bars from "./Bars";

interface SceneProps {
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

const Scene: React.FC<SceneProps> = ({ analyser, dataArray }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Bars analyser={analyser} dataArray={dataArray} />
        <Environment preset="night" />
      </Suspense>
    </>
  );
};

export default Scene;
