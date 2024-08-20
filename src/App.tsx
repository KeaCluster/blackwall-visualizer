import { useState } from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div className="w-screen h-screen bg-gray-900">
      {!audioFile && (
        <div className="flex items-center justify-center h-full">
          <FileUploader onFileSelected={setAudioFile} />
        </div>
      )}
      {audioFile && <AudioPlayer audioFile={audioFile} />}
    </div>
  );
}

export default App;
