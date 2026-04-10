export default function MenuDrawer({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-20" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-72 z-30 shadow-xl flex flex-col"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-xl leading-none"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  )
}
