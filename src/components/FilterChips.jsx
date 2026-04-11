import { FILTER_CATEGORIES, FILTER_CHIPS } from '../data/filterMap.js'

export default function FilterChips({ activeCategory, onFilterChange, chips = FILTER_CHIPS }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-2 shrink-0"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      {chips.map(chip => {
        const isActive = activeCategory === chip
        return (
          <button
            key={chip}
            onClick={() => onFilterChange(isActive ? FILTER_CATEGORIES.ALL : chip)}
            className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium flex-shrink-0 transition-colors"
            style={isActive ? {
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              border: '1.5px solid var(--color-primary)',
            } : {
              backgroundColor: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '1.5px solid var(--color-border)',
            }}
          >
            {chip}
          </button>
        )
      })}
    </div>
  )
}
