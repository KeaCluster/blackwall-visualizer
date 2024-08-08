import React from "react";

interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelected,
}: FileUploaderProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      onFileSelected(files[0]);
    }
  };

  return (
    <div className="p-4">
      <input
        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
        type="file"
        accept="audio/**"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUploader;
