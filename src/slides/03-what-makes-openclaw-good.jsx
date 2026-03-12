export default function WhatMakesOpenClawGood() {
  const points = [
    {
      num: '01',
      title: 'A strong model',
      desc: 'A decent model running in the background to handle your queries.',
    },
    {
      num: '02',
      title: 'Growing context',
      desc: 'As you interact more, it builds context on you and uses it to understand you better.',
    },
    {
      num: '03',
      title: 'Self-extending',
      desc: 'It can modify its environment, add skills, and rewrite its own tools over time.',
    },
  ]

  return (
    <div className="flex items-center gap-20 w-full">
      {/* Left: Title */}
      <div className="flex flex-col gap-4 shrink-0" style={{ width: 380 }}>
        <h1 className="font-serif text-[52px] font-normal leading-tight tracking-tight text-black">
          What makes OpenClaw good?
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Three ingredients that make the fastest-growing repo in GitHub history tick.
        </p>
      </div>

      {/* Right: Cards */}
      <div className="flex flex-1 flex-col gap-4">
        {points.map((p) => (
          <div
            key={p.num}
            className="flex items-start gap-5 rounded-2xl border border-neutral-200 bg-white px-6 py-5"
          >
            <span className="font-serif text-[40px] leading-none tracking-tight text-neutral-200">
              {p.num}
            </span>
            <div className="flex flex-col gap-1 pt-1">
              <p className="text-lg font-semibold text-black">{p.title}</p>
              <p className="text-base leading-relaxed text-neutral-400">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
