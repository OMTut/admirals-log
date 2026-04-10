const SCHEDULE_URL = 'https://broad-base-169b.tuttiak.workers.dev'
const CACHE_KEY = 'characterSchedule'
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, fetchedAt } = JSON.parse(raw)
    if (Date.now() - new Date(fetchedAt).getTime() > CACHE_TTL) return null
    return data
  } catch { return null }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, fetchedAt: new Date().toISOString() }))
  } catch {}
}

// Returns today's date as "YYYY-MM-DD" in Pacific time
function getTodayInLA() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date())
}

// Converts "8:00 AM" (Pacific) to a UTC ISO string, handling DST automatically
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

  // Determine Pacific UTC offset for this date (handles PDT vs PST automatically)
  const noon = new Date(`${dateStr}T12:00:00Z`)
  const noonHourInLA = parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      hour12: false,
    }).format(noon)
  )
  const offsetHours = noonHourInLA - 12 // -7 for PDT, -8 for PST
  const sign = offsetHours < 0 ? '-' : '+'
  const offsetStr = `${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:00`

  return new Date(`${dateStr}T${paddedHour}:${paddedMinute}:00${offsetStr}`).toISOString()
}

// Extracts startTime from the showLocationMap() onclick attribute
function parseStartTime(onclick) {
  const match = onclick.match(
    /showLocationMap\([^,]+,\s*[^,]+,\s*"[^"]*",\s*"[^"]*",\s*"([^"]*)"/
  )
  return match ? match[1] : null
}

function parseHTML(html) {
  const dateStr = getTodayInLA()
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const results = []
  const processedCards = new Set()

  // Find each character card by locating the character image link
  doc.querySelectorAll('a[href*="/character/"] img[alt]').forEach(img => {
    // Walk up: img → <a> → div.flex-shrink-0 → main row div → CARD
    const card = img.parentElement?.parentElement?.parentElement?.parentElement
    if (!card || processedCards.has(card)) return
    processedCards.add(card)

    const charName = img.getAttribute('alt')?.trim()
    const imageUrl = img.getAttribute('src') || null
    if (!charName) return

    // The appearances section is the second direct child of the card (div.border-t)
    const appearancesSection = Array.from(card.children).find(el =>
      el.classList.contains('border-t')
    )
    if (!appearancesSection) return

    // Each direct child of the appearances section is a park block
    Array.from(appearancesSection.children).forEach(parkBlock => {
      const parkNameEl = parkBlock.querySelector('div.font-medium')
      const parkLabel = parkNameEl?.textContent?.trim() || ''

      let parkKey, parkDisplayName
      if (parkLabel.includes('California Adventure')) {
        parkKey = 'dca'
        parkDisplayName = 'Disney California Adventure'
      } else if (parkLabel.includes('Disneyland')) {
        parkKey = 'disneylandPark'
        parkDisplayName = 'Disneyland Park'
      } else {
        return
      }

      // Each div.mb-2 is a location group within the park
      parkBlock.querySelectorAll('div.mb-2').forEach(group => {
        const locationEl = group.querySelector('div.text-gray-500')
        const locationText = locationEl?.textContent?.replace(/\s+/g, ' ').trim() || ''

        // Location text is "Land - Specific" or just "Land"
        const dashIdx = locationText.indexOf(' - ')
        const land = dashIdx >= 0 ? locationText.slice(0, dashIdx).trim() : locationText.trim()
        const specific = dashIdx >= 0 ? locationText.slice(dashIdx + 3).trim() : null

        const fullLocation = specific
          ? `${parkDisplayName} - ${land} - ${specific}`
          : `${parkDisplayName} - ${land}`

        const showtimes = []
        group.querySelectorAll('button[onclick]').forEach(btn => {
          const startTime = parseStartTime(btn.getAttribute('onclick') || '')
          if (!startTime) return
          const iso = parsePacificTimeToISO(startTime, dateStr)
          if (iso) showtimes.push(iso)
        })

        if (showtimes.length === 0) return
        showtimes.sort()

        const idKey = `${charName}-${parkKey}-${land}-${specific || ''}`
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '')

        results.push({
          id:              `char-${idKey}`,
          name:            charName,
          park:            parkKey,
          category:        'Characters',
          categories:      ['Characters'],
          location:        fullLocation,
          imageUrl,
          description:     null,
          duration:        null,
          preciseLocation: null,
          entityType:      'CHARACTER',
          status:          'OPERATING',
          showtimes,
        })
      })
    })
  })

  return results
}

export async function getCharacterSchedule() {
  const cached = readCache()
  if (cached) return cached

  const res = await fetch(SCHEDULE_URL)
  if (!res.ok) throw new Error(`Character schedule fetch failed: ${res.status}`)

  const html = await res.text()
  const characters = parseHTML(html)

  writeCache(characters)
  return characters
}
