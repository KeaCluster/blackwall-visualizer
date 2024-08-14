import { useState, useEffect, useRef } from "react";

export function useAudioPayer(audioFile: File | null) {
  const [analyzer, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    if (audioFile) {
      // prepare data
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // prepare file reader
      const reader = new FileReader();
      reader.onload = function (event) {
        // assertion
        const arrayBuffer = event.target?.result as ArrayBuffer;
        audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;

          // node and arr  will help for visualizing data
          const analyzerNode = audioContext.createAnalyser();
          analyzerNode.fftSize = 2048; // default frequency
          const bufferLength = analyzerNode.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          source.connect(analyzerNode);
          analyzerNode.connect(audioContext.destination);
          source.start(0);
          setAnalyser(analyzerNode);
          setDataArray(dataArray);
          sourceRef.current = source;
        });
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
      };
    }
  }, [audioFile]);

  return { analyzer, dataArray };
}
