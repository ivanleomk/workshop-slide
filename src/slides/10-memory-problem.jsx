import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const openaiMemory = `# OpenAI: dump it all into the system prompt

## User Knowledge Memories (AI-generated)
"You are a senior engineer, 8 years experience.
 You prefer Docker Compose over K8s for small
 projects. You use DigitalOcean. You are learning
 Rust. You abandoned the Telegram bot project..."

## Recent Conversation Content (last 40 chats)
03/11 [14:30] Debugging CORS issue:
  user: "My API gateway is rejecting cross-origin requests"
  user: "I'm using nginx as a reverse proxy"
03/11 [15:45] Database migration:
  user: "How do I migrate from Postgres to Turso?"
  user: "I want to keep the same schema"
03/12 [09:00] Workshop slides:
  user: "Help me build slides about agents"

## Interaction Metadata
device: "MacBook Pro, Safari, dark mode"
avg_message_length: 342
top_topics: { programming: 45%, devops: 22% }

# No RAG. No retrieval. Everything, every time.
# Bet: models are smart enough to ignore irrelevant context
# Bet: context windows will keep growing, costs will drop`

const anthropicMemory = `# Anthropic: memory is a tool the model calls

# Blank slate every conversation. No preloading.
# When the model needs to remember, it searches:

{
    "name": "conversation_search",
    "parameters": {
        "query": "deployment preferences",
        "max_results": 5
    }
}

# → Returns raw past conversations, not summaries

{
    "name": "recent_chats",
    "parameters": {
        "n": 10,
        "sort_order": "desc",
        "after": "2026-03-05T00:00:00Z"
    }
}

# → Returns timestamped chat history
# The model decides when memory is worth the latency`

export default function MemoryProblem() {
  const [openaiHtml, setOpenaiHtml] = useState('')
  const [anthropicHtml, setAnthropicHtml] = useState('')

  useEffect(() => {
    codeToHtml(openaiMemory, { lang: 'yaml', theme: 'github-dark' }).then(setOpenaiHtml)
    codeToHtml(anthropicMemory, { lang: 'python', theme: 'github-dark' }).then(setAnthropicHtml)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          The memory problem
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Every conversation starts from zero.{' '}
          <span className="font-semibold text-neutral-600">
            The big labs are solving this in opposite ways.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            <span>OpenAI — preload everything</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-snug [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            style={{ maxHeight: 380 }}
            dangerouslySetInnerHTML={{ __html: openaiHtml }}
          />
        </div>

        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            <span>Anthropic — search on demand</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-snug [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            style={{ maxHeight: 380 }}
            dangerouslySetInnerHTML={{ __html: anthropicHtml }}
          />
        </div>
      </div>
    </div>
  )
}
