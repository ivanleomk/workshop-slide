import { useState, useEffect } from 'react'

const steps = [
  { label: 'User prompt', sub: '"Read README.md"' },
  { label: 'LLM decides', sub: 'function_call: read_file' },
  { label: 'Execute tool', sub: "read_file(path='README.md')" },
  { label: 'Return result', sub: 'tool response → LLM' },
  { label: 'LLM responds', sub: 'Final text answer' },
]

export default function ToolCallFlow() {
  const [active, setActive] = useState(-1)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= steps.length - 1) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setActive((a) => a + 1), 600)
    return () => clearTimeout(timer)
  }, [playing, active])

  const handlePlay = () => {
    setActive(0)
    setPlaying(true)
  }

  const handleReset = () => {
    setActive(-1)
    setPlaying(false)
  }

  return (
    <div className="my-8 rounded-xl border border-neutral-200 bg-white overflow-hidden">
      {/* Controls */}
      <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3">
        <button
          onClick={handlePlay}
          disabled={playing}
          className="rounded-md border border-neutral-200 px-3 py-1 text-xs text-neutral-500 hover:bg-neutral-50 disabled:opacity-30 transition-colors"
        >
          Play
        </button>
        <button
          onClick={handleReset}
          className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs text-neutral-500 hover:bg-neutral-50 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-0 p-6 pl-8">
        {steps.map((step, i) => {
          const visible = i <= active
          const isCurrent = i === active
          return (
            <div key={step.label} className="flex items-start gap-4">
              {/* Connector line + circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${
                    visible
                      ? isCurrent
                        ? 'border-neutral-800 bg-neutral-800 text-white scale-110'
                        : 'border-neutral-300 bg-neutral-100 text-neutral-600'
                      : 'border-neutral-200 bg-white text-neutral-300'
                  }`}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="relative h-8 w-px bg-neutral-200 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-neutral-400 origin-top transition-transform duration-500"
                      style={{ transform: visible ? 'scaleY(1)' : 'scaleY(0)' }}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="pb-4 pt-0.5">
                <span
                  className={`text-sm font-medium transition-colors duration-500 ${
                    visible ? 'text-neutral-900' : 'text-neutral-300'
                  }`}
                >
                  {step.label}
                </span>
                <span
                  className={`ml-2 font-mono text-xs transition-all duration-500 ${
                    visible ? 'text-neutral-400 opacity-100' : 'text-neutral-200 opacity-0'
                  }`}
                >
                  {step.sub}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
