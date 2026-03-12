import { useParams, Link } from 'react-router'
import { useEffect, useState, useRef } from 'react'
import Markdown from 'react-markdown'
import { codeToHtml } from 'shiki'
import AgentLoop from '../components/diagrams/AgentLoop'
import ToolCallFlow from '../components/diagrams/ToolCallFlow'
import AgentLifecycle from '../components/diagrams/AgentLifecycle'

const diagrams = {
  'agent-loop': AgentLoop,
  'tool-call-flow': ToolCallFlow,
  'agent-lifecycle': AgentLifecycle,
}

const markdownFiles = import.meta.glob('/content/*.md', { query: '?raw', import: 'default' })

function CodeBlock({ children, className }) {
  const lang = className?.replace('language-', '') || 'text'
  const code = String(children).replace(/\n$/, '')
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    codeToHtml(code, {
      lang,
      theme: 'github-dark',
    }).then((html) => {
      if (ref.current) ref.current.innerHTML = html
    })
  }, [code, lang])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg bg-[#24292e]">
      <div className="flex items-center justify-between px-4 py-2 text-[12px] text-neutral-400">
        <span>{lang}</span>
        <button onClick={handleCopy} className="hover:text-neutral-200 transition-colors">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div
        ref={ref}
        className="overflow-x-auto text-[13px] leading-relaxed [&_pre]:px-4 [&_pre]:pb-4 [&_pre]:pt-0"
      />
    </div>
  )
}

export default function ContentPage() {
  const { slug } = useParams()
  const [content, setContent] = useState(null)
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    const path = `/content/${slug}.md`
    const loader = markdownFiles[path]
    if (loader) {
      loader().then((raw) => {
        setContent(raw)
        const h2s = [...raw.matchAll(/^## (.+)$/gm)].map((m) => m[1])
        setHeadings(h2s)
      })
    } else {
      setContent(null)
    }
  }, [slug])

  if (content === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4] font-sans">
        <p className="text-neutral-400">Page not found.</p>
      </div>
    )
  }

  const title = slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="flex min-h-screen bg-[#f8f7f4] font-sans">
      {/* Sidebar */}
      <aside className="sticky top-0 h-screen w-64 shrink-0 p-10">
        <Link to="/agenda" className="text-sm text-neutral-400 hover:text-neutral-600">
          ← Agenda
        </Link>
        <h3 className="mt-6 text-sm font-semibold text-neutral-900">{title}</h3>
        <nav className="mt-4 flex flex-col gap-2">
          {headings.map((h) => (
            <a
              key={h}
              href={`#${h.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-neutral-400 hover:text-neutral-600"
            >
              {h}
            </a>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex flex-1 justify-center py-12 pr-52">
        <article className="prose-custom max-w-4xl">
          <h1 className="font-serif text-[42px] font-normal leading-tight tracking-tight text-black">
            {title}
          </h1>
          <Markdown
            components={{
              h1: ({ children }) => (
                <h1 className="font-serif text-[42px] font-normal leading-tight tracking-tight text-black">
                  {children}
                </h1>
              ),
              h2: ({ children }) => {
                const id = String(children).toLowerCase().replace(/\s+/g, '-')
                return (
                  <h2 id={id} className="mt-12 border-b border-neutral-200 pb-3 font-serif text-2xl font-normal text-black">
                    {children}
                  </h2>
                )
              },
              p: ({ children }) => {
                const flat = Array.isArray(children) ? children.join('') : String(children ?? '')
                const match = flat.match(/^:::(.+):::$/)
                if (match && diagrams[match[1]]) {
                  const Diagram = diagrams[match[1]]
                  return <Diagram />
                }
                return (
                  <p className="mt-4 text-[15px] leading-[1.7] text-neutral-600">
                    {children}
                  </p>
                )
              },
              ol: ({ children }) => (
                <ol className="mt-4 flex flex-col gap-3 pl-0 list-none">
                  {children}
                </ol>
              ),
              ul: ({ children }) => (
                <ul className="mt-4 flex flex-col gap-2 pl-5 list-disc marker:text-neutral-300">
                  {children}
                </ul>
              ),
              li: ({ children, ordered, index }) => (
                <li className="text-[15px] leading-[1.7] text-neutral-600">
                  {children}
                </li>
              ),
              pre: ({ children }) => children,
              code: ({ children, className }) => {
                if (className) {
                  return <CodeBlock className={className}>{children}</CodeBlock>
                }
                return (
                  <code className="rounded bg-neutral-200/60 px-1.5 py-0.5 text-[13px] text-neutral-700">
                    {children}
                  </code>
                )
              },
            }}
          >
            {content}
          </Markdown>
        </article>
      </main>
    </div>
  )
}
