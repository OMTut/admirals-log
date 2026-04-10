import { FILTER_CATEGORIES } from '../data/filterMap.js'

const CHIPS = Object.values(FILTER_CATEGORIES)

export default function FilterChips({ activeCategory, onFilterChange }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto px-4 py-3 shrink-0"
      style={{ backgroundColor: 'var(--color-surface)', boxShadow: '0 1px 0 var(--color-border)' }}
    >
      {CHIPS.map(chip => {
        const isActive = activeCategory === chip
        return (
          <button
            key={chip}
            onClick={() => onFilterChange(chip)}
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
