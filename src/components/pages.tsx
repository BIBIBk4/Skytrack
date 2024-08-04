import { ContenuA } from './page1';
import { Chargement } from './pagesChargement';
import { useIndex } from '../context/indexContext';
import { Weather } from '../meteo/Weather';


function Pages() {
    const { index } = useIndex();
    return(
        <>
        {index === 0 && <ContenuA />}
        {index === 1 && <Chargement />}
        {index === 2 && <Weather />}
        </>
    );
}

export { Pages };