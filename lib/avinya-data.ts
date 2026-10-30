export type DayId = 1 | 2 | 3
export type Category = 'Technical' | 'Cultural'

export type FestEvent = {
  id: string
  name: string
  category: Category
  day: DayId
  time: string
  startMinutes: number
  venue: string
  clubs: string
  description: string[]
  tagline?: string
  detailsPending?: boolean
}

export type Island = {
  day: DayId
  slug: string
  code: string
  name: string
  date: string
  shortDate: string
  weekday: string
  theme: string
  image: string
  imageAlt: string
  summary: string
  coordinates: string
  accentVar: string
}

export const FEST = {
  name: 'AVINYA 2027',
  institution: 'Indian Institute of Information Technology Dharwad',
  institutionShort: 'IIIT Dharwad',
  dates: '12 — 14 March 2027',
  category: 'Techno-cultural festival',
}

export const ISLANDS: Island[] = [
  {
    day: 1,
    slug: 'day-1',
    code: 'ISL-01',
    name: 'The Last Outpost',
    date: '12 March 2027',
    shortDate: '12 MAR',
    weekday: 'Friday',
    theme: 'Desert citadel',
    image: '/images/day1-last-outpost.png',
    imageAlt:
      'A monumental desert citadel rising from sand dunes and canyon rock on an island, under a golden sunset and a giant planet.',
    summary:
      'An ancient civilisation discovered beneath a giant planet. Rolling dunes, canyon stone and a towering citadel where the expedition makes landfall and the festival is formally opened.',
    coordinates: 'SECTOR 12 · DUNE BELT',
    accentVar: 'var(--day-1)',
  },
  {
    day: 2,
    slug: 'day-2',
    code: 'ISL-02',
    name: 'The Pandemonium',
    date: '13 March 2027',
    shortDate: '13 MAR',
    weekday: 'Saturday',
    theme: 'Neon megacity',
    image: '/images/day2-pandemonium.png',
    imageAlt:
      'A synthwave cyberpunk island city with neon magenta towers reflected in the ocean beneath a crimson sun.',
    summary:
      'A neon megacity burning magenta against a crimson sun. The most intense day of the expedition: hackathons, gaming arenas, dance floors and a live battle of bands.',
    coordinates: 'SECTOR 13 · NEON REEF',
    accentVar: 'var(--day-2)',
  },
  {
    day: 3,
    slug: 'day-3',
    code: 'ISL-03',
    name: 'The Carnival Island',
    date: '14 March 2027',
    shortDate: '14 MAR',
    weekday: 'Sunday',
    theme: 'Illuminated carnival',
    image: '/images/day3-carnival.png',
    imageAlt:
      'A futuristic carnival island at night with a giant illuminated Ferris wheel, glowing tents and fireworks over the water.',
    summary:
      'The final landfall. A waterfront carnival of light, a giant Ferris wheel and festival stages where the expedition ends in celebration, prizes and music.',
    coordinates: 'SECTOR 14 · LANTERN COAST',
    accentVar: 'var(--day-3)',
  },
]

