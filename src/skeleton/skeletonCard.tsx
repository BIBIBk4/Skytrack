export const SkeletonCard = () => {
    return (
      <div className="w-full sm:w-72 bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex-shrink-0 sm:flex-none animate-pulse">
        <div className="flex items-center">
          <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  };