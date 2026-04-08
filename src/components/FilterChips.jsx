import { FILTER_CATEGORIES } from '../data/filterMap.js'

const CHIPS = Object.values(FILTER_CATEGORIES)

export default function FilterChips({ activeCategory, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 shrink-0 border-b border-gray-200 bg-white">
      {CHIPS.map(chip => (
        <button
          key={chip}
          onClick={() => onFilterChange(chip)}
          className={[
            'whitespace-nowrap px-3 py-2 rounded text-sm font-medium flex-shrink-0 border transition-colors',
            activeCategory === chip
              ? 'bg-blue-900 text-white border-blue-900'
              : 'bg-white text-gray-700 border-gray-300',
          ].join(' ')}
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
