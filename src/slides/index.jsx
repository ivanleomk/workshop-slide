import Title from './01-title'
import WhatIsAnAgent from './02-what-is-an-agent'
import WhatMakesOpenClawGood from './03-what-makes-openclaw-good'
import BuildingAnAgent from './04-building-an-agent'

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
]

export default slides
