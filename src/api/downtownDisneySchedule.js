import showContentDD from '../data/showContentDD.js'

const WORKER_URL = 'https://broad-base-169b.tuttiak.workers.dev/downtown'
const CACHE_KEY = 'downtownDisneySchedule'
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

// Extracts the ThemeParkIQ slug from a /entertainment/[slug]/calendar URL
function slugFromHref(href) {
  const match = href.match(/\/entertainment\/([^/]+)\/calendar/)
  return match ? match[1] : null
}

function parseHTML(html) {
  const dateStr = getTodayInLA()
  const doc = new DOMParser().parseFromString(html, 'text/html')
  const results = []
  const processedSlugs = new Set()

  // Show links have a title attribute; nav links don't
  doc.querySelectorAll('a[href*="/entertainment/"][title]').forEach(link => {
    const slug = slugFromHref(link.getAttribute('href') || '')
    if (!slug || processedSlugs.has(slug)) return
    processedSlugs.add(slug)

    const showName = link.getAttribute('title')?.trim()
    if (!showName) return

    // Walk up from the link to find the card container that holds times
    const timePattern = /\d{1,2}:\d{2}\s*[ap]m/i
    let card = link.parentElement
    for (let i = 0; i < 8; i++) {
      if (!card) break
      if (timePattern.test(card.textContent)) break
      card = card.parentElement
    }

    if (!card) return

    const timeMatches = card.textContent.match(/\d{1,2}:\d{2}\s*[ap]m/gi) || []
    const showtimes = timeMatches
      .map(t => parsePacificTimeToISO(t, dateStr))
      .filter(Boolean)
      .sort()

    if (showtimes.length === 0) return

    const content = showContentDD[slug] ?? {}

    results.push({
      id:              `dd-${slug}`,
      name:            showName,
      park:            'downtownDisney',
      category:        'Shows',
      categories:      ['Shows'],
      location:        content.location        ?? 'Downtown Disney District',
      imageUrl:        content.imageUrl        ?? null,
      description:     content.description     ?? null,
      duration:        content.duration        ?? null,
      preciseLocation: content.preciseLocation ?? null,
      entityType:      'SHOW',
      status:          'OPERATING',
      showtimes,
    })
  })

  return results
}

export async function getDowntownDisneySchedule() {
  const cached = readCache()
  if (cached) return cached

  const res = await fetch(WORKER_URL)
  if (!res.ok) throw new Error(`Downtown Disney schedule fetch failed: ${res.status}`)

  const html = await res.text()
  const shows = parseHTML(html)

  writeCache(shows)
  return shows
}
