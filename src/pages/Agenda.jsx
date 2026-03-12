import { Link } from 'react-router'

const items = [
  { title: "The Lay of the Land", slug: "the_lay_of_the_land", desc: "Understanding agent architecture — the loop between LLMs, context, and tools." },
  { title: "Tool Calling", slug: "tool_calling", desc: "How structured outputs let your agent read files, run commands, and act on the world." },
  { title: "The Tool Factory", slug: "the_tool_factory", desc: "Using Pydantic to build a runtime that makes defining new tools effortless." },
  { title: "Self-Extension", slug: "self_extension", desc: "Teaching your agent to write its own tools and hot-reload capabilities on the fly." },
  { title: "Lifecycle Hooks", slug: "lifecycle_hooks", desc: "Building guardrails, approval gates, and logging into the agent lifecycle." },
  { title: "ET Phone Home", slug: "et_phone_home", desc: "Deploying on Telegram with ngrok — text your agent from your phone." },
]

export default function Agenda() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f4] font-sans">
      <section className="mx-auto flex min-h-screen max-w-lg flex-col justify-center py-20">
        <h2 className="font-serif text-5xl tracking-tight text-black md:text-6xl">
          Building Agents
        </h2>
        <p className="mt-3 text-lg text-neutral-400">A no-nonsense guide to how we can build agents with nothing but raw vanilla python</p>

        <div className="mt-12 flex flex-col">
          {items.map((item, i) => (
            <Link
              key={item.title}
              to={`/page/${item.slug}`}
              className={`flex flex-col gap-1.5 border-t border-neutral-200 py-6 -mx-4 px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-white/60 ${i === items.length - 1 ? "border-b" : ""}`}
            >
              <h3 className="text-[17px] font-semibold text-neutral-900">{item.title}</h3>
              <p className="text-[15px] text-neutral-500">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
