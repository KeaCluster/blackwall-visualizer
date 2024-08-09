import React from "react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
}: FileUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target?.files;
    if (files && files[0]) {
      onFileSelected?.(files[0]);
    }
  };

  return (
    <div className="p-4">
      <input
        className="w-full text-sm font-mono file:font-mono text-gray-500 shadow-offset mr-0 bg-amber-100 file:border-none border-2 border-black file:py-2 file:px-4 file:text-sm file:bg-amber-200 file:text-darkBlue hover:file:bg-darkBlue hover:file:text-amber-100"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
