import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const yourTool = `# Your tool
{
    "name": "read_file",
    "description": "Read a file from disk",
    "parameters": {
        "path": { "type": "string" }
    }
}`

const mcpTool = `# An MCP tool (someone else wrote it)
{
    "name": "github_create_issue",
    "description": "Create a GitHub issue",
    "parameters": {
        "repo": { "type": "string" },
        "title": { "type": "string" },
        "body": { "type": "string" }
    }
}

# The model doesn't know the difference.
# It calls both the exact same way.`

const mcpConfig = `# How you connect an MCP server
{
    "mcpServers": {
        "github": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-github"],
            "env": { "GITHUB_TOKEN": "ghp_..." }
        }
    }
}

# That's it. The tools appear alongside yours.
# Pre-made, plug-and-play.`

export default function MCPs() {
  const [yourHtml, setYourHtml] = useState('')
  const [mcpHtml, setMcpHtml] = useState('')
  const [configHtml, setConfigHtml] = useState('')

  useEffect(() => {
    codeToHtml(yourTool, { lang: 'python', theme: 'github-dark' }).then(setYourHtml)
    codeToHtml(mcpTool, { lang: 'python', theme: 'github-dark' }).then(setMcpHtml)
    codeToHtml(mcpConfig, { lang: 'python', theme: 'github-dark' }).then(setConfigHtml)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          MCPs are just pre-made tools
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Same tool interface you already know —{' '}
          <span className="font-semibold text-neutral-600">
            but someone else wrote and hosted it.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
            <div className="px-4 py-2 text-[12px] text-neutral-400">your tool</div>
            <div
              className="overflow-auto px-4 pb-3 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: yourHtml }}
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-emerald-300 bg-[#24292e]">
            <div className="px-4 py-2 text-[12px] text-emerald-400">an MCP tool — identical shape</div>
            <div
              className="overflow-auto px-4 pb-3 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
              dangerouslySetInnerHTML={{ __html: mcpHtml }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-neutral-400">connecting an MCP server</div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: configHtml }}
          />
        </div>
      </div>
    </div>
  )
}
