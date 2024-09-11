import { useState, useEffect, useRef } from "react";

export function useAudioPlayer(audioFile: File | null) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3); // volume
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null); // one input one output for volume
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  const startTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  useEffect(() => {
    if (audioFile) {
      initializeAudio();
    }
    return () => cleanupAudio();
  }, [audioFile]);

  const initializeAudio = async () => {
    setIsLoading(true);

    // prepare data
    if (!audioContextRef.current) {
      const audioContext = new AudioContext();
    }
    const audioContext = audioContextRef.current;

    // prepare file reader
    try {
      // assertion
      const arrayBuffer = await audioFile!.arrayBuffer();
      const audioBuffer = await audioContext!.decodeAudioData(arrayBuffer);

      setDuration(audioBuffer.duration);
      audioBufferRef.current = audioBuffer; // store correct buffer

      createNodes();
      playAudio(offsetRef.current);
      setIsLoading(false);
    } catch (error) {
      console.error("Error decoding audio data", error);
      setIsLoading(false);
    }
  };

  const createNodes = () => {
    const audioContext = audioContextRef.current!;
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;

    const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    analyserRef.current = analyserNode;
    dataArrayRef.current = dataArray;
    gainNodeRef.current = gainNode;
  };

  // new Play func
  const playAudio = (offset: number) => {
    const audioContext = audioContextRef.current!;
    const audioBuffer = audioBufferRef.current!; // correct buffer

    if (!audioContext || !audioBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // connections
    source.connect(analyserRef.current!);
    analyserRef.current!.connect(gainNodeRef.current!);
    gainNodeRef.current!.connect(audioContext.destination);

    source.start(0, offset);
    source.onended = () => {
      setIsPlaying(false);
    };

    sourceRef.current = source;
    startTimeRef.current = audioContext.currentTime - offset;
    setIsPlaying(true);

    // onAnimationFrame
    requestAnimationFrame(updateCurrentTime);
  };

  const stopAudio = () => {
    if (sourceRef.current) {
      sourceRef.current?.stop();
      sourceRef.current.disconnect(); // Clear source for resume
      sourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = value;
    }
  };

  function updateCurrentTime() {
    if (!isPlaying) return;
    const audioContext = audioContextRef.current!;
    if (audioContext) {
      const elapsed = audioContext.currentTime - startTimeRef.current;
      setCurrentTime(offsetRef.current + elapsed);

      if (offsetRef.current + elapsed >= duration) {
        setIsPlaying(false);
      } else {
        requestAnimationFrame(updateCurrentTime);
      }
    }
  }

  const togglePlay = () => {
    console.log("Toggle Play: ", isPlaying);
    if (!audioContextRef.current || !audioBufferRef.current) {
      console.log(
        "AudioContext or AudioBuffer is null",
        audioContextRef,
        audioBufferRef,
      );
      return;
    }
    if (isPlaying) {
      console.log("Pause");
      stopAudio();
      offsetRef.current +=
        audioContextRef.current.currentTime - startTimeRef.current;
    } else {
      console.log("Play");
      playAudio(offsetRef.current);
    }
  };

  const cleanupAudio = () => {
    stopAudio();
    // cleaner cleanup
    if (audioContextRef.current) {
      audioContextRef.current?.close();
      audioContextRef.current = null;
    }

    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }

    dataArrayRef.current = null;
    sourceRef.current = null;
    offsetRef.current = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const analyser = analyserRef.current;
  const dataArray = dataArrayRef.current;

  return {
    analyser,
    dataArray,
    isPlaying,
    togglePlay,
    volume,
    changeVolume,
    currentTime,
    duration,
    isLoading,
  };
}
