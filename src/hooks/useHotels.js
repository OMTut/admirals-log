import { useState, useEffect } from 'react'
import { getHotelShows } from '../api/hotelShows.js'

export function useHotels(locationKey) {
  const [shows, setShows] = useState([])

  useEffect(() => {
    if (locationKey !== 'hotels') {
      setShows([])
      return
    }
    setShows(getHotelShows())
  }, [locationKey])

  return { shows }
}
