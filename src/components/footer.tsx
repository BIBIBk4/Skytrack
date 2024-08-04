



function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-semibold">SkyTrack</h2>
            <p className="mt-2 text-sm">Obtenez des prévisions météorologiques précises en temps réel.</p>
          </div>
  
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="hover:underline text-sm">À propos</a>
            <a href="#" className="hover:underline text-sm">Contact</a>
            <a href="#" className="hover:underline text-sm">Mentions légales</a>
          </div>
        </div>
  
        <div className="mt-8 border-t border-blue-800 pt-4 text-sm text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} SkyTrack. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
  
}

export { Footer };