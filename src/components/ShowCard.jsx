function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export default function ShowCard({ show, onSelect }) {
  return (
    <button
      onClick={() => onSelect(show)}
      className="w-full text-left px-4 py-4 flex flex-col gap-1 min-h-[64px] border-b"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <span className="text-xs uppercase tracking-wide font-medium"
        style={{ color: 'var(--color-accent)' }}
      >
        {formatTime(show.showtimes[0])}
      </span>
      <span className="text-base font-semibold leading-snug"
        style={{ color: 'var(--color-text)' }}
      >
        {show.name}
      </span>
      {show.location && (
        <span className="text-sm italic" style={{ color: 'var(--color-text-secondary)' }}>
          {show.location}
        </span>
      )}
    </button>
  )
}
