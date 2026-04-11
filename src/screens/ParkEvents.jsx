import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import OfflineBanner from '../components/OfflineBanner.jsx'
import FilterChips from '../components/FilterChips.jsx'
import ViewToggle, { VIEW_MODES } from '../components/ViewToggle.jsx'
import ShowCard from '../components/ShowCard.jsx'
import { useShowtimes } from '../hooks/useShowtimes.js'
import { useCharacters } from '../hooks/useCharacters.js'
import { useDowntownDisney } from '../hooks/useDowntownDisney.js'
import { useHotels } from '../hooks/useHotels.js'
import { FILTER_CATEGORIES } from '../data/filterMap.js'

const HOTEL_CHIPS = ['Shows', 'Events']

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
  const { shows: ddShows, loading: ddLoading, error: ddError } = useDowntownDisney(locationKey)
  const { shows: hotelShows } = useHotels(locationKey)

  useEffect(() => {
    setActiveCategory(FILTER_CATEGORIES.ALL)
  }, [locationKey])

  const isDD = locationKey === 'downtownDisney'
  const isHotels = locationKey === 'hotels'
  const hasSource = locationId !== null || isDD || isHotels
  const allItems = isDD ? ddShows : isHotels ? hotelShows : [...shows, ...characters]
  const loading = isDD ? ddLoading : isHotels ? false : (showsLoading || charsLoading)
  const error = isDD ? ddError : isHotels ? null : showsError

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
      {!isDD && <OfflineBanner isOffline={isOffline} lastFetched={lastFetched} />}

      <main className="flex-1 overflow-y-auto overscroll-y-none px-4 py-3" style={{ touchAction: 'pan-y' }}>
        {!hasSource && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            Schedule information for {locationName} is not currently available.
          </p>
        )}
        {hasSource && loading && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            Loading schedule...
          </p>
        )}
        {hasSource && !loading && error && (
          <p className="text-center p-8 text-red-400">{error}</p>
        )}
        {hasSource && !loading && !error && displayShows.length === 0 && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            {viewMode === VIEW_MODES.UPCOMING ? 'No upcoming shows.' : 'No shows found.'}
          </p>
        )}
        {hasSource && !loading && displayShows.map(show => (
          <ShowCard key={show.id} show={show} onSelect={onSelectShow} />
        ))}
      </main>

      {!isDD && (
        <FilterChips
          activeCategory={activeCategory}
          onFilterChange={setActiveCategory}
          chips={isHotels ? HOTEL_CHIPS : undefined}
        />
      )}
      <ViewToggle viewMode={viewMode} onViewChange={setViewMode} onGoHome={onGoHome} />
    </div>
  )
}
