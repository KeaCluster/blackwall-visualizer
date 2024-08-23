import React from "react";
import { useAudioPayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";
import LoadingBar from "./LoadingBar.tsx";

interface AudioPayerProps {
  audioFile: File;
}

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const { analyser, dataArray, isPlaying, togglePlay, isLoading } =
    useAudioPayer(audioFile);

  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingBar isLoading={isLoading} />}
      {!isLoading && analyser && dataArray && (
        <>
          <button
            onClick={togglePlay}
            className="absolute top-4 left-4 p-2 bg-amber-100 text-darkBlue"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <Visualizer analyser={analyser} dataArray={dataArray} />
        </>
      )}
    </div>
  );
};

export default AudioPayer;
