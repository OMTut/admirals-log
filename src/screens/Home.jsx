import Header from '../components/Header.jsx'

const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'Disney California Adventure' },
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
    <div className="flex flex-col h-full" style={{ backgroundColor: 'transparent' }}>
      <Header onMenuOpen={onMenuOpen} />
      <main className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
        {LOCATIONS.map(loc => (
          <button
            key={loc.key}
            onClick={() => handleTap(loc)}
            className="w-full py-4 rounded-lg transition-opacity active:opacity-70"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-heading)',
              fontSize: '3.0rem',
              lineHeight: '1',
            }}
          >
            {loc.label}
            {loc.externalUrl && (
              <span
                className="block mt-1"
                style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', opacity: 0.7 }}
              >
                Opens Disney calendar ↗
              </span>
            )}
          </button>
        ))}
      </main>
    </div>
  )
}
