export default function BuildingAnAgent() {
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
        model="gemini-3-flash-preview",
        contents=conversations,
    )

    content = completion.candidates[0]
    for part in content.content.parts:
        if part.text:
            print(part.text)

    conversations.append(
        {"role": "model", "parts": content.content.parts}
    )`

  return (
    <div className="flex items-center gap-20 w-full">
      {/* Left: Title */}
      <div className="flex flex-col gap-4 shrink-0" style={{ width: 380 }}>
        <h1 className="font-serif text-[52px] font-normal leading-tight tracking-tight text-black">
          Building an Agent
        </h1>
        <p className="text-lg leading-relaxed text-neutral-400">
          An LLM in a loop with enough of a{' '}
          <span className="font-semibold text-neutral-600">
            token budget to spare.
          </span>
        </p>
        <p className="text-lg leading-relaxed text-neutral-400">
          That's really all there is to it.
        </p>
      </div>

      {/* Right: Code block */}
      <div className="flex flex-1 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900">
        <pre className="w-full overflow-x-auto p-6 text-[13px] leading-relaxed text-neutral-300" style={{ fontFamily: '"JetBrains Mono", "Fira Code", monospace' }}>
          {code}
        </pre>
      </div>
    </div>
  )
}
