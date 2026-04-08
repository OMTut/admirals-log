import { useState, useEffect } from 'react'
import SwipeContainer from './components/SwipeContainer'
import Home from './screens/Home'
import ParkEvents from './screens/ParkEvents'
import EventDetail from './screens/EventDetail'
import { getLocationIds } from './api/themeparks.js'

const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'DCA' },
  { key: 'hotels',         label: 'Hotels' },
  { key: 'downtownDisney', label: 'Downtown Disney' },
]

export default function App() {
  const [screenIndex, setScreenIndex] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('disneylandPark')
  const [selectedShow, setSelectedShow] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [locationIds, setLocationIds] = useState(null)

  // Resolve entity IDs once on mount
  useEffect(() => {
    getLocationIds().then(setLocationIds).catch(console.error)
  }, [])

  function handleSelectLocation(key) {
    setSelectedLocation(key)
    setScreenIndex(1)
  }

  const locationId = locationIds?.[selectedLocation] ?? null
  const locationName = LOCATIONS.find(l => l.key === selectedLocation)?.label ?? ''

  return (
    <div className="fixed inset-0 flex flex-col">
      <SwipeContainer
        currentIndex={screenIndex}
        onSwipeLeft={() => setScreenIndex(prev => Math.min(1, prev + 1))}
        onSwipeRight={() => setScreenIndex(prev => Math.max(0, prev - 1))}
      >
        {/* Screen 1 — Home */}
        <div className="w-full flex-shrink-0 h-full">
          <Home
            onSelectLocation={handleSelectLocation}
            onMenuOpen={() => setMenuOpen(true)}
          />
        </div>

        {/* Screen 2 — Park Events */}
        <div className="w-full flex-shrink-0 h-full">
          <ParkEvents
            locationId={locationId}
            locationName={locationName}
            onSelectShow={setSelectedShow}
            onMenuOpen={() => setMenuOpen(true)}
          />
        </div>
      </SwipeContainer>

      {/* Screen 3 — Event Detail (slide-over) */}
      <div
        className={`fixed inset-0 z-20 bg-white transition-transform duration-300 ${
          selectedShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedShow && (
          <EventDetail
            show={selectedShow}
            onBack={() => setSelectedShow(null)}
            onMenuOpen={() => setMenuOpen(true)}
          />
        )}
      </div>
    </div>
  )
}