export const EVENTS: FestEvent[] = [
  // Technical — Day 1
  {
    id: 'monopoly',
    name: 'Monopoly',
    category: 'Technical',
    day: 1,
    time: '2 PM – 6 PM',
    startMinutes: 14 * 60,
    venue: 'Incubation Hall',
    clubs: 'Inquizitive, ECell, QFis',
    tagline: 'Read. Predict. Invest. Win.',
    description: [
      'A stock-market simulation where 30 teams of 3–4 members compete to grow ₹1,00,000 virtual capital.',
      'Participants invest in 8 companies through 12 market rounds. Each round provides news, followed by market-price updates. Teams can Buy, Sell or Hold based on their analysis.',
      'Four quiz rounds provide additional capital. The news is interconnected, rewarding strategic thinking and risk management.',
      'The team with the highest final portfolio value wins.',
    ],
  },
  {
    id: 'code-royale',
    name: 'Code Royale',
    category: 'Technical',
    day: 1,
    time: '10 AM – 2 PM',
    startMinutes: 10 * 60,
    venue: '260 Seater',
    clubs: 'Return 0, OS Code, MSA',
    description: [
      'A fast-paced 3v3 competitive programming showdown featuring a standard qualification round followed by a relay-style knockout where every accepted submission forces a coder switch.',
      'Solve fast, strategise smart and outlast the competition.',
    ],
  },
  {
    id: 'ai-arcade',
    name: 'AI Arcade',
    category: 'Technical',
    day: 1,
    time: '11 AM – 5 PM',
    startMinutes: 11 * 60,
    venue: '260 Seater',
    clubs: 'AccelAIrate, IEEE',
    description: [
      'A two-stage competitive AI challenge where participants compete in teams of two.',
      'Stage 1 features Visual Reverse-Prompting and Logical Constraint Bypass, testing creativity, prompt engineering and problem-solving.',
      'The top-performing teams advance to a time-bound RAG Treasure Hunt, where they explore a document collection and use effective queries to find information and solve challenges.',
      'The format combines fast thinking, teamwork, experimentation and practical AI skills.',
    ],
  },
  // Technical — Day 2
  {
    id: 'yukti-2',
    name: 'Yukti 2.0',
    category: 'Technical',
    day: 2,
    time: '9 AM – 5 PM',
    startMinutes: 9 * 60,
    venue: '260 Seater / Incubation Hall',
    clubs: 'GND_0, IRIS, QC',
    description: [
      'Participants will design a hardware module to generate QFT gate sequences, connect it with Qiskit and execute the resulting circuits on real IBM Quantum hardware.',
      'This hands-on challenge brings together FPGA design, quantum algorithms and real-world quantum computing in an exciting six-hour hackathon.',
    ],
  },
  {
    id: 'mega-rush-2',
    name: 'Mega Rush 2.0',
    category: 'Technical',
    day: 2,
    time: '10 AM – 6 PM',
    startMinutes: 10 * 60,
    venue: '2×120 Seater, 240 Seater, 260 Seater, Labs L405, L406, L407 and C404',
    clubs: 'Technisyos',
    description: [
      'The event brings together gamers from across the campus and beyond to compete in popular titles.',
      'Through this high-energy gaming competition, Technisyos aims to promote the growing e-sports culture within the institute while providing a platform for students to showcase their skills and enthusiasm for gaming in a professional tournament setting.',
    ],
  },
  {
    id: 'build-with-gemma',
    name: 'Build with Gemma: Agentic Edition',
    category: 'Technical',
    day: 2,
    time: '10 AM – 5 PM',
    startMinutes: 10 * 60,
    venue: 'Both 260 Seater halls',
    clubs: 'GDG, Velocity, DSAI Society',
    description: [
      'A six-hour agentic AI competition powered by Google Gemma, where teams build autonomous AI agents capable of reasoning, using tools and completing a set of evolving real-world challenges.',
      'Participants are evaluated on task completion, agent intelligence, reliability and user experience, with a special award for the best agent interface built using Google Stitch.',
    ],
  },
  // Technical — Day 3
  {
    id: 'kernel-panic',
    name: 'Kernel Panic',
    category: 'Technical',
    day: 3,
    time: '10 AM – 5 PM',
    startMinutes: 10 * 60,
    venue: '120 Seater',
    clubs: 'OS Code, Velocity',
    tagline: 'Grand Linux Festival.',
    description: [
      'Grand Linux Festival.',
      'It consists of a Linux users meetup, rice showcase and a mini hackathon where there will be a lot of small problem statements related to solving various issues and adding features to Linux.',
    ],
  },
  // Cultural — Day 1
  {
    id: 'drama-competition',
    name: 'Drama Competition',
    category: 'Cultural',
    day: 1,
    time: '11 AM – 1 PM',
    startMinutes: 11 * 60,
    venue: '260 Seater',
    clubs: 'Limelight',
    description: [
      'Inter-college theatrical performances judged on acting, storytelling and stage presence.',
    ],
  },
  {
    id: 'music-competition',
    name: 'Music Competition',
    category: 'Cultural',
    day: 1,
    time: '2 PM – 5 PM',
    startMinutes: 14 * 60,
    venue: '120 Seater',
    clubs: '440 Hz',
    description: [
      'Solo and band performances across multiple genres, evaluated by a panel of judges.',
    ],
  },
  {
    id: 'jam',
    name: 'Just a Minute (JAM)',
    category: 'Cultural',
    day: 1,
    time: '2 PM – 5 PM',
    startMinutes: 14 * 60,
    venue: '120 Seater',
    clubs: 'Zeitgeist',
    description: [
      'A fast-paced speaking competition where participants speak on random topics for one minute.',
    ],
  },
  {
    id: 'photography-contest',
    name: 'Photography Contest',
    category: 'Cultural',
    day: 1,
    time: '10 AM – 12 PM',
    startMinutes: 10 * 60,
    venue: 'Pi Block (Backside)',
    clubs: 'Iridescence',
    description: [
      'Participants capture creative photographs based on a surprise fest theme.',
    ],
  },
  {
    id: 'treasure-hunt',
    name: 'Treasure Hunt',
    category: 'Cultural',
    day: 1,
    time: '3 PM – 5 PM',
    startMinutes: 15 * 60,
    venue: 'Entire Campus',
    clubs: 'Zeitgeist',
    description: [
      'Teams solve clues and complete challenges across campus to discover hidden treasures.',
    ],
  },
  {
    id: 'opening-ceremony',
    name: 'Opening Ceremony and Cultural Night',
    category: 'Cultural',
    day: 1,
    time: '6 PM – 9 PM',
    startMinutes: 18 * 60,
    venue: 'Front Gate E Block',
    clubs: 'Mosaic',
    description: [
      'Official inauguration followed by guest performances, student showcases and an evening celebration.',
    ],
  },
  // Cultural — Day 2
  {
    id: 'solo-duet-dance',
    name: 'Solo and Duet Dance',
    category: 'Cultural',
    day: 2,
    time: '10 AM – 1 PM',
    startMinutes: 10 * 60,
    venue: 'M Block',
    clubs: 'Dynamight',
    description: [
      'Participants showcase choreography in solo and duet categories across diverse dance styles.',
    ],
  },
  {
    id: 'stand-up-comedy',
    name: 'Stand-Up Comedy',
    category: 'Cultural',
    day: 2,
    time: '11 AM – 12:30 PM',
    startMinutes: 11 * 60,
    venue: 'Ground',
    clubs: 'Artist',
    description: [
      'A comedy showcase featuring original acts, observational humour and crowd interaction.',
    ],
  },
  {
    id: 'debate-competition',
    name: 'Debate Competition',
    category: 'Cultural',
    day: 2,
    time: '2 PM – 5 PM',
    startMinutes: 14 * 60,
    venue: '240 Seater',
    clubs: 'Zeitgeist',
    description: [
      'Teams debate contemporary topics, demonstrating research, logical reasoning and persuasive speaking.',
    ],
  },
  {
    id: 'tote-bag-painting',
    name: 'Tote Bag Painting',
    category: 'Cultural',
    day: 2,
    time: '2 PM – 5 PM',
    startMinutes: 14 * 60,
    venue: '2 × 120 Seaters',
    clubs: 'Mosaic',
    description: ['Tote bag painting competition, open for all.'],
  },
  {
    id: 'group-dance',
    name: 'Group Dance Competition',
    category: 'Cultural',
    day: 2,
    time: '3 PM – 6 PM',
    startMinutes: 15 * 60,
    venue: 'Main Ground',
    clubs: 'Dynamight',
    description: [
      'College teams compete with coordinated group performances, judged on synchronization and creativity.',
    ],
  },
  {
    id: 'battle-of-bands',
    name: 'Battle of Bands',
    category: 'Cultural',
    day: 2,
    time: '6:30 PM – 9 PM',
    startMinutes: 18 * 60 + 30,
    venue: 'Main Ground',
    clubs: '440 Hz',
    description: [
      'College bands compete in a live musical showdown featuring original compositions and covers.',
    ],
  },
  // Cultural — Day 3
  {
    id: 'quiz-quest',
    name: 'Quiz Quest',
    category: 'Cultural',
    day: 3,
    time: '10 AM – 12 PM',
    startMinutes: 10 * 60,
    venue: '120 Seater',
    clubs: 'Inquizitive',
    description: [
      'A multi-round general knowledge and technology quiz for teams from participating colleges.',
    ],
  },
  {
    id: 'street-play',
    name: 'Street Play Competition',
    category: 'Cultural',
    day: 3,
    time: '11 AM – 1 PM',
    startMinutes: 11 * 60,
    venue: 'Main Ground',
    clubs: 'Limelight',
    description: [
      'Teams perform socially relevant street plays emphasizing awareness, creativity and audience engagement.',
    ],
  },
  {
    id: 'fashion-show',
    name: 'Fashion Show',
    category: 'Cultural',
    day: 3,
    time: '3 PM – 5:30 PM',
    startMinutes: 15 * 60,
    venue: 'Main Ground',
    clubs: 'InMotion',
    description: [
      'A themed runway event showcasing student-designed outfits, styling and team creativity.',
    ],
  },
  {
    id: 'closing-ceremony',
    name: 'Closing Ceremony and Prize Distribution',
    category: 'Cultural',
    day: 3,
    time: '7:30 PM – 9 PM',
    startMinutes: 19 * 60 + 30,
    venue: 'Main Ground',
    clubs: 'All Techno-Cultural Clubs',
    description: [
      'The final celebration recognizing winners, announcing results and concluding the three-day fest.',
    ],
  },
  {
    id: 'dj',
    name: 'DJ',
    category: 'Cultural',
    day: 3,
    time: '9 PM – 11 PM',
    startMinutes: 21 * 60,
    venue: 'Main Ground',
    clubs: 'Artist',
    description: ['Details to be announced.'],
    detailsPending: true,
  },
]

export function getIsland(day: DayId) {
  return ISLANDS[day - 1]
}

export function eventsForDay(day: DayId) {
  return EVENTS.filter((e) => e.day === day).sort(
    (a, b) => a.startMinutes - b.startMinutes,
  )
}

export const EVENT_COUNTS = {
  technical: EVENTS.filter((e) => e.category === 'Technical').length,
  cultural: EVENTS.filter((e) => e.category === 'Cultural').length,
  total: EVENTS.length,
}

export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About AVINYA' },
  { href: '#journey', label: 'Explore the Journey' },
  { href: '#day-1', label: 'Day 1 — The Last Outpost' },
  { href: '#day-2', label: 'Day 2 — The Pandemonium' },
  { href: '#day-3', label: 'Day 3 — The Carnival Island' },
  { href: '#events', label: 'Technical Events', filter: 'Technical' as const },
  { href: '#events', label: 'Cultural Events', filter: 'Cultural' as const },
  { href: '#schedule', label: 'Full Schedule' },
  { href: '#hack2future', label: 'Hack2Future' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#venue', label: 'Venue' },
  { href: '#faqs', label: 'FAQs' },
  { href: '#contact', label: 'Contact' },
]
