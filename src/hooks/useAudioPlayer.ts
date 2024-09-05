import { useState, useEffect, useRef } from "react";

export function useAudioPayer(audioFile: File | null) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3); // volume
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null); // one input one output for volume
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  useEffect(() => {
    // return type for specific type
    let intervalId: ReturnType<typeof setTimeout>;

    if (audioFile) {
      // context and compatibility
      if (!window.AudioContext) {
        setError("Your browser does not support the Web Audio API.");
      }
      // prepare data
      setIsLoading(true);
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // prepare file reader
      const reader = new FileReader();
      reader.onload = function (event) {
        // assertion
        const arrayBuffer = event.target?.result as ArrayBuffer;
        audioContext.decodeAudioData(
          arrayBuffer,
          (audioBuffer) => {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;

            // node and arr  will help for visualizing data
            const analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = 2048; // default frequency
            const bufferLength = analyserNode.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const gainNode = audioContext.createGain();
            gainNode.gain.value = volume;
            gainNodeRef.current = gainNode;

            source.connect(analyserNode);
            analyserNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            source.start(0);
            startTimeRef.current = audioContext.currentTime;
            setIsPlaying(true);
            setDuration(audioBuffer.duration);

            setAnalyser(analyserNode);
            setDataArray(dataArray);
            sourceRef.current = source;
            setIsLoading(false); // Full load

            // Timer per sec
            intervalId = setInterval(() => {
              if (audioContextRef.current && isPlaying) {
                const elapsed =
                  audioContextRef.current.currentTime -
                  startTimeRef.current +
                  pausedTimeRef.current;
                setCurrentTime(elapsed);
                if (elapsed >= audioBuffer.duration) {
                  setIsPlaying(false);
                  clearInterval(intervalId);
                }
              }
            }, 500);
          },
          (error) => {
            console.error("Error decoding data", error);
            setError("Failed to decode audio data");
            setIsLoading(false);
          },
        );
      };
      reader.readAsArrayBuffer(audioFile);

      // new file
      return () => {
        if (sourceRef.current) {
          sourceRef.current.stop();
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
        setIsPlaying(false);
        setAnalyser(null);
        setDataArray(null);
        setVolume(0.3);
        setCurrentTime(0);
        setDuration(0);
        setError("");
        clearInterval(intervalId);
      };
    }
  }, [audioFile]);

  const togglePlay = () => {
    if (audioContextRef.current) {
      if (isPlaying) {
        audioContextRef.current.suspend();
        pausedTimeRef.current +=
          audioContextRef.current.currentTime - startTimeRef.current; // pause for gainNode context
        setIsPlaying(false);
      } else {
        audioContextRef.current.resume();
        startTimeRef.current = audioContextRef.current.currentTime;
        setIsPlaying(true);
      }
    }
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = value;
    }
  };

  return {
    analyser,
    dataArray,
    isPlaying,
    togglePlay,
    isLoading,
    volume,
    changeVolume,
    currentTime,
    duration,
    error,
  };
}
