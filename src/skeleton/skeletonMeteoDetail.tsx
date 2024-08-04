export const SkeletonMeteoDetail = () => {
  return (
    <div className='flex justify-center items-center'>
    <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
    <p className='text-blue-600 ml-4'>Chargement des données<span className="dot-animation"></span></p>
</div>
  );
}