import Header from '../components/Header.jsx'

const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'DCA' },
  { key: 'hotels',         label: 'Hotels',          externalUrl: 'https://disneyland.disney.go.com/calendars/day/#/hotels-disneyland-resort/' },
  { key: 'downtownDisney', label: 'Downtown Disney', externalUrl: 'https://disneyland.disney.go.com/calendars/day/#/downtown-disney-district/' },
]

export default function Home({ onSelectLocation, onMenuOpen }) {
  function handleTap(loc) {
    if (loc.externalUrl) {
      window.open(loc.externalUrl, '_blank', 'noopener,noreferrer')
    } else {
      onSelectLocation(loc.key)
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Header onMenuOpen={onMenuOpen} />
      <main className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
        {LOCATIONS.map(loc => (
          <button
            key={loc.key}
            onClick={() => handleTap(loc)}
            className="w-full py-6 text-xl font-bold rounded-lg border-2 transition-opacity active:opacity-80"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg)',
              borderColor: 'var(--color-accent)',
            }}
          >
            {loc.label}
            {loc.externalUrl && (
              <span className="block text-sm font-normal mt-1 opacity-70">
                Opens Disney calendar ↗
              </span>
            )}
          </button>
        ))}
      </main>
    </div>
  )
}
