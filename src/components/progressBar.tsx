import { useState, useEffect } from 'react';
import { useIndex } from '../context/indexContext';

function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const { setIndex } = useIndex();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 27);

    const timeout = setTimeout(() => {
      setIndex(2);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [setIndex]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 sm:h-6 overflow-hidden shadow-md">
      <div
        className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 h-full rounded-full transition-all duration-200 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
