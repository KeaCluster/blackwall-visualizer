import { useState, useEffect, useRef } from "react";

export function useAudioPlayer(audioFile: File | null) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.3); // volume
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null); // one input one output for volume
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const startTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  useEffect(() => {
    if (audioFile) {
      // prepare data
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // prepare file reader
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        try {
          // assertion
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          setDuration(audioBuffer.duration);

          const analyserNode = audioContext.createAnalyser();
          analyserNode.fftSize = 2048;
          const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

          const gainNode = audioContext.createGain();
          gainNode.gain.value = volume;

          analyserRef.current = analyserNode;
          dataArrayRef.current = dataArray;
          gainNodeRef.current = gainNode;

          playAudio(audioBuffer, offsetRef.current);
          return () => {
            stopAudio();
            audioContext.close();
          };
        } catch (error) {
          console.error("Error decoding audio data", error);
        }
        reader.readAsArrayBuffer(audioFile);
      };
    }
  }, [audioFile]);

  // new Play func
  const playAudio = (audioBuffer: AudioBuffer, offset: number) => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(analyserRef.current!);
    analyserRef.current!.connect(gainNodeRef.current!);
    gainNodeRef.current!.connect(audioContext.destination);

    source.start(0, offset);
    sourceRef.current = source;
    startTimeRef.current = audioContext.currentTime - offset;
    setIsPlaying(true);
    updateCurrentTime();
  };

  const stopAudio = () => {
    sourceRef.current?.stop();
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
    const audioContext = audioContextRef.current;
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
    if (!audioContextRef.current || !sourceRef.current) return;
    if (isPlaying) {
      stopAudio();
      offsetRef.current +=
        audioContextRef.current.currentTime - startTimeRef.current;
    } else {
      playAudio(sourceRef.current.buffer!, offsetRef.current);
    }
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
  };
}
