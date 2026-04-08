import Header from '../components/Header.jsx'
import ShowImage from '../components/ShowImage.jsx'

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export default function EventDetail({ show, onBack, onMenuOpen }) {
  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Header onMenuOpen={onMenuOpen} />

      <div className="flex-1 overflow-y-auto">
        <button
          onClick={onBack}
          className="px-4 py-3 text-sm text-left w-full border-b"
          style={{ color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
        >
          ← Back
        </button>

        <div className="px-4 pt-4 pb-8 flex flex-col gap-4">
          {/* Show name & meta */}
          <div>
            <h2 className="text-xl font-bold leading-snug" style={{ color: 'var(--color-text)' }}>
              {show.name}
            </h2>
            {show.location && (
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                {show.location}
              </p>
            )}
            <p className="text-xs font-medium mt-1" style={{ color: 'var(--color-accent)' }}>
              {show.category}
            </p>
          </div>

          {/* All showtimes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Showtimes
            </p>
            <div className="flex flex-wrap gap-2">
              {show.showtimes.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded text-sm font-medium"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-primary)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {formatTime(t)}
                </span>
              ))}
            </div>
          </div>

          {/* Description (when API provides it) */}
          {show.description && (
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {show.description}
            </p>
          )}

          {/* Image */}
          <ShowImage imageUrl={show.imageUrl} showName={show.name} />
        </div>
      </div>
    </div>
  )
}
