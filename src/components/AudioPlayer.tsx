import React from "react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import Visualizer from "./Visualizer.tsx";
import LoadingBar from "./LoadingBar.tsx";
import MediaControls from "./MediaControls.tsx";

interface AudioPayerProps {
  audioFile: File;
}

const AudioPayer: React.FC<AudioPayerProps> = ({ audioFile }) => {
  const {
    analyser,
    dataArray,
    isPlaying,
    togglePlay,
    volume,
    changeVolume,
    currentTime,
    duration,
    isLoading,
  } = useAudioPlayer(audioFile);

  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingBar isLoading={isLoading} />}
      {!isLoading && analyser && dataArray && (
        <>
          <MediaControls
            isPlaying={isPlaying}
            onPlayPause={togglePlay}
            volume={volume}
            onVolumeChange={changeVolume}
            currentTime={currentTime}
            duration={duration}
          />
          <Visualizer analyser={analyser} dataArray={dataArray} />
        </>
      )}
    </div>
  );
};

export default AudioPayer;
