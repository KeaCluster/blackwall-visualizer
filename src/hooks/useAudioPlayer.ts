import { useState, useEffect, useRef } from "react";

export function useAudioPayer(audioFile: File | null) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (audioFile) {
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

            source.connect(analyserNode);
            analyserNode.connect(audioContext.destination);
            source.start(0);
            setIsPlaying(true);
            setAnalyser(analyserNode);
            setDataArray(dataArray);
            sourceRef.current = source;
            setIsLoading(false);
          },
          (error) => {
            console.error("Error decoding data", error);
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
      };
    }
  }, [audioFile]);

  const togglePlay = () => {
    if (audioContextRef.current) {
      if (isPlaying) {
        audioContextRef.current.suspend();
      } else {
        audioContextRef.current.resume();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return { analyser, dataArray, isPlaying, togglePlay, isLoading };
}
