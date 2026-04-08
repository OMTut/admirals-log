import { getCategoryForShow } from '../data/filterMap.js'

const BASE_URL = 'https://api.themeparks.wiki/v1'

// ─── Entity ID resolution (TASK-6) ───────────────────────────────────────────

// Hotels and Downtown Disney do not exist as separate entities in the
// themeparks.wiki API — only the two parks are available.
let _locationIds = null

export async function getLocationIds() {
  if (_locationIds) return _locationIds

  const res = await fetch(`${BASE_URL}/destinations`)
  if (!res.ok) throw new Error(`Destinations fetch failed: ${res.status}`)
  const { destinations } = await res.json()

  const resort = destinations.find(d => d.slug === 'disneylandresort')
  if (!resort) throw new Error('Disneyland Resort not found in API')

  const childRes = await fetch(`${BASE_URL}/entity/${resort.id}/children`)
  if (!childRes.ok) throw new Error(`Children fetch failed: ${childRes.status}`)
  const { children } = await childRes.json()

  const parks = children.filter(c => c.entityType === 'PARK')

  _locationIds = {
    disneylandPark:  parks.find(p => p.name.includes('Disneyland Park'))?.id ?? null,
    dca:             parks.find(p => p.name.includes('California Adventure'))?.id ?? null,
    hotels:          null, // Not available as a separate entity in the API
    downtownDisney:  null, // Not available as a separate entity in the API
  }

  Object.entries(_locationIds).forEach(([key, id]) => {
    if (!id) console.warn(`[themeparks] No entity ID found for: ${key}`)
  })

  return _locationIds
}

// ─── Live show data (TASK-7) ─────────────────────────────────────────────────

export async function getLiveShows(entityId) {
  if (!entityId) return []

  const res = await fetch(`${BASE_URL}/entity/${entityId}/live`)
  if (!res.ok) throw new Error(`Live data fetch failed: ${res.status}`)
  const { liveData } = await res.json()

  return liveData
    .filter(e => e.entityType === 'SHOW' && e.showtimes?.length > 0)
    .map(raw => {
      const show = normalizeShow(raw)
      show.category = getCategoryForShow(show)
      return show
    })
}

function normalizeShow(raw) {
  return {
    id:          raw.id,
    name:        raw.name,
    entityType:  raw.entityType,
    status:      raw.status ?? 'UNKNOWN',
    // land/location not provided by the live endpoint
    location:    null,
    // images not provided by the live endpoint
    imageUrl:    null,
    // showtimes as ISO strings sorted ascending
    showtimes:   (raw.showtimes ?? [])
      .map(s => s.startTime)
      .sort(),
    category:    null, // assigned below after object is built
  }
}
