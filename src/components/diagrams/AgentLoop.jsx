import { useState, useEffect, useRef } from 'react'

const steps = [
  {
    label: 'User sends a message',
    messages: [
      { role: 'user', text: '"Help me find where we handle user login"' },
    ],
    execution: [],
  },
  {
    label: 'LLM searches the codebase with grep',
    messages: [
      { role: 'user', text: '"Help me find where we handle user login"' },
      { role: 'agent', text: 'Let me search the codebase for login handling.' },
      { role: 'tool_call', text: 'grep(pattern="login", path="./src")' },
    ],
    execution: [
      { type: 'call', text: 'grep(pattern="login", path="./src")' },
    ],
  },
  {
    label: 'Grep returns matching files',
    messages: [
      { role: 'user', text: '"Help me find where we handle user login"' },
      { role: 'agent', text: 'Let me search the codebase for login handling.' },
      { role: 'tool_call', text: 'grep(pattern="login", path="./src")' },
      { role: 'tool_result', text: 'src/auth/login.py:12: def login_user()\nsrc/auth/login.py:45: def verify_token()' },
    ],
    execution: [
      { type: 'call', text: 'grep(pattern="login", path="./src")' },
      { type: 'result', text: '2 matches in src/auth/login.py' },
    ],
  },
  {
    label: 'LLM reads the file for full context',
    messages: [
      { role: 'user', text: '"Help me find where we handle user login"' },
      { role: 'agent', text: 'Let me search the codebase for login handling.' },
      { role: 'tool_call', text: 'grep(pattern="login", path="./src")' },
      { role: 'tool_result', text: 'src/auth/login.py:12: def login_user()\nsrc/auth/login.py:45: def verify_token()' },
      { role: 'agent', text: 'Found it. Let me read the full file.' },
      { role: 'tool_call', text: 'read_file(path="src/auth/login.py")' },
    ],
    execution: [
      { type: 'call', text: 'grep(pattern="login", path="./src")' },
      { type: 'result', text: '2 matches in src/auth/login.py' },
      { type: 'call', text: 'read_file(path="src/auth/login.py")' },
    ],
  },
  {
    label: 'File contents returned',
    messages: [
      { role: 'user', text: '"Help me find where we handle user login"' },
      { role: 'agent', text: 'Let me search the codebase for login handling.' },
      { role: 'tool_call', text: 'grep(pattern="login", path="./src")' },
      { role: 'tool_result', text: 'src/auth/login.py:12: def login_user()\nsrc/auth/login.py:45: def verify_token()' },
      { role: 'agent', text: 'Found it. Let me read the full file.' },
      { role: 'tool_call', text: 'read_file(path="src/auth/login.py")' },
      { role: 'tool_result', text: 'def login_user(email, password):\n    user = db.find(email)\n    if verify(password, user.hash):\n        return create_token(user)' },
    ],
    execution: [
      { type: 'call', text: 'grep(pattern="login", path="./src")' },
      { type: 'result', text: '2 matches in src/auth/login.py' },
      { type: 'call', text: 'read_file(path="src/auth/login.py")' },
      { type: 'result', text: 'Read 52 lines from src/auth/login.py' },
    ],
  },
  {
    label: 'LLM responds with the answer',
    messages: [
      { role: 'user', text: '"Help me find where we handle user login"' },
      { role: 'agent', text: 'Let me search the codebase for login handling.' },
      { role: 'tool_call', text: 'grep(pattern="login", path="./src")' },
      { role: 'tool_result', text: 'src/auth/login.py:12: def login_user()\nsrc/auth/login.py:45: def verify_token()' },
      { role: 'agent', text: 'Found it. Let me read the full file.' },
      { role: 'tool_call', text: 'read_file(path="src/auth/login.py")' },
      { role: 'tool_result', text: 'def login_user(email, password):\n    user = db.find(email)\n    if verify(password, user.hash):\n        return create_token(user)' },
      { role: 'assistant', text: 'Login is handled in src/auth/login.py. The login_user() function looks up the user by email, verifies the password hash, and returns a JWT token.' },
    ],
    execution: [
      { type: 'call', text: 'grep(pattern="login", path="./src")' },
      { type: 'result', text: '2 matches in src/auth/login.py' },
      { type: 'call', text: 'read_file(path="src/auth/login.py")' },
      { type: 'result', text: 'Read 52 lines from src/auth/login.py' },
      { type: 'done', text: 'Loop complete — 2 tool calls executed' },
    ],
  },
]

