// Filter category constants and name-based API entity mapping.
// All entertainment entities share entityType === 'SHOW', so categories
// are determined by show name pattern matching.

export const FILTER_CATEGORIES = {
  ALL:        'All',
  FIREWORKS:  'Nighttime',
  SHOWS:      'Shows',
  ATMOSPHERE: 'Atmosphere Entertainment',
  PARADES:    'Parades',
  EVENTS:     'Events',
  CHARACTERS: 'Characters',
}

// Keyword lists checked in priority order.
// First match wins — more specific patterns go first.
const RULES = [
  {
    category: FILTER_CATEGORIES.FIREWORKS,
    keywords: [
      'fireworks', 'paint the night', 'world of color', 'fantasmic',
      'wondrous journeys', 'shadows of memory', 'electrical parade',
      'nighttime spectacular',
    ],
  },
  {
    category: FILTER_CATEGORIES.PARADES,
    keywords: [
      'parade', 'cavalcade',
    ],
  },
  {
    category: FILTER_CATEGORIES.ATMOSPHERE,
    keywords: [
      'band', 'piano player', 'bootstrappers', 'citizens of buena vista',
      'green army patrol', 'dapper dans', 'jambalaya jazz', 'pearly band',
      'five & dime', 'storytelling at royal', 'palisades stage',
      'culinary demonstration',
    ],
  },
  {
    category: FILTER_CATEGORIES.EVENTS,
    keywords: [
      'meet ', 'mickey\'s house', 'heroic encounter', 'avengers headquarters',
      'cardmember', 'character dining',
    ],
  },
]

/**
 * Returns the UI filter category for a given normalized show object.
 * Falls back to FILTER_CATEGORIES.SHOWS for anything that doesn't match.
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
