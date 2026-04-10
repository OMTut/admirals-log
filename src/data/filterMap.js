// Filter category constants and name-based API entity mapping.
// All entertainment entities share entityType === 'SHOW', so categories
// are determined by show name pattern matching.

export const FILTER_CATEGORIES = {
  ALL:        'All',        // used internally as default, not shown as a chip
  SHOWS:      'Shows',
  CHARACTERS: 'Characters',
  PARADES:    'Parades',
  NIGHTTIME:  'Nighttime',
}

// Chips shown in the filter bar (order matters)
export const FILTER_CHIPS = [
  FILTER_CATEGORIES.SHOWS,
  FILTER_CATEGORIES.CHARACTERS,
  FILTER_CATEGORIES.PARADES,
  FILTER_CATEGORIES.NIGHTTIME,
]

// Keyword lists checked in priority order.
// First match wins — more specific patterns go first.
const RULES = [
  {
    category: FILTER_CATEGORIES.NIGHTTIME,
    keywords: [
      'fireworks', 'paint the night', 'world of color', 'fantasmic',
      'wondrous journeys', 'shadows of memory', 'electrical parade',
      'nighttime spectacular', 'fire of the rising moons',
    ],
  },
  {
    category: FILTER_CATEGORIES.PARADES,
    keywords: [
      'parade', 'cavalcade',
    ],
  },
  {
    // Returns 'Events' internally — normalizeShow maps this to ['Shows', 'Characters']
    category: 'Events',
    keywords: [
      'meet ', "mickey's house", 'heroic encounter', 'avengers headquarters',
      'cardmember', 'character dining',
    ],
  },
]

/**
 * Returns the primary category string for a show.
 * 'Events' is an internal value — callers should map it to multiple categories.
 * Everything else falls back to FILTER_CATEGORIES.SHOWS.
 */
export function getCategoryForShow(show) {
  const name = show.name.toLowerCase()

  for (const rule of RULES) {
    if (rule.keywords.some(kw => name.includes(kw))) {
      return rule.category
    }
  }

  return FILTER_CATEGORIES.SHOWS
}
