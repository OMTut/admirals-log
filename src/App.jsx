import { useState, useEffect } from 'react'
import SwipeContainer from './components/SwipeContainer'
import Home from './screens/Home'
import ParkEvents from './screens/ParkEvents'
import EventDetail from './screens/EventDetail'
import { getLocationIds, getLiveShows } from './api/themeparks.js'
import { writeCache } from './api/cache.js'

const LOCATIONS = [
  { key: 'disneylandPark', label: 'Disneyland' },
  { key: 'dca',            label: 'DCA' },
  { key: 'hotels',         label: 'Hotels' },
  { key: 'downtownDisney', label: 'Downtown Disney' },
]

function todayString() {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

async function prewarmCache(ids) {
  const today = todayString()
  const parkIds = Object.entries(ids).filter(([, id]) => id !== null)
  await Promise.allSettled(
    parkIds.map(async ([, id]) => {
      try {
        const shows = await getLiveShows(id)
        writeCache(id, today, shows)
      } catch {
        // Silently ignore — offline or API unavailable
      }
    })
  )
}

function loadCachedLocationIds() {
  try {
    const raw = localStorage.getItem('locationIds')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const isStandalone = window.matchMedia('(display-mode: standalone)').matches

export default function App() {
  const [screenIndex, setScreenIndex] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('disneylandPark')
  const [selectedShow, setSelectedShow] = useState(null)
  const [locationIds, setLocationIds] = useState(loadCachedLocationIds)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)

  useEffect(() => {
    getLocationIds()
      .then(ids => {
        setLocationIds(ids)
        localStorage.setItem('locationIds', JSON.stringify(ids))
        prewarmCache(ids)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (isStandalone) return
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
      setShowInstallBanner(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (!installPrompt) return
    await installPrompt.prompt()
    setShowInstallBanner(false)
    setInstallPrompt(null)
  }

  function handleSelectLocation(key) {
    setSelectedLocation(key)
    setScreenIndex(1)
  }

  const locationId = locationIds?.[selectedLocation] ?? null
  const locationName = LOCATIONS.find(l => l.key === selectedLocation)?.label ?? ''

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <SwipeContainer
        currentIndex={screenIndex}
        onSwipeLeft={() => setScreenIndex(prev => Math.min(1, prev + 1))}
        onSwipeRight={() => setScreenIndex(prev => Math.max(0, prev - 1))}
      >
        <div className="w-full flex-shrink-0 h-full">
          <Home onSelectLocation={handleSelectLocation} />
        </div>

        <div className="w-full flex-shrink-0 h-full">
          <ParkEvents
            locationId={locationId}
            locationKey={selectedLocation}
            locationName={locationName}
            onSelectShow={setSelectedShow}
            onGoHome={() => setScreenIndex(0)}
          />
        </div>
      </SwipeContainer>

      {/* Event Detail slide-over */}
      <div
        className={`fixed inset-0 z-20 transition-transform duration-300 ${
          selectedShow ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        {selectedShow && (
          <EventDetail
            show={selectedShow}
            onBack={() => setSelectedShow(null)}
          />
        )}
      </div>

      {/* PWA install banner */}
      {showInstallBanner && (
        <div
          className="fixed bottom-4 left-4 right-4 rounded-lg p-4 flex items-center justify-between shadow-lg z-30"
          style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}
        >
          <p className="text-sm flex-1 mr-3">Add to your home screen for quick access at the park</p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstall}
              className="text-sm font-bold px-3 py-1 rounded"
              style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallBanner(false)}
              aria-label="Dismiss install prompt"
              className="text-lg leading-none"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
