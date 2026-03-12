export default function ExtendingItself() {
  return (
    <div className="flex items-center gap-20 w-full">
      <div className="flex flex-col gap-4 shrink-0" style={{ width: 400 }}>
        <h1 className="font-serif text-[52px] font-normal leading-tight tracking-tight text-black">
          An agent that extends itself
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Skills, MCPs, extensions — they're all just ways to{' '}
          <span className="font-semibold text-neutral-600">
            give your agent more tools at runtime.
          </span>
        </p>
        <p className="text-[15px] leading-relaxed text-neutral-400">
          The real unlock: the agent can write new tools, register them, and reload — all without you touching the code.
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white px-6 py-5">
          <span className="font-serif text-[40px] leading-none tracking-tight text-neutral-200">01</span>
          <div className="flex flex-col gap-1 pt-1">
            <p className="text-lg font-semibold text-black">Hooks</p>
            <p className="text-base leading-relaxed text-neutral-400">
              Tap into the agent lifecycle — approve tool calls, log actions, block dangerous commands. You control what happens before and after every step.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white px-6 py-5">
          <span className="font-serif text-[40px] leading-none tracking-tight text-neutral-200">02</span>
          <div className="flex flex-col gap-1 pt-1">
            <p className="text-lg font-semibold text-black">Extensions</p>
            <p className="text-base leading-relaxed text-neutral-400">
              Register new tools with a name, description, and handler. The agent writes the code, saves the file, and reloads — instant new capabilities.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white px-6 py-5">
          <span className="font-serif text-[40px] leading-none tracking-tight text-neutral-200">03</span>
          <div className="flex flex-col gap-1 pt-1">
            <p className="text-lg font-semibold text-black">Hot reload</p>
            <p className="text-base leading-relaxed text-neutral-400">
              The agent calls <code className="text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded text-sm">/reload</code> and its new tools are live. No restart, no redeploy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
