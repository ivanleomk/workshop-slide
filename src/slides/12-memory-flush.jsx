import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const flushFlow = `# When context window is getting full...

1. Trigger memory flush
2. Agent writes durable memories to memory/2026-03-12.md
3. Compact the conversation (summarise & discard old turns)
4. Continue with a fresh, shorter context

# The memory file grows through the day:

## 14:30 — User asked about deployment
- Prefers Docker Compose over K8s for small projects
- Uses DigitalOcean, not AWS

## 15:45 — Debugging session
- Fixed CORS issue in the API gateway
- Learned user keeps nginx configs in /etc/nginx/sites-enabled

## 17:00 — Planning session
- Wants to migrate the database to Turso
- Deadline is end of month`

const soulExample = `# SOUL.md — The agent's identity

## Communication Style
- Be direct, skip pleasantries
- Use code examples over prose
- Australian English spelling

## User Context
- Senior engineer, 8 years experience
- Works on a Telegram bot side project
- Prefers Python, learning Rust

## Boundaries
- Never commit without asking
- Always explain before running destructive commands`

export default function MemoryFlush() {
  const [flushHtml, setFlushHtml] = useState('')
  const [soulHtml, setSoulHtml] = useState('')

  useEffect(() => {
    codeToHtml(flushFlow, { lang: 'markdown', theme: 'github-dark' }).then(setFlushHtml)
    codeToHtml(soulExample, { lang: 'markdown', theme: 'github-dark' }).then(setSoulHtml)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          Memory in practice
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Flush before you forget.{' '}
          <span className="font-semibold text-neutral-600">
            The agent saves what matters, then compacts and moves on.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-emerald-300 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-emerald-400">
            <span>memory/2026-03-12.md — daily memory log</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            style={{ maxHeight: 360 }}
            dangerouslySetInnerHTML={{ __html: flushHtml }}
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e] shrink-0" style={{ width: 340 }}>
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            <span>SOUL.md — agent identity</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            style={{ maxHeight: 360 }}
            dangerouslySetInnerHTML={{ __html: soulHtml }}
          />
        </div>
      </div>
    </div>
  )
}
