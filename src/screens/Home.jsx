const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'DCA' },
  { key: 'hotels',         label: 'Hotels' },
  { key: 'downtownDisney', label: 'Downtown Disney' },
]

export default function Home({ onSelectLocation, onMenuOpen }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-blue-900 text-white sticky top-0 z-10">
        <h1 className="text-base font-bold">Admiral Boom's Master's Log</h1>
        <button onClick={onMenuOpen} aria-label="Open menu" className="p-2 text-xl">☰</button>
      </header>
      <main className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
        {LOCATIONS.map(loc => (
          <button
            key={loc.key}
            onClick={() => onSelectLocation(loc.key)}
            className="w-full py-6 text-xl font-bold rounded-lg bg-blue-900 text-white"
          >
            {loc.label}
          </button>
        ))}
      </main>
    </div>
  )
}
