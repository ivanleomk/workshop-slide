export default function ThatsAnAgent() {
  const pieces = [
    { label: 'A loop', detail: 'Keep running until the job is done.' },
    { label: 'Tools', detail: 'Let it read, write, search, and call APIs.' },
    { label: 'Freedom to act', detail: 'The model decides which tool to use and when to stop.' },
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full text-center">
      <div className="flex flex-col gap-3">
        <h1 className="font-serif text-[56px] font-normal leading-tight tracking-tight text-black">
          That's it. That's an agent.
        </h1>
        <p className="text-xl leading-relaxed text-neutral-400 max-w-2xl mx-auto">
          Give a model the freedom to choose its own tools and decide when it's done —{' '}
          <span className="font-semibold text-neutral-600">
            and you have an agent.
          </span>
        </p>
      </div>

      <div className="flex gap-6">
        {pieces.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-8 py-7"
            style={{ width: 240 }}
          >
            <span className="font-serif text-[40px] leading-none tracking-tight text-neutral-200">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-lg font-semibold text-black">{p.label}</p>
            <p className="text-[15px] leading-relaxed text-neutral-400">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
