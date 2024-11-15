import React, { Suspense } from "react";
import Bars from "./Bars";
import { Environment, OrbitControls } from "@react-three/drei";

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
        {/*
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={3.9}
              height={300}
            />
          </EffectComposer>
           */}
      </Suspense>
      <OrbitControls />
    </>
  );
};

export default Scene;
