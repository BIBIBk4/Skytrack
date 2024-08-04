import { useIndex } from "../context/indexContext";
import { Description } from "./description";

function ContenuA(){

  const {setIndex, obtenirPosition, erreur} = useIndex();

    function handleChng (){
        obtenirPosition();
        setIndex(1);
    }

    return(
      <div className="flex flex-col items-start mt-16 ml-10 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl font-bold text-blue-900">Bienvenue sur SkyTrack</h1>
          <p className="mt-6 text-lg sm:text-2xl text-gray-700">Obtenez des prévisions météorologiques en temps réel</p>
          <button 
              onClick={handleChng} 
              className="mt-6 w-11/12 sm:w-auto bg-blue-600 hover:bg-blue-800 text-white sm:text-xl font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
              Commencer
          </button>
          {erreur && <p className="text-red-500 mt-4 text-lg">{erreur}</p>}
          <p className="mt-8 text-md sm:text-xl text-gray-600">
              Découvrez instantanément les conditions météorologiques actuelles dans votre région.
          </p>
          <Description/>
      </div>
  );  
}

export { ContenuA };