export default function OpenClawMemory() {
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          How OpenClaw remembers
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Three files.{' '}
          <span className="font-semibold text-neutral-600">
            That's the entire memory system.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        {/* SOUL.md */}
        <div className="flex-1 min-w-0 flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-neutral-100">
            <p className="text-[15px] font-semibold text-black font-mono">SOUL.md</p>
            <p className="text-[13px] text-neutral-400 mt-0.5">Who the agent is</p>
          </div>
          <div className="px-5 py-4 flex-1 flex flex-col gap-2">
            <p className="text-[14px] leading-relaxed text-neutral-500">
              The agent's identity file — like <code className="text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded text-[13px]">AGENTS.md</code> but for personality. Tone, communication style, user preferences, boundaries.
            </p>
            <p className="text-[14px] leading-relaxed text-neutral-500">
              Read-only during memory flushes. The agent reads it but never overwrites it.
            </p>
          </div>
        </div>

        {/* memory/YYYY-MM-DD.md */}
        <div className="flex-1 min-w-0 flex flex-col rounded-2xl border border-emerald-300 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-neutral-100">
            <p className="text-[15px] font-semibold text-black font-mono">memory/2026-03-12.md</p>
            <p className="text-[13px] text-emerald-600 mt-0.5">What happened today</p>
          </div>
          <div className="px-5 py-4 flex-1 flex flex-col gap-2">
            <p className="text-[14px] leading-relaxed text-neutral-500">
              Before the context window fills up, the agent flushes durable memories to a daily markdown file. Timestamped, append-only.
            </p>
            <p className="text-[14px] leading-relaxed text-neutral-500">
              One file per day. Always appends, never overwrites. A running log of everything worth remembering.
            </p>
          </div>
        </div>

        {/* Raw JSONL */}
        <div className="flex-1 min-w-0 flex flex-col rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-neutral-100">
            <p className="text-[15px] font-semibold text-black font-mono">chat.jsonl</p>
            <p className="text-[13px] text-neutral-400 mt-0.5">The raw transcript</p>
          </div>
          <div className="px-5 py-4 flex-1 flex flex-col gap-2">
            <p className="text-[14px] leading-relaxed text-neutral-500">
              Every message — user and model — stored as structured JSON, one line per turn. The complete, uncompressed ground truth.
            </p>
            <p className="text-[14px] leading-relaxed text-neutral-500">
              The daily memory files are summaries. This is the full recording.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
