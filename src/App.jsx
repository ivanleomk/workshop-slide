function App() {
  return (
    <div className="bg-[#f8f7f4] font-sans">
      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center gap-6">
        <h1 className="max-w-3xl text-center font-serif text-6xl leading-[1.1] tracking-tight text-black md:text-7xl">
          Building Agents.
        </h1>
        <p className="max-w-lg text-center text-lg leading-relaxed text-neutral-400">
          A beginner-friendly workshop on building agents from first principles.
        </p>
        <div className="mt-4 flex items-center gap-6">
          <a href="#agenda" className="rounded-full border border-neutral-300 bg-white px-7 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:border-neutral-400">
            Get Started
          </a>
          <a href="#agenda" className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-700">
            See Agenda <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      {/* Agenda */}
      <section id="agenda" className="mx-auto min-h-screen max-w-lg py-20">
        <h2 className="font-serif text-5xl tracking-tight text-black md:text-6xl">
          Building Agents
        </h2>
        <p className="mt-3 text-lg text-neutral-400">(no frameworks)</p>

        <div className="mt-12 flex flex-col">
          {[
            { title: "The Lay of the Land", desc: "Understanding agent architecture — the loop between LLMs, context, and tools." },
            { title: "Tool Calling", desc: "How structured outputs let your agent read files, run commands, and act on the world." },
            { title: "The Tool Factory", desc: "Using Pydantic to build a runtime that makes defining new tools effortless." },
            { title: "Self-Extension", desc: "Teaching your agent to write its own tools and hot-reload capabilities on the fly." },
            { title: "Lifecycle Hooks", desc: "Building guardrails, approval gates, and logging into the agent lifecycle." },
            { title: "ET Phone Home", desc: "Deploying on Telegram with ngrok — text your agent from your phone." },
          ].map((item, i, arr) => (
            <div
              key={item.title}
              className={`flex flex-col gap-1.5 border-t border-neutral-200 py-6 ${i === arr.length - 1 ? "border-b" : ""}`}
            >
              <h3 className="text-[17px] font-semibold text-neutral-900">{item.title}</h3>
              <p className="text-[15px] text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
