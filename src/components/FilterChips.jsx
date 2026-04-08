import { FILTER_CATEGORIES } from '../data/filterMap.js'

const CHIPS = Object.values(FILTER_CATEGORIES)

export default function FilterChips({ activeCategory, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 shrink-0 border-b"
      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
    >
      {CHIPS.map(chip => {
        const isActive = activeCategory === chip
        return (
          <button
            key={chip}
            onClick={() => onFilterChange(chip)}
            className="whitespace-nowrap px-3 py-2 rounded text-sm font-medium flex-shrink-0 border transition-colors"
            style={isActive ? {
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-bg)',
              borderColor: 'var(--color-primary)',
            } : {
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
            }}
          >
            {chip}
          </button>
        )
      })}
    </div>
  )
}
