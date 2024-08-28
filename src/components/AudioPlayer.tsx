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
            className="min-w-36 absolute font-mono font-extrabold bottom-4 right-4 p-1 bg-amber-100 text-black hover:bg-amber-600 z-10"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>
          <Visualizer analyser={analyser} dataArray={dataArray} />
        </>
      )}
    </div>
  );
};

export default AudioPayer;
