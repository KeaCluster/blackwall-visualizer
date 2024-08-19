import React from "react";
import { useAudioPayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";

interface AudioPayerProps {
  audioFile: File;
}

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const { analyzer, dataArray } = useAudioPayer(audioFile);

  return (
    <>
      {analyzer && dataArray && (
        <Visualizer analyzer={analyzer} dataArray={dataArray} />
      )}
    </>
  );
};

export default AudioPayer;
