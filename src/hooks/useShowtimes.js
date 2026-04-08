import { useState, useEffect, useRef, useCallback } from 'react'
import { getLiveShows } from '../api/themeparks.js'
import { readCache, writeCache } from '../api/cache.js'

const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes

export function useShowtimes(locationId, date) {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  const intervalRef = useRef(null)

  const fetchShows = useCallback(async () => {
    if (!locationId) {
      setShows([])
      setLoading(false)
      return
    }

    try {
      setError(null)
      const data = await getLiveShows(locationId)
      setShows(data)
      setIsOffline(false)
      const now = new Date()
      setLastFetched(now)
      writeCache(locationId, date, data, now)
    } catch (err) {
      // Fall back to cache on any fetch failure
      const cached = readCache(locationId, date)
      if (cached) {
        setShows(cached.shows)
        setLastFetched(new Date(cached.fetchedAt))
        setIsOffline(true)
        setError(null)
      } else {
        setShows([])
        setIsOffline(true)
        setError('No connection and no cached data available.')
      }
    } finally {
      setLoading(false)
    }
  }, [locationId, date])

  // Initial fetch + 5-minute refresh interval
  useEffect(() => {
    setLoading(true)
    fetchShows()

    intervalRef.current = setInterval(fetchShows, REFRESH_INTERVAL)
    return () => clearInterval(intervalRef.current)
  }, [fetchShows])

  // Online/offline event listeners
  useEffect(() => {
    const goOnline = () => {
      setIsOffline(false)
      fetchShows()
    }
    const goOffline = () => setIsOffline(true)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [fetchShows])

  return { shows, loading, error, lastFetched, isOffline }
}
