import { useParams, Link, useNavigate } from 'react-router'
import { useEffect, useCallback } from 'react'
import slides from '../slides'

export default function SlidePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const index = slides.findIndex((s) => s.id === id)
  const slide = slides[index]

  const goTo = useCallback(
    (next) => {
      if (next >= 0 && next < slides.length) {
        navigate(`/slides/${slides[next].id}`)
      }
    },
    [navigate],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goTo(index + 1)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(index - 1)
      }
      if (e.key === 'Escape') {
        navigate('/slides')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, goTo, navigate])

  if (!slide) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8f7f4] font-sans">
        <p className="text-neutral-400">Slide not found.</p>
      </div>
    )
  }

  const SlideContent = slide.component

  return (
    <div className="flex h-screen flex-col bg-[#f8f7f4] font-sans select-none overflow-hidden">
      <main className="flex flex-1 items-center justify-center overflow-hidden px-16">
        <div className="w-full max-w-5xl max-h-[calc(100vh-220px)] overflow-y-auto">
          <SlideContent />
        </div>
      </main>

      <footer className="flex items-center justify-between border-t border-neutral-200 px-6 py-3">
        <Link
          to="/slides"
          className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          ← Slides
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="rounded-md border border-neutral-200 px-3 py-1 text-xs text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
          >
            ←
          </button>
          <span className="text-xs tabular-nums text-neutral-400">
            {index + 1} / {slides.length}
          </span>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === slides.length - 1}
            className="rounded-md border border-neutral-200 px-3 py-1 text-xs text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
          >
            →
          </button>
        </div>

        <span className="text-xs text-neutral-300">{slide.title}</span>
      </footer>
    </div>
  )
}
