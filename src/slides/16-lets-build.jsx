export default function LetsBuild() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full text-center">
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-[64px] font-normal leading-tight tracking-tight text-black">
          Let's look at the code.
        </h1>
        <p className="text-xl leading-relaxed text-neutral-400 max-w-2xl mx-auto">
          We'll build a minimal agent called{' '}
          <span className="font-semibold text-neutral-600">Koroku</span>{' '}
          — from a bare loop to tools, memory, and Telegram.
        </p>
      </div>
    </div>
  )
}
