import React from "react";

interface LoadingBarProps {
  isLoading: boolean;
}
const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
      {isLoading && (
        <div className="w-48 h-7 flex items-center justify-center bg-amber-100 text-darkBlue font-mono font-bold">
          <span>LOADING</span>
          <span className="ml-1 dot-animate">.</span>
          <span className="ml-1 dot-animate dot-delay-1">.</span>
          <span className="ml-1 dot-animate dot-delay-2">.</span>
        </div>
      )}
    </div>
  );
};

export default LoadingBar;
