import { useState, useEffect } from 'react'
import { getCharacterSchedule } from '../api/characterSchedule.js'

export function useCharacters(locationKey) {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    if (locationKey !== 'disneylandPark' && locationKey !== 'dca') {
      setCharacters([])
      setLoading(false)
      return
    }

    setLoading(true)

    getCharacterSchedule()
      .then(all => {
        if (cancelled) return
        setCharacters(all.filter(c => c.park === locationKey))
        setError(null)
      })
      .catch(err => {
        if (cancelled) return
        setError(err.message)
        setCharacters([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [locationKey])

  return { characters, loading, error }
}
