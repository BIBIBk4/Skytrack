import { Header } from './components/header';
import { Footer } from './components/footer';
import { Pages } from './components/pages';
import { IndexProvider } from './context/indexContext';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow mt-20">
    <IndexProvider>
    <Pages />
    </IndexProvider>
    </main>
    <Footer />
    </div>
  );
}

export default App;
