import { useTheme } from '../themes/index.jsx'

const THEMES = [
  { id: 'admiral-boom', label: "Admiral Boom's Log" },
  { id: 'judy-hopps',   label: "Officer Hopps' Case File" },
]

export default function MenuDrawer({ isOpen, onClose }) {
  const { themeId, setTheme } = useTheme()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-20"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-72 z-30 shadow-xl flex flex-col"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Settings</h2>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-xl leading-none"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Theme
          </p>
          <div className="flex flex-col gap-2">
            {THEMES.map(t => {
              const isActive = themeId === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); onClose() }}
                  className="text-left px-4 py-3 rounded border text-sm font-medium transition-colors"
                  style={isActive ? {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-bg)',
                    borderColor: 'var(--color-primary)',
                  } : {
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  {isActive && '✓ '}{t.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
