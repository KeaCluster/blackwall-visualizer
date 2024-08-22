import React from "react";

interface LoadingBarProps {
  isLoading: boolean;
}
const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      {isLoading && (
        <div className="w-48 h-7 flex items-center justify-center bg-amber-100 text-darkBlue font-mono">
          Loading...
        </div>
      )}
    </div>
  );
};

export default LoadingBar;
