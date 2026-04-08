export default function EventDetail({ show, onBack, onMenuOpen }) {
  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center justify-between px-4 py-3 bg-blue-900 text-white sticky top-0 z-10">
        <h1 className="text-base font-bold">Admiral Boom's Master's Log</h1>
        <button onClick={onMenuOpen} aria-label="Open menu" className="p-2 text-xl">☰</button>
      </header>
      <button onClick={onBack} className="px-4 py-3 text-sm text-blue-700 text-left">
        ← Back
      </button>
      <div className="px-4 py-2">
        <h2 className="text-xl font-bold">{show.name}</h2>
        <p className="text-sm text-gray-500">{show.location}</p>
      </div>
    </div>
  )
}
