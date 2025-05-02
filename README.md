<!-- @format -->

# Jotai Composer Example

This project demonstrates the use of Jotai Composer to create a modular state management system with multiple decorators. It showcases how to compose different state patterns together in a React application.

## Features

- **Counter State**: Simple counter with increment functionality
- **Base Plus One State**: Manages a base number and its derived value (base + 1)
- **Modal State**: Advanced modal system with:
  - Open/Close functionality
  - Multiple modal types (Success, Warning, Error)
  - Type-specific content and styling
  - Persistent state

## Project Structure

```
src/
├── mainComposedAtom/          # Main state composition
│   ├── decorators/           # Core state decorators
│   │   ├── addCounterDecorator.ts
│   │   └── basePlusOneDecorator.ts
│   └── index.ts             # Main composed atom
├── modalComposed/            # Modal state composition
│   ├── decorators/          # Modal-specific decorators
│   │   ├── contentDecorator.ts
│   │   ├── isOpenDecorator.ts
│   │   └── modalTypeDecorator.ts
│   ├── types.ts             # Modal type definitions
│   └── index.ts             # Modal composed atom
├── App.tsx                  # Main application component
└── App.css                 # Application styles
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

### Counter

- Click "Add Count" to increment the counter
- The count is persisted between page reloads

### Base Plus One

- Click "Set Random Base" to set a random base number
- The base number and its derived value (base + 1) are displayed
- Both values are persisted between page reloads

### Modal

- Click "Open Modal" to show the modal
- Use the type buttons (Success, Warning, Error) to change modal type
- Each type has its own styling and content
- Click "Close Modal" to hide it
- Modal state is persisted between page reloads

## State Management

The project uses Jotai Composer to create a modular state management system:

1. **Main State** (`mainComposedAtom/`):

   - Combines counter and base plus one states
   - Uses `atomWithStorage` for persistence

2. **Modal State** (`modalComposed/`):
   - Manages modal visibility, type, and content
   - Uses separate decorators for each aspect
   - Persists state using `atomWithStorage`

## Styling

The application uses a clean, modern design with:

- Responsive layout
- Smooth animations
- Type-specific modal styling
- Interactive button states
- Consistent color scheme

## Technologies Used

- React
- Jotai
- Jotai Composer
- TypeScript
- CSS Modules

## Development

This project uses:

- TypeScript for type safety
- ESLint for code quality
- Vite for fast development and building
- SWC for fast compilation

## License

MIT
