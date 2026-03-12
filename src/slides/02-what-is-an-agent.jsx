import agentImg from '../assets/agent.png'

export default function WhatIsAnAgent() {
  return (
    <div className="flex items-center gap-20 w-full">
      {/* Left: Title */}
      <div className="flex flex-col gap-4 shrink-0" style={{ width: 420 }}>
        <h1 className="font-serif text-[52px] font-normal leading-tight tracking-tight text-black">
          What is an Agent?
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          An LLM running in a loop,{' '}
          <span className="font-semibold text-neutral-600">
            burning tokens until the job is done.
          </span>
        </p>
        <p className="text-lg leading-relaxed text-neutral-400">
          Why does this work?
        </p>
      </div>

      {/* Right: Diagram image */}
      <div className="flex flex-1 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-8">
        <img src={agentImg} alt="Agent loop diagram" className="max-w-full h-auto" />
      </div>
    </div>
  )
}
