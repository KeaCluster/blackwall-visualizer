import React from "react";
import { useAudioPayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";
import LoadingBar from "./LoadingBar.tsx";

interface AudioPayerProps {
  audioFile: File;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 10);
  console.log(time);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const {
    analyser,
    dataArray,
    isPlaying,
    togglePlay,
    isLoading,
    volume,
    changeVolume,
    currentTime,
    duration,
  } = useAudioPayer(audioFile);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(parseFloat(event.target.value));
    changeVolume(parseFloat(event.target.value));
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingBar isLoading={isLoading} />}
      {!isLoading && analyser && dataArray && (
        <div className="">
          <div className="flex items-center space-x-4 p-1 absolute bottom-4 left-4 z-10 bg-amber-100 font-mono tracking-wide font-bold text-black shadow-offset shadow-amber-100 border-2 border-solid border-black">
            <button
              onClick={togglePlay}
              className="min-w-36 font-mono tracking-wide border-double border-black border-2 hover:bg-amber-600 m-2"
            >
              {isPlaying ? "PAUSE" : "PLAY"}
            </button>
            <span className="font-medium text-sm min-w-24">
              {`${formatTime(currentTime)} - ${formatTime(duration)}`}
            </span>
            <label htmlFor="volume" className="text-sm">
              Volume
            </label>
            <input
              className="w-30` border-black border-2 bg-amber-600"
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <Visualizer analyser={analyser} dataArray={dataArray} />
        </div>
      )}
    </div>
  );
};

export default AudioPayer;
