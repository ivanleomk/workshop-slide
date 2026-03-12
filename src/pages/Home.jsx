import { Link } from 'react-router'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f4] font-sans">
      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        <h1 className="max-w-3xl text-center font-serif text-6xl leading-[1.1] tracking-tight text-black md:text-7xl">
          Building Agents.
        </h1>
        <p className="max-w-lg text-center text-lg leading-relaxed text-neutral-400">
          A beginner-friendly workshop on building agents from first principles.
        </p>
        <div className="mt-4 flex items-center gap-6">
          <Link to="/agenda" className="rounded-full border border-neutral-300 bg-white px-7 py-3 text-sm font-medium text-neutral-900 shadow-sm hover:border-neutral-400">
            Get Started
          </Link>
          <Link to="/agenda" className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-neutral-700">
            See Agenda <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
    </div>
  )
}
