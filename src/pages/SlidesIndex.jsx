import { Link } from 'react-router'
import slides from '../slides'

export default function SlidesIndex() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f7f4] font-sans">
      <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center py-20">
        <h2 className="font-serif text-5xl tracking-tight text-black md:text-6xl">
          Slides
        </h2>
        <p className="mt-3 text-lg text-neutral-400">Building Agents from first principles.</p>

        <div className="mt-12 flex flex-col">
          {slides.map((slide, i) => (
            <Link
              key={slide.id}
              to={`/slides/${slide.id}`}
              className={`flex flex-col gap-1.5 border-t border-neutral-200 py-6 -mx-4 px-4 rounded-lg transition-colors duration-300 ease-in-out hover:bg-white/60 ${i === slides.length - 1 ? 'border-b' : ''}`}
            >
              <h3 className="text-[17px] font-semibold text-neutral-900">{slide.title}</h3>
              <p className="text-[15px] text-neutral-500">{slide.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
