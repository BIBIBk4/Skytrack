function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 h-28 w-full flex items-center shadow-md fixed z-10">
      <a href="/"><img src="/favicon.ico" alt="logo" className="w-40 mr-4 rounded-full"/></a>
      <h1 className="text-4xl font-extrabold text-white tracking-wide">
        SkyTrack
      </h1>
    </header>
  );
}

export { Header };
