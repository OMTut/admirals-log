import Header from '../components/Header.jsx'

const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'Disney California Adventure' },
  { key: 'hotels',         label: 'Hotels' },
  { key: 'downtownDisney', label: 'Downtown Disney' },
]

export default function Home({ onSelectLocation }) {
  function handleTap(loc) {
    if (loc.externalUrl) {
      window.open(loc.externalUrl, '_blank', 'noopener,noreferrer')
    } else {
      onSelectLocation(loc.key)
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'transparent' }}>
      <Header title="Going to Disneyland!!"/>
      <main className="flex flex-col gap-4 p-4 overflow-y-auto flex-1 justify-end">
        <div className="flex justify-center mb-2">
          <img src="/disney70-1.jpg" alt="Disneyland 70th" className="max-w-s w-full rounded-lg" />
        </div>
        {LOCATIONS.map(loc => (
          <button
            key={loc.key}
            onClick={() => handleTap(loc)}
            className="w-full py-4 rounded-lg transition-opacity active:opacity-70"
            style={{
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-heading)',
              fontSize: '2.0rem',
              lineHeight: '1',
              boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
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
