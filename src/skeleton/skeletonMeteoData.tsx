import SkeletonMapMeteo from "./skeletonMapMeteo"

export function SkeletonContenuMeteo(){
    return(
        <div className="animate-pulse">
        <div className="flex items-center mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/6 mb-4"></div>
        </div>
        
        <div className="flex items-center mb-4 mt-10">
          <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
          <div className="ml-4 h-16 w-28 bg-gray-300 rounded"></div>
        </div>
        
        <div className="h-6 bg-gray-300 rounded w-2/4 mb-10"></div>
        
        <div className="flex items-center mb-4 text-2xl font-bold">
          <div className="h-10 w-6 bg-gray-300"></div>
          <div className="ml-4 h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
        
        <div className="mb-4 font-bold text-sm">
          <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
        </div>

        <div className="block sm:hidden mb-4">
          <SkeletonMapMeteo />
        </div>
        
        <div className="text-lg flex justify-left space-x-8">
            <div>
            {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="ml-4 h-4 bg-gray-300 rounded w-20 sm:w-40"></div>
            </div>
          ))}
            </div>
            <div>
            {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              <div className="ml-4 h-4 bg-gray-300 rounded w-20 sm:w-40"></div>
            </div>
          ))}
            </div>
        </div>
      </div>

    );
}