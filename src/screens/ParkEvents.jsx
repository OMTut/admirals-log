const LOCATION_NAMES = {
  disneylandPark: 'Disneyland',
  dca: 'DCA',
  hotels: 'Hotels',
  downtownDisney: 'Downtown Disney',
}

export default function ParkEvents({ locationKey, onSelectShow, onMenuOpen }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-blue-900 text-white sticky top-0 z-10">
        <h1 className="text-base font-bold">Admiral Boom's Master's Log</h1>
        <button onClick={onMenuOpen} aria-label="Open menu" className="p-2 text-xl">☰</button>
      </header>
      <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700">
        {LOCATION_NAMES[locationKey]}
      </div>
      <main className="flex-1 overflow-y-auto flex items-center justify-center text-gray-400">
        Shows will load here
      </main>
    </div>
  )
}
