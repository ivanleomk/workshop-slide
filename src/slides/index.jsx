import Title from './01-title'
import WhatIsAnAgent from './02-what-is-an-agent'
import WhatMakesOpenClawGood from './03-what-makes-openclaw-good'
import BuildingAnAgent from './04-building-an-agent'
import WhyTools from './05-why-tools'
import ToolsAreJustData from './06-tools-are-just-data'
import ThatsAnAgent from './07-thats-an-agent'
import ExtendingItself from './08-extending-itself'
import HooksInAction from './09-hooks-in-action'
import MemoryProblem from './10-memory-problem'
import OpenClawMemory from './11-openclaw-memory'
import MemoryFlush from './12-memory-flush'

const slides = [
  {
    id: 'title',
    title: 'Agents from first principles',
    desc: '',
    component: Title,
  },
  {
    id: 'what-is-an-agent',
    title: 'What is an Agent?',
    desc: 'An LLM running in a loop, burning tokens.',
    component: WhatIsAnAgent,
  },
  {
    id: 'what-makes-openclaw-good',
    title: 'What makes OpenClaw good?',
    desc: 'Strong model, growing context, self-extending.',
    component: WhatMakesOpenClawGood,
  },
  {
    id: 'building-an-agent',
    title: 'Building an Agent',
    desc: 'An LLM in a loop with a token budget.',
    component: BuildingAnAgent,
  },
  {
    id: 'why-tools',
    title: 'A tool is just a function',
    desc: 'Same code you already write, plus a description.',
    component: WhyTools,
  },
  {
    id: 'tools-are-just-data',
    title: 'The model asks. You decide.',
    desc: 'Same tool call, completely different execution.',
    component: ToolsAreJustData,
  },
  {
    id: 'thats-an-agent',
    title: "That's it. That's an agent.",
    desc: 'A loop, tools, and the freedom to act.',
    component: ThatsAnAgent,
  },
  {
    id: 'extending-itself',
    title: 'An agent that extends itself',
    desc: 'Hooks, extensions, and hot reload.',
    component: ExtendingItself,
  },
  {
    id: 'hooks-in-action',
    title: 'Hooks & Extensions',
    desc: 'Lifecycle guardrails and runtime tool registration.',
    component: HooksInAction,
  },
  {
    id: 'memory-problem',
    title: 'The memory problem',
    desc: 'Every conversation starts from zero.',
    component: MemoryProblem,
  },
  {
    id: 'openclaw-memory',
    title: 'How OpenClaw remembers',
    desc: 'Three files. That\'s the entire memory system.',
    component: OpenClawMemory,
  },
  {
    id: 'memory-flush',
    title: 'Memory in practice',
    desc: 'Flush before you forget.',
    component: MemoryFlush,
  },
]

export default slides
