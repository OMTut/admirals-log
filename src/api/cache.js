function cacheKey(locationId, date) {
  return `shows:${locationId}:${date}`
}

export function writeCache(locationId, date, shows, fetchedAt = new Date()) {
  try {
    localStorage.setItem(
      cacheKey(locationId, date),
      JSON.stringify({ shows, fetchedAt: fetchedAt.toISOString() })
    )
  } catch (e) {
    console.warn('[cache] Write failed:', e)
  }
}

export function readCache(locationId, date) {
  try {
    const raw = localStorage.getItem(cacheKey(locationId, date))
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}
