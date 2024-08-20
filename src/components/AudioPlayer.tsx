import React from "react";
import { useAudioPayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";

interface AudioPayerProps {
  audioFile: File;
}

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const { analyser, dataArray } = useAudioPayer(audioFile);

  return (
    <>
      {analyser && dataArray && (
        <Visualizer analyser={analyser} dataArray={dataArray} />
      )}
    </>
  );
};

export default AudioPayer;
