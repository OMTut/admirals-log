import showContentHotels from '../data/showContentHotels.js'

function getTodayInLA() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date())
}

function parsePacificTimeToISO(timeStr, dateStr) {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null

  let hour = parseInt(match[1])
  const minute = parseInt(match[2])
  const meridiem = match[3].toUpperCase()

  if (meridiem === 'PM' && hour !== 12) hour += 12
  if (meridiem === 'AM' && hour === 12) hour = 0

  const paddedHour = String(hour).padStart(2, '0')
  const paddedMinute = String(minute).padStart(2, '0')

  const noon = new Date(`${dateStr}T12:00:00Z`)
  const noonHourInLA = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hour12: false,
    }).format(noon)
  )
  const offsetHours = noonHourInLA - 12
  const sign = offsetHours < 0 ? '-' : '+'
  const offsetStr = `${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`

  return new Date(`${dateStr}T${paddedHour}:${paddedMinute}:00${offsetStr}`).toISOString()
}

export function getHotelShows() {
  const dateStr = getTodayInLA()
  return showContentHotels.map(show => ({
    ...show,
    category:   show.categories[0],
    entityType: 'SHOW',
    status:     'OPERATING',
    showtimes:  show.dailyTimes
      .map(t => parsePacificTimeToISO(t, dateStr))
      .filter(Boolean)
      .sort(),
  }))
}
