import React from "react";

interface MediaControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  volume: number;
  onVolumeChange: (value: number) => void;
  currentTime: number;
  duration: number;
}

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 10);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MediaControls: React.FC<MediaControlsProps> = ({
  isPlaying,
  onPlayPause,
  volume,
  onVolumeChange,
  currentTime,
  duration,
}) => {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(event.target.value));
  };

  return (
    <div className="flex items-center space-x-4 p-1 absolute bottom-4 left-4 z-10 bg-amber-100 font-mono tracking-wide font-bold text-black shadow-offset shadow-amber-100 border-2 border-solid border-black">
      <button
        onClick={onPlayPause}
        className="min-w-36 font-mono tracking-wide hover:bg-amber-600 p-1 m-1"
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
  );
};

export default MediaControls;
