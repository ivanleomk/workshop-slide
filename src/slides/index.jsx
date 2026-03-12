import Title from './01-title'
import WhatIsAnAgent from './02-what-is-an-agent'

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
]

export default slides
