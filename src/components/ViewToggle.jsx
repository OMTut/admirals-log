export const VIEW_MODES = {
  UPCOMING: 'upcoming',
  ALL: 'all',
}

export default function ViewToggle({ viewMode, onViewChange, onGoHome }) {
  return (
    <div
      className="flex shrink-0"
      style={{
        backgroundColor: 'var(--color-surface)',
        boxShadow: '0 -1px 4px rgba(0,0,0,0.08)',
        paddingBottom: 'calc(env(safe-area-inset-bottom) + 40px)',
      }}
    >
      {[
        { value: VIEW_MODES.UPCOMING, label: 'Upcoming' },
        { value: VIEW_MODES.ALL,      label: 'All' },
      ].map(opt => {
        const isActive = viewMode === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onViewChange(opt.value)}
            className="flex-1 py-3 text-sm font-medium transition-colors"
            style={{
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderTop: isActive
                ? '2px solid var(--color-primary)'
                : '2px solid transparent',
            }}
          >
            {opt.label}
          </button>
        )
      })}

      <button
        onClick={onGoHome}
        aria-label="Open menu"
        className="flex items-center justify-center text-2xl transition-colors"
        style={{
          width: 64,
          paddingRight: 36,
          color: 'var(--color-text-secondary)',
          borderTop: '2px solid transparent',
        }}
      >
        ☰
      </button>
    </div>
  )
}
