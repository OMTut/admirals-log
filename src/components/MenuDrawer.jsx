const THEMES = [
  { id: 'admiral-boom', label: "Admiral Boom's Log" },
  { id: 'judy-hopps',   label: "Officer Hopps' Case File" },
]

export default function MenuDrawer({ isOpen, onClose, currentTheme, onThemeChange }) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-20"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-72 bg-white z-30 shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Settings</h2>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-gray-500 text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Theme</p>
          <div className="flex flex-col gap-2">
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => { onThemeChange(t.id); onClose() }}
                className={[
                  'text-left px-4 py-3 rounded border text-sm font-medium transition-colors',
                  currentTheme === t.id
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-gray-700 border-gray-300',
                ].join(' ')}
              >
                {currentTheme === t.id && '✓ '}{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
