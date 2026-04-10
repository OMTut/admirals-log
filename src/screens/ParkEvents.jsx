import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import OfflineBanner from '../components/OfflineBanner.jsx'
import FilterChips from '../components/FilterChips.jsx'
import ViewToggle, { VIEW_MODES } from '../components/ViewToggle.jsx'
import ShowCard from '../components/ShowCard.jsx'
import { useShowtimes } from '../hooks/useShowtimes.js'
import { useCharacters } from '../hooks/useCharacters.js'
import { FILTER_CATEGORIES } from '../data/filterMap.js'

function hasUpcomingTime(show) {
  const cutoff = Date.now() - 10 * 60 * 1000
  return show.showtimes.some(t => new Date(t).getTime() >= cutoff)
}

function getNextShowtime(show) {
  const cutoff = Date.now() - 10 * 60 * 1000
  return show.showtimes.find(t => new Date(t).getTime() >= cutoff) ?? null
}

export default function ParkEvents({ locationId, locationKey, locationName, onSelectShow, onGoHome }) {
  const [activeCategory, setActiveCategory] = useState(FILTER_CATEGORIES.ALL)
  const [viewMode, setViewMode] = useState(VIEW_MODES.UPCOMING)

  const { shows, loading: showsLoading, error: showsError, isOffline, lastFetched } = useShowtimes(locationId)
  const { characters, loading: charsLoading } = useCharacters(locationKey)

  useEffect(() => {
    setActiveCategory(FILTER_CATEGORIES.ALL)
  }, [locationId])

  const allItems = [...shows, ...characters]
  const loading = showsLoading || charsLoading

  const categoryFiltered = activeCategory === FILTER_CATEGORIES.ALL
    ? allItems
    : allItems.filter(s => s.categories.includes(activeCategory))

  const displayShows = viewMode === VIEW_MODES.UPCOMING
    ? categoryFiltered
        .filter(hasUpcomingTime)
        .sort((a, b) => getNextShowtime(a).localeCompare(getNextShowtime(b)))
    : [...categoryFiltered].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Header title={locationName} />
      <OfflineBanner isOffline={isOffline} lastFetched={lastFetched} />

      <main className="flex-1 overflow-y-auto overscroll-y-none px-4 py-3" style={{ touchAction: 'pan-y' }}>
        {!locationId && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            Schedule information for {locationName} is not currently available.
          </p>
        )}
        {locationId && loading && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            Loading schedule...
          </p>
        )}
        {locationId && !loading && showsError && (
          <p className="text-center p-8 text-red-400">{showsError}</p>
        )}
        {locationId && !loading && !showsError && displayShows.length === 0 && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            {viewMode === VIEW_MODES.UPCOMING ? 'No upcoming shows.' : 'No shows found.'}
          </p>
        )}
        {locationId && !loading && displayShows.map(show => (
          <ShowCard key={show.id} show={show} onSelect={onSelectShow} />
        ))}
      </main>

      <FilterChips activeCategory={activeCategory} onFilterChange={setActiveCategory} />
      <ViewToggle viewMode={viewMode} onViewChange={setViewMode} onGoHome={onGoHome} />
    </div>
  )
}
