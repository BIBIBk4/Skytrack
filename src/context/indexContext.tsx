import { createContext, useState, useContext, ReactNode } from 'react';

interface IndexContextType {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  coordonnees: Coordonnees | null;
  erreur: string | null;
  obtenirPosition: () => void;
}
interface Coordonnees {
  latitude: number;
  longitude: number;
}

const IndexContext = createContext<IndexContextType | undefined>(undefined);

const IndexProvider = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState<number>(0);
  const [coordonnees, setCoordonnees] = useState<Coordonnees | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);

  const obtenirPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordonnees({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setErreur(null);
        },
        (erreur) => {
          switch (erreur.code) {
            case erreur.PERMISSION_DENIED:
              setErreur("Permission refusée");
              break;
            case erreur.POSITION_UNAVAILABLE:
              setErreur("Position non disponible");
              break;
            case erreur.TIMEOUT:
              setErreur("La requête a expiré");
              break;
            default:
              setErreur("Une erreur inconnue est survenue");
              break;
          }
        }
      );
    } else {
      setErreur("La géolocalisation n'est pas supportée par ce navigateur");
    }
  };

  return (
    <IndexContext.Provider value={{ index, setIndex, coordonnees, erreur, obtenirPosition }}>
      {children}
    </IndexContext.Provider>
  );
};

const useIndex = () => {
  const context = useContext(IndexContext);
  if (context === undefined) {
    throw new Error("useIndex doit être utilisé à l'intérieur d'un IndexProvider");
  }
  return context;
};

export { IndexProvider, useIndex };
