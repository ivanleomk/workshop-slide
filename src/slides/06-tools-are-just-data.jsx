import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const modelOutput = `# The model emits this

{
    "tool": "run_command",

    "arguments": {
        "command": "ls -la /home/user"
    }
}`

const handlers = [
  {
    label: 'Run in a sandbox',
    desc: 'Spin up a container, execute safely, tear it down.',
    code: `def handle(call):
    sandbox = create_sandbox()
    result = sandbox.exec(call["command"])
    sandbox.destroy()
    return result`,
  },
  {
    label: 'Run locally',
    desc: 'Execute directly on your machine. Full access.',
    code: `def handle(call):
    result = subprocess.run(
        call["command"], shell=True,
        capture_output=True
    )
    return result.stdout`,
  },
  {
    label: 'Fake it in memory',
    desc: 'Simulate a filesystem. No real execution at all.',
    code: `def handle(call):
    fake_fs = {"home": {"user": ["a.txt", "b.py"]}}
    return lookup(fake_fs, call["command"])`,
  },
]

export default function ToolsAreJustData() {
  const [modelHtml, setModelHtml] = useState('')
  const [handlerHtmls, setHandlerHtmls] = useState([])

  useEffect(() => {
    codeToHtml(modelOutput, { lang: 'python', theme: 'github-dark' }).then(setModelHtml)
    Promise.all(
      handlers.map((h) => codeToHtml(h.code, { lang: 'python', theme: 'github-dark' }))
    ).then(setHandlerHtmls)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          The model asks. You decide.
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          A tool call is just data —{' '}
          <span className="font-semibold text-neutral-600">
            the same output can be handled in completely different ways.
          </span>
        </p>
      </div>

      <div className="flex gap-4 items-stretch">
        {/* Left: model output */}
        <div className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e] shrink-0" style={{ width: 340 }}>
          <div className="px-4 py-2 text-[12px] text-neutral-400">model output</div>
          <div
            className="flex-1 overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: modelHtml }}
          />
        </div>

        {/* Right: three handler options */}
        <div className="flex flex-1 flex-col gap-2 min-w-0">
          {handlers.map((h, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
              <div className="flex items-baseline justify-between px-4 py-1.5">
                <span className="text-[12px] font-medium text-emerald-400">{h.label}</span>
                <span className="text-[11px] text-neutral-500">{h.desc}</span>
              </div>
              <div
                className="overflow-auto px-4 pb-2 text-[13px] leading-snug [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
                dangerouslySetInnerHTML={{ __html: handlerHtmls[i] || '' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
