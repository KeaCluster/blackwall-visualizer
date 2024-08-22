import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BarsProps {
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

const Bars: React.FC<BarsProps> = ({ analyser, dataArray }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const numBars = 64;

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < numBars; i++) {
      pos.push((i - numBars / 2) * 0.15);
    }
    return pos;
  }, [numBars]);

  useFrame(() => {
    if (analyser && dataArray && meshRef.current) {
      analyser.getByteFrequencyData(dataArray);

      // Outside loop for opt
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      const scale = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();

      for (let i = 0; i < numBars; i++) {
        const scaleY = dataArray[i] / 128;
        position.set(positions[i], 0, 0);
        scale.set(0.1, scaleY, 0.1);
        matrix.compose(position, quaternion, scale);
        meshRef.current.setMatrixAt(i, matrix);
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
