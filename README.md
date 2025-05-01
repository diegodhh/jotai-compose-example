<!-- @format -->

# Jotai Composer Example

This project demonstrates the use of Jotai Composer to manage state in a React application, showcasing how to implement state management using decorators.

## Features

- State management using Jotai and Jotai Composer
- Counter implementation
- Base number with derived value (base + 1)
- Persistent state using localStorage
- Modern UI with animations

## Project Structure

```
src/
├── decorators/
│   ├── addCounterDecorator.ts    # Counter state management
│   ├── addModalDecorator.ts      # Modal state management
│   └── basePlusOneDecorator.ts   # Base number state management
├── assets/                       # Static assets
├── App.tsx                       # Main application component
├── App.css                       # Application styles
├── coposedAtom.ts               # Composed atom combining all decorators
├── index.css                    # Global styles
├── main.tsx                     # Application entry point
└── vite-env.d.ts               # Vite environment declarations
```

## State Management

The application uses Jotai Composer to manage state through decorators:

### Counter Decorator

```typescript
export enum Action {
  ADD_COUNT = "ADD_COUNT",
}
```

### Base Plus One Decorator

```typescript
export type FirstPlusOne = {
  base: number;
  firstPlusOne: number;
};

export enum BaseAction {
  SAVE_BASE = "SAVE_BASE",
}
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Usage

The application provides several interactive features:

- **Counter**: Click the "Add Count" button to increment the counter
- **Random Base**: Click the "Set Random Base" button to set a random base number

## State Persistence

All state is persisted in localStorage using `atomWithStorage` from Jotai utils. This means your state will be preserved even after page refresh.

## Styling

The application uses CSS for styling with:

- Modern, clean design
- Responsive layout
- Interactive button states

## Dependencies

- React
- Jotai
- Jotai Composer
- Remeda
- TypeScript
- Vite

## Development

This project uses:

- TypeScript for type safety
- ESLint for code quality
- Vite for fast development and building
- SWC for fast compilation

## License

MIT
