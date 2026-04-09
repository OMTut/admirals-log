import { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import OfflineBanner from '../components/OfflineBanner.jsx'
import DateNav from '../components/DateNav.jsx'
import FilterChips from '../components/FilterChips.jsx'
import ShowCard from '../components/ShowCard.jsx'
import WatchPeriodHeader from '../components/WatchPeriodHeader.jsx'
import { useShowtimes } from '../hooks/useShowtimes.js'
import { FILTER_CATEGORIES } from '../data/filterMap.js'
import { groupShowsByWatchPeriod } from '../data/watchPeriods.js'

function localToday() {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

export default function ParkEvents({ locationId, locationName, onSelectShow, onMenuOpen }) {
  const [selectedDate, setSelectedDate] = useState(localToday)
  const [activeCategory, setActiveCategory] = useState(FILTER_CATEGORIES.ALL)

  const { shows, loading, error, isOffline, lastFetched } = useShowtimes(locationId, selectedDate)

  // Reset filter when location or date changes
  useEffect(() => {
    setActiveCategory(FILTER_CATEGORIES.ALL)
  }, [locationId, selectedDate])

  const filteredShows = activeCategory === FILTER_CATEGORIES.ALL
    ? shows
    : shows.filter(s => s.category === activeCategory)

  const grouped = groupShowsByWatchPeriod(filteredShows)

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Header onMenuOpen={onMenuOpen} />
      <OfflineBanner isOffline={isOffline} lastFetched={lastFetched} />

      {/* Sub-header: location name + date nav */}
      <div className="flex items-center justify-between px-4 py-2 border-b shrink-0"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{locationName}</span>
        <DateNav date={selectedDate} onDateChange={setSelectedDate} />
      </div>

      <FilterChips activeCategory={activeCategory} onFilterChange={setActiveCategory} />

      <main className="flex-1 overflow-y-auto overscroll-y-none" style={{ touchAction: 'pan-y' }}>
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
        {locationId && !loading && error && (
          <p className="text-center p-8 text-red-400">{error}</p>
        )}
        {locationId && !loading && !error && filteredShows.length === 0 && (
          <p className="text-center p-8" style={{ color: 'var(--color-text-secondary)' }}>
            No shows found.
          </p>
        )}
        {locationId && !loading && grouped.map(({ period, shows: periodShows }) => (
          <div key={period}>
            <WatchPeriodHeader period={period} />
            {periodShows.map(show => (
              <ShowCard key={show.id} show={show} onSelect={onSelectShow} />
            ))}
          </div>
        ))}
      </main>
    </div>
  )
}
