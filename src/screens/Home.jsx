import Header from '../components/Header.jsx'

const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'DCA' },
  { key: 'hotels',         label: 'Hotels' },
  { key: 'downtownDisney', label: 'Downtown Disney' },
]

export default function Home({ onSelectLocation, onMenuOpen }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Header onMenuOpen={onMenuOpen} />
      <main className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
        {LOCATIONS.map(loc => (
          <button
            key={loc.key}
            onClick={() => onSelectLocation(loc.key)}
            className="w-full py-6 text-xl font-bold rounded-lg border-2 transition-opacity active:opacity-80"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg)',
              borderColor: 'var(--color-accent)',
            }}
          >
            {loc.label}
          </button>
        ))}
      </main>
    </div>
  )
}
