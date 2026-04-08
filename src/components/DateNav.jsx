function formatLabel(dateStr) {
  // Parse as local date to avoid UTC offset shifting the day
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function shiftDate(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

export default function DateNav({ date, onDateChange }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onDateChange(shiftDate(date, -1))}
        aria-label="Previous day"
        className="p-3 text-lg leading-none text-gray-600"
      >
        ‹
      </button>
      <span className="text-sm font-medium text-gray-700 min-w-[110px] text-center">
        {formatLabel(date)}
      </span>
      <button
        onClick={() => onDateChange(shiftDate(date, 1))}
        aria-label="Next day"
        className="p-3 text-lg leading-none text-gray-600"
      >
        ›
      </button>
    </div>
  )
}
