export const VIEW_MODES = {
  UPCOMING: 'upcoming',
  ALL: 'all',
}

const OPTIONS = [
  { value: VIEW_MODES.UPCOMING, label: 'Upcoming Shows' },
  { value: VIEW_MODES.ALL,      label: 'All Shows' },
]

export default function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div
      className="flex shrink-0 px-4 py-3"
      style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
    >
      <div
        className="flex rounded-lg p-0.5 w-full"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {OPTIONS.map(opt => {
          const isActive = viewMode === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => onViewChange(opt.value)}
              className="flex-1 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={isActive ? {
                backgroundColor: 'var(--color-surface)',
                color: 'var(--color-text)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              } : {
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
