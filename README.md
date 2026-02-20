### Kras Kalender app

This app is a demo for a job interview. It should provide a showcase for an app that demonstrates client/server component structure, persisted state and localstorage and simulates multi user interaction in a modern React architecture.

## Live demo
(Click here to go to the live demo)[https://kras-kalender.vercel.app/]

## Architecture

page.tsx (Server Component)
└─ GridContainer (Client Component)
└─ VirtualGrid (Client Component)
└─ Cell (Client Component)

State is centralized via a GridProvider to keep the grid logic isolated.

⚙️ Core Features

- Seeded prize distribution
- LocalStorage persistence
- Grid reset functionality
- Automatic timed cell opening
- Centralized state management with React Context
- Unit-tested grid logic

## Getting Started

Install dependencies:

```bash
npm install
```

To run the development server:

```bash
npm run dev
```

To run tests:

```bash
npm test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Future improvements

- improve the performance more (TBT is still > 500ms)
- improve styling and implement some nice components✌️