const msgStyle = {
  user: 'border-neutral-300 bg-neutral-100 text-neutral-800',
  agent: 'border-neutral-200 bg-neutral-50 text-neutral-600',
  tool_call: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  tool_result: 'border-neutral-200 bg-neutral-50 text-neutral-600',
  assistant: 'border-neutral-400 bg-neutral-100 text-neutral-800',
}

const msgLabel = {
  user: 'User',
  agent: 'Agent',
  tool_call: 'Tool Call',
  tool_result: 'Tool Result',
  assistant: 'Assistant',
}

const execStyle = {
  call: 'border-neutral-300 bg-neutral-100 text-neutral-700',
  result: 'border-neutral-200 bg-neutral-50 text-neutral-600',
  done: 'border-neutral-400 bg-neutral-100 text-neutral-800',
}

const execLabel = {
  call: 'Tool Call',
  result: 'Tool Result',
  done: '✓ Done',
}

export default function AgentLoop() {
  const [step, setStep] = useState(0)
  const s = steps[step]
  const msgRef = useRef(null)

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight
    }
  }, [step])

  return (
    <div className="my-8 rounded-xl border border-neutral-200 bg-white overflow-hidden">
      {/* Controls */}
      <div className="flex items-center gap-2 border-b border-neutral-100 px-5 py-3">
        <button
          onClick={() => setStep(0)}
          className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs text-neutral-500 hover:bg-neutral-50 transition-colors"
        >
          ↺
        </button>
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="rounded-md border border-neutral-200 px-3 py-1 text-xs text-neutral-500 hover:bg-neutral-50 disabled:opacity-30 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="rounded-md border border-neutral-200 px-3 py-1 text-xs text-neutral-500 hover:bg-neutral-50 disabled:opacity-30 transition-colors"
        >
          Next
        </button>
        <span className="ml-auto text-xs text-neutral-400">
          {step + 1} / {steps.length}
        </span>
      </div>

      {/* Step label */}
      <div className="border-b border-neutral-100 px-5 py-2.5">
        <span className="text-sm font-medium text-neutral-700">{s.label}</span>
      </div>

      {/* Two-column layout */}
      <div className="flex divide-x divide-neutral-100" style={{ height: 280 }}>
        {/* Messages */}
        <div className="flex flex-1 flex-col">
          <div className="border-b border-neutral-100 px-4 py-2 shrink-0">
            <span className="text-xs font-medium text-neutral-400">Messages</span>
          </div>
          <div ref={msgRef} className="flex flex-col gap-2.5 p-4 overflow-y-auto">
            {s.messages.map((m, i) => (
              <div
                key={`${step}-${i}`}
                className={`rounded-lg border px-3 py-2.5 font-mono text-xs animate-fade-in ${msgStyle[m.role]}`}
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60 block mb-1">
                  {msgLabel[m.role]}
                </span>
                {m.text}
              </div>
            ))}
          </div>
        </div>

        {/* Execution */}
        <div className="flex flex-1 flex-col">
          <div className="border-b border-neutral-100 px-4 py-2 shrink-0">
            <span className="text-xs font-medium text-neutral-400">Execution</span>
          </div>
          <div className="flex flex-col gap-2.5 p-4 overflow-y-auto">
            {s.execution.length === 0 ? (
              <div className="rounded-lg border border-dashed border-neutral-200 flex items-center justify-center h-[44px] text-xs text-neutral-300">
                Waiting for LLM...
              </div>
            ) : (
              s.execution.map((e, i) => (
                <div
                  key={`${step}-${i}`}
                  className={`rounded-lg border px-3 py-2.5 font-mono text-xs animate-fade-in ${execStyle[e.type]}`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wide opacity-60 block mb-1">
                    {execLabel[e.type]}
                  </span>
                  {e.text}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
