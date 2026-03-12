import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const skillExample = `# .agents/skills/web-browser/SKILL.md

---
name: web-browser
description: "Browse web pages and capture screenshots
  using Chrome DevTools."
---

# Web Browser Skill

## Available Tools
- navigate_page - Navigate to a URL
- take_screenshot - Capture a screenshot
- new_page - Open a new browser tab
- list_pages - List open browser tabs

## Workflow
1. Navigate to the target URL
2. Screenshot the page
3. Analyze captured screenshots with look_at

## Tips
- Use take_screenshot with fullPage: true
- Navigate to specific states before capturing
- Capture multiple viewport sizes for responsive review`

const tokenComparison = `# Without skills: MCP always loaded
Chrome DevTools MCP: 26 tools → 17,700 tokens
Loaded on EVERY thread, even when unused.

# With skills: lazy loading
System prompt sees only:
  "web-browser - Browse web pages and
   capture screenshots"           → 31 tokens

Agent calls load_skill("web-browser")
  → loads SKILL.md               → 180 tokens
  → loads only 4 filtered tools  → 1,477 tokens
                          Total:   1,657 tokens

# 10x cheaper. Only when you need it.`

export default function Skills() {
  const [skillHtml, setSkillHtml] = useState('')
  const [tokenHtml, setTokenHtml] = useState('')

  useEffect(() => {
    codeToHtml(skillExample, { lang: 'markdown', theme: 'github-dark' }).then(setSkillHtml)
    codeToHtml(tokenComparison, { lang: 'bash', theme: 'github-dark' }).then(setTokenHtml)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          Skills are just prompts
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          A markdown file with instructions the model loads on demand.{' '}
          <span className="font-semibold text-neutral-600">
            Not code. Not a plugin. Just distilled knowledge.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            <span>a skill — just a markdown file</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-snug [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            style={{ maxHeight: 380 }}
            dangerouslySetInnerHTML={{ __html: skillHtml }}
          />
        </div>

        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-emerald-300 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-emerald-400">
            <span>why lazy loading matters</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-snug [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            style={{ maxHeight: 380 }}
            dangerouslySetInnerHTML={{ __html: tokenHtml }}
          />
        </div>
      </div>
    </div>
  )
}
