import React, { useState } from "react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files && files[0]) {
      const file = files[0];
      const isAudio = file.type.startsWith("audio/"); // valid file MIME type
      if (isAudio) {
        setSelectedFile(file);
        setError("");
        setIsValid(true);
      } else {
        setSelectedFile(null);
        setError("Please select a valid audio file: (.mp3).");
        setIsValid(false);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  return (
    <div className="p-4">
      <div className="m-12">
        <h2 className="text-7xl font-scan">NETWATCH</h2>
      </div>
      <div>
        <input
          className="w-full text-sm font-mono cursor-pointer file:font-mono text-gray-500 shadow-offset pointer-events-none file:pointer-events-auto mr-0 bg-amber-100 file:border-none border-2 border-black file:py-2 file:px-4 file:text-sm file:bg-amber-200 file:text-darkBlue hover:file:bg-amber-600 hover:file:text-amber-100"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
        <button
          className={`min-w-36 text-sm font-mono m-8 p-2 border-2 border-black text-black ${selectedFile && isValid ? "bg-amber-100 hover:bg-amber-600 hover:text-amber-100" : "cursor-not-allowed bg-gray-700"}`}
          onClick={handleConfirm}
          disabled={!selectedFile || !isValid}
        >
          {!selectedFile ? "Please choose a file" : "Confirm"}
        </button>
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default FileUploader;
