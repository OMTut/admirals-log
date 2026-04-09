function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export default function ShowCard({ show, onSelect }) {
  return (
    <button
      onClick={() => onSelect(show)}
      className="w-full text-left px-4 py-3 mx-0 mb-2 rounded-lg"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      <span
        className="block text-xs mb-1"
        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
      >
        {formatTime(show.showtimes[0])}
      </span>
      <span
        className="block text-xl leading-snug"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
      >
        {show.name}
      </span>
      {show.location && (
        <span
          className="block text-sm mt-1 italic"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
        >
          {show.location}
        </span>
      )}
    </button>
  )
}
