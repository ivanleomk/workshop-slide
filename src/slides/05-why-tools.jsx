import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const normalFn = `def get_weather(city: str) -> str:
    """Get the current weather for a city."""
    response = requests.get(
        f"https://api.weather.com/{city}"
    )
    return response.json()["summary"]`

const toolFn = `tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather for a city.",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "The city name"
                }
            },
            "required": ["city"]
        }
    }
]`

export default function WhyTools() {
  const [normalHtml, setNormalHtml] = useState('')
  const [toolHtml, setToolHtml] = useState('')

  useEffect(() => {
    codeToHtml(normalFn, { lang: 'python', theme: 'github-dark' }).then(setNormalHtml)
    codeToHtml(toolFn, { lang: 'python', theme: 'github-dark' }).then(setToolHtml)
  }, [])

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-[52px] font-normal leading-tight tracking-tight text-black">
          A tool is just a function
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          Same code you already write —{' '}
          <span className="font-semibold text-neutral-600">
            plus a description so the LLM knows when to call it.
          </span>
        </p>
      </div>

      <div className="flex gap-4">
        {/* Normal function */}
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-neutral-400">
            <span>your code today</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: normalHtml }}
          />
        </div>

        {/* Tool definition */}
        <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-emerald-300 bg-[#24292e]">
          <div className="px-4 py-2 text-[12px] text-emerald-400">
            <span>the same thing, as a tool</span>
          </div>
          <div
            className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
            dangerouslySetInnerHTML={{ __html: toolHtml }}
          />
        </div>
      </div>
    </div>
  )
}
