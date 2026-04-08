function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export default function ShowCard({ show, onSelect }) {
  return (
    <button
      onClick={() => onSelect(show)}
      className="w-full text-left px-4 py-4 border-b border-gray-200 flex flex-col gap-1 min-h-[64px] bg-white active:bg-gray-50"
    >
      <span className="text-xs text-gray-400 uppercase tracking-wide">
        {formatTime(show.showtimes[0])}
      </span>
      <span className="text-base font-semibold text-gray-900 leading-snug">
        {show.name}
      </span>
      {show.location && (
        <span className="text-sm text-gray-500 italic">{show.location}</span>
      )}
    </button>
  )
}
