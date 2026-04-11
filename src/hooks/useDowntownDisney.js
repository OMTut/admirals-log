import { useState, useEffect } from 'react'
import { getDowntownDisneySchedule } from '../api/downtownDisneySchedule.js'

const REFRESH_INTERVAL = 30 * 60 * 1000 // 30 minutes

export function useDowntownDisney(locationKey) {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (locationKey !== 'downtownDisney') {
      setShows([])
      setLoading(false)
      setError(null)
      return
    }

    let intervalId

    async function fetchShows() {
      setLoading(true)
      setError(null)
      try {
        const data = await getDowntownDisneySchedule()
        setShows(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
    intervalId = setInterval(fetchShows, REFRESH_INTERVAL)
    return () => clearInterval(intervalId)
  }, [locationKey])

  return { shows, loading, error }
}
