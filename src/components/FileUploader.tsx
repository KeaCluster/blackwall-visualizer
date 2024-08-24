import React, { useState } from "react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isValid, setIsValid] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files && files[0]) {
      const file = files[0];
      const isAudio = file.type.endsWith(".mp3"); // valid file type
      if (isAudio) {
        setSelectedFile(file);
        setIsValid("");
      } else {
        setSelectedFile(null);
        setIsValid("Please select a valid audio file: (.mp3).");
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
          className="w-full text-sm font-mono cursor-pointer file:font-mono text-gray-500 shadow-offset pointer-events-none file:pointer-events-auto mr-0 bg-amber-100 file:border-none border-2 border-black file:py-2 file:px-4 file:text-sm file:bg-amber-200 file:text-darkBlue hover:file:bg-darkBlue hover:file:text-amber-100"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
        />
        <button
          className="w-36 font-mono m-8 p-2 bg-amber-100 border-2 border-black text-black  ${selectedFile ? `bg-gray-700`} : cursor-not-allowed bg-gray-700` "
          onClick={handleConfirm}
          disabled={!selectedFile}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
