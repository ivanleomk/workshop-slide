import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const hooksCode = `import { isToolCallEventType } from "@mariozechner/pi-coding-agent";

pi.on("agent_start", () => {
  console.log("[Inline Extension] Agent starting");
});

pi.on("tool_call", async (event, ctx) => {
  if (isToolCallEventType("bash", event)) {
    if (event.input.command.includes("rm -rf")) {
      return { block: true, reason: "Dangerous command" };
    }
  }

  if (isToolCallEventType("read", event)) {
    console.log(\`Reading: \${event.input.path}\`);
  }
});`

const extensionCode = `import { Type } from "@mariozechner/pi-ai";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "hello",
    label: "Hello",
    description: "A simple greeting tool",
    parameters: Type.Object({
      name: Type.String({ description: "Name to greet" }),
    }),

    async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
      const { name } = params as { name: string };
      return {
        content: [{ type: "text", text: \`Hello, \${name}!\` }],
        details: { greeted: name },
      };
    },
  });
}`

export default function HooksInAction() {
  const [hooksHtml, setHooksHtml] = useState('')
  const [extHtml, setExtHtml] = useState('')

  useEffect(() => {
    codeToHtml(hooksCode, { lang: 'typescript', theme: 'github-dark' }).then(setHooksHtml)
    codeToHtml(extensionCode, { lang: 'typescript', theme: 'github-dark' }).then(setExtHtml)
  }, [])

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          Hooks &amp; Extensions
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Intercept every action with hooks.{' '}
          <span className="font-semibold text-neutral-600">
            Add new tools with extensions.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            <span>hooks — lifecycle guardrails</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: hooksHtml }}
          />
        </div>

        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-emerald-300 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-emerald-400">
            <span>extensions — hot-reload new tools</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: extHtml }}
          />
        </div>
      </div>
    </div>
  )
}
