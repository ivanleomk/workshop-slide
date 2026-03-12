import { useState, useEffect } from 'react'

const stages = [
  {
    label: 'Agent starts',
    sub: 'Session initialised, system prompt loaded',
    hook: { event: 'agent_start', desc: 'Setup logging, load config' },
  },
  {
    label: 'User sends message',
    sub: 'New message appended to conversation',
    hook: null,
  },
  {
    label: 'LLM generates response',
    sub: 'Model produces text and/or tool calls',
    hook: null,
  },
  {
    label: 'Tool call requested',
    sub: 'Model wants to invoke a tool',
    hook: { event: 'tool_call', desc: 'Approve, block, or log the call' },
  },
  {
    label: 'Tool executes',
    sub: 'Tool runs and returns a result',
    hook: { event: 'tool_result', desc: 'Filter or transform the result' },
  },
  {
    label: 'Loop continues',
    sub: 'Result fed back → model decides next step',
    hook: null,
    isLoop: true,
  },
  {
    label: 'Agent completes',
    sub: 'No more tool calls, final response sent',
    hook: { event: 'agent_end', desc: 'Cleanup, save memory, log session' },
  },
]

export default function AgentLifecycle() {
  const [active, setActive] = useState(-1)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    if (active >= stages.length - 1) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setActive((a) => a + 1), 800)
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
        <span className="ml-auto text-xs text-neutral-400">
          Agent Lifecycle
        </span>
      </div>

      {/* Diagram */}
      <div className="flex flex-col gap-0 px-6 py-6 pl-8">
        {stages.map((stage, i) => {
          const visible = i <= active
          const isCurrent = i === active

          return (
            <div key={stage.label} className="flex items-start gap-0">
              {/* Left: timeline */}
              <div className="flex flex-col items-center shrink-0" style={{ width: 28 }}>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-500 ${
                    visible
                      ? isCurrent
                        ? 'border-neutral-800 bg-neutral-800 text-white scale-110'
                        : 'border-neutral-300 bg-neutral-100 text-neutral-600'
                      : 'border-neutral-200 bg-white text-neutral-300'
                  }`}
                >
                  {stage.isLoop ? '↻' : i + 1}
                </div>
                {i < stages.length - 1 && (
                  <div className="relative h-10 w-px bg-neutral-200 overflow-hidden">
                    <div
                      className="absolute inset-0 bg-neutral-400 origin-top transition-transform duration-500"
                      style={{ transform: visible ? 'scaleY(1)' : 'scaleY(0)' }}
                    />
                  </div>
                )}
              </div>

              {/* Middle: stage info */}
              <div className="flex-1 pl-4 pb-5 pt-0.5 min-w-0">
                <div
                  className={`text-sm font-medium transition-colors duration-500 ${
                    visible ? 'text-neutral-900' : 'text-neutral-300'
                  }`}
                >
                  {stage.label}
                </div>
                <div
                  className={`text-xs mt-0.5 transition-all duration-500 ${
                    visible ? 'text-neutral-400 opacity-100' : 'opacity-0'
                  }`}
                >
                  {stage.sub}
                </div>
              </div>

              {/* Right: hook badge */}
              <div className="shrink-0 w-56 pt-0.5">
                {stage.hook && (
                  <div
                    className={`rounded-lg border px-3 py-2 transition-all duration-500 ${
                      visible
                        ? 'border-neutral-300 bg-neutral-50 opacity-100 translate-x-0'
                        : 'border-transparent bg-transparent opacity-0 translate-x-4'
                    }`}
                  >
                    <code className="text-[11px] font-semibold text-neutral-700">
                      {stage.hook.event}
                    </code>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {stage.hook.desc}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
