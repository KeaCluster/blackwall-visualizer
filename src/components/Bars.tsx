import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BarsProps {
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

const Bars: React.FC<BarsProps> = ({ analyser, dataArray }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const numBars = 64;

  const dummy = new THREE.Object3D();

  useFrame(() => {
    if (analyser && dataArray && meshRef.current) {
      for (let i = 0; i < numBars; i++) {
        const scale = dataArray[i] / 128;
        dummy.position.set((i - numBars / 2) * 0.3, 0, 0);
        dummy.scale.set(0.2, scale, 0.2);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, numBars]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="cyan" />
    </instancedMesh>
  );
};

export default Bars;
