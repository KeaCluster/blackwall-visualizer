import React from "react";
import { useAudioPayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";

interface AudioPayerProps {
  audioFile: File;
}

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const { analyser, dataArray, isPlaying, togglePlay, isLoading } =
    useAudioPayer(audioFile);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-white">Loading...</div>
        </div>
      )}
      {!isLoading && analyser && dataArray && (
        <>
          <button
            onClick={togglePlay}
            className="absolute top-4 left-4 p-2 bg-gray-200 text-white rounded"
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
