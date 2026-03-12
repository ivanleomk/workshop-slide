import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const mcpCost = `# GitHub MCP server: 93 tools loaded at init
# → 55,000 tokens consumed before you ask anything

Agent Context Window (128K):
├── System prompt:          ~2,000 tokens
├── GitHub MCP schema:     ~55,000 tokens  ← 43%
├── Jira MCP schema:       ~35,000 tokens
├── Conversation history:   ~4,000 tokens
└── Available for reasoning: ~32,000 tokens`

const cliCost = `# gh CLI: the model already knows it
# → 0 tokens for tool schemas

gh issue create --repo my-org/repo \\
  --title "Bug in auth flow" \\
  --body "Steps to reproduce..."

Agent Context Window (128K):
├── System prompt:          ~2,000 tokens
├── Tool schemas:           0 tokens       ← 0%
├── Command + output:      ~3,200 tokens
└── Available for reasoning: ~122,800 tokens

# 35x fewer tokens. Trained on billions of shell
# interactions. The model already knows gh, docker,
# kubectl, aws, git...`

export default function CLITrend() {
  const [mcpHtml, setMcpHtml] = useState('')
  const [cliHtml, setCliHtml] = useState('')

  useEffect(() => {
    codeToHtml(mcpCost, { lang: 'bash', theme: 'github-dark' }).then(setMcpHtml)
    codeToHtml(cliCost, { lang: 'bash', theme: 'github-dark' }).then(setCliHtml)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          CLIs are eating MCPs
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          MCPs dump entire schemas into context.{' '}
          <span className="font-semibold text-neutral-600">
            CLIs cost zero tokens — the model already knows them.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-red-300 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-red-400">
            <span>MCP — 55,000 tokens before you start</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: mcpHtml }}
          />
        </div>

        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-emerald-300 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-emerald-400">
            <span>CLI — 0 tokens, model already knows it</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: cliHtml }}
          />
        </div>
      </div>
    </div>
  )
}
