import React from "react";
import { useAudioPayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";
import LoadingBar from "./LoadingBar.tsx";
import { EventListener } from "three";

interface AudioPayerProps {
  audioFile: File;
}

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const {
    analyser,
    dataArray,
    isPlaying,
    togglePlay,
    isLoading,
    volume,
    changeVolume,
  } = useAudioPayer(audioFile);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(parseFloat(event.target.value));
    changeVolume(parseFloat(event.target.value));
  };

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
          <label htmlFor="volume" className="text-white">
            Volume
          </label>
          <input
            className="w-30` border-black bg-amber-600"
            id="volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
          <Visualizer analyser={analyser} dataArray={dataArray} />
        </>
      )}
    </div>
  );
};

export default AudioPayer;
