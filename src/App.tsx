import { useState } from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div className="w-screen h-screen bg-black">
      <div className="flex ietms-center justify-center h-full">
        <FileUploader onFileSelected={setAudioFile} />
      </div>
    </div>
  );
}

export default App;