import { useState, useEffect } from 'react'
import { codeToHtml } from 'shiki'

const code = `from google.genai import types, Client

client = Client()
conversations = []

while True:
    user_input = input("You: ").strip()
    if not user_input:
        continue

    conversations.append(
        {"role": "user", "parts": [{"text": user_input}]}
    )

    completion = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=conversations,
    )

    content = completion.candidates[0]
    for part in content.content.parts:
        if part.text:
            print(part.text)

    conversations.append(
        {"role": "model", "parts": content.content.parts}
    )`

export default function BuildingAnAgent() {
  const [highlighted, setHighlighted] = useState('')

  useEffect(() => {
    codeToHtml(code, { lang: 'python', theme: 'github-dark' }).then(setHighlighted)
  }, [])

  return (
    <div className="flex items-start gap-16 w-full">
      {/* Left: Title */}
      <div className="flex flex-col gap-4 shrink-0 pt-2" style={{ width: 340 }}>
        <h1 className="font-serif text-[48px] font-normal leading-tight tracking-tight text-black">
          Building an Agent
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          An LLM in a loop with enough of a{' '}
          <span className="font-semibold text-neutral-600">
            token budget to spare.
          </span>
        </p>
      </div>

      {/* Right: Code block */}
      <div className="flex-1 min-w-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#24292e]">
        <div className="px-4 py-2 text-[12px] text-neutral-400">
          <span>python</span>
        </div>
        <div
          className="overflow-auto px-4 pb-4 text-[13px] leading-relaxed [&_pre]:!m-0 [&_pre]:!p-0 [&_pre]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  )
}
