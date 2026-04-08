import { useState } from 'react'

export default function ShowImage({ imageUrl, showName }) {
  const [failed, setFailed] = useState(false)

  if (!imageUrl || failed) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded flex flex-col items-center justify-center gap-2 text-gray-400">
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
