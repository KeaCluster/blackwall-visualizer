import React from "react";

interface SceneProps {
  analyser: AnalyserNode;
  dataArray: Uint8Array;
}

const Scene: React.FC<SceneProps> = ({ analyser, dataArray }) => {
  return (
    <>
      <h2>Audio here</h2>
    </>
  );
};

export default Scene;
