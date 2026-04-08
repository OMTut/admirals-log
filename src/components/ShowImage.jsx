import { useState } from 'react'

export default function ShowImage({ imageUrl, showName }) {
  const [failed, setFailed] = useState(false)

  if (!imageUrl || failed) {
    return (
      <div className="w-full h-48 rounded flex flex-col items-center justify-center gap-2"
        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}
      >
        <span className="text-3xl">⚓</span>
        <span className="text-sm">No image available</span>
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={showName}
      className="w-full h-48 object-cover rounded"
      onError={() => setFailed(true)}
    />
  )
}
