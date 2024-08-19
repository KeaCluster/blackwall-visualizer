import React from "react";

interface SceneProps {
  analyzer: AnalyserNode;
  dataArray: Uint8Array;
}

const Scene: React.FC<SceneProps> = ({ analyzer, dataArray }) => {
  return (
    <>
      <h2>Audio here</h2>
    </>
  );
};

export default Scene;
