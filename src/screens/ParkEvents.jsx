import { useShowtimes } from '../hooks/useShowtimes.js'

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export default function ParkEvents({ locationId, locationName, onSelectShow, onMenuOpen }) {
  const today = new Date().toISOString().split('T')[0]
  const { shows, loading, error, isOffline, lastFetched } = useShowtimes(locationId, today)

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-blue-900 text-white sticky top-0 z-10">
        <h1 className="text-base font-bold">Admiral Boom's Master's Log</h1>
        <button onClick={onMenuOpen} aria-label="Open menu" className="p-2 text-xl">☰</button>
      </header>

      {isOffline && lastFetched && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-800 text-xs text-center py-2 px-4">
          Showing cached data from {formatTime(lastFetched)}
        </div>
      )}

      <div className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-700">
        {locationName}
      </div>

      <main className="flex-1 overflow-y-auto">
        {!locationId && (
          <p className="text-center p-8 text-gray-400">
            Schedule information for {locationName} is not currently available.
          </p>
        )}
        {locationId && loading && (
          <p className="text-center p-8 text-gray-500">Loading schedule...</p>
        )}
        {locationId && !loading && error && (
          <p className="text-center p-8 text-red-400">{error}</p>
        )}
        {locationId && !loading && !error && shows.length === 0 && (
          <p className="text-center p-8 text-gray-400">No shows found for today.</p>
        )}
        {locationId && !loading && shows.map(show => (
          <button
            key={show.id}
            onClick={() => onSelectShow(show)}
            className="w-full text-left px-4 py-3 border-b border-gray-200 flex flex-col gap-1"
          >
            <span className="text-xs text-gray-400">{formatTime(show.showtimes[0])}</span>
            <span className="text-base font-semibold text-gray-800">{show.name}</span>
            <span className="text-xs text-blue-800 font-medium">{show.category}</span>
          </button>
        ))}
      </main>
    </div>
  )
}
