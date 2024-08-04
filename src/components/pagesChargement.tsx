import ProgressBar from "./progressBar";

function Chargement() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h1 className="font-semibold text-xl sm:text-3xl text-center mb-4">
        Chargement des données <span className="dot-animation"></span>
      </h1>
      <div className="w-2/3 sm:w-1/2">
        <ProgressBar />
      </div>
    </div>
  );
}

export { Chargement };
