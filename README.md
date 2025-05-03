<!-- @format -->

# Jotai Composer Example Project

This project demonstrates how to use Jotai Composer to manage state in a React application. It showcases a modular state management system using multiple enhancers, including Counter, Base, BasePlus, Input State, and Modal.

## Project Structure

```
src/
├── App.tsx                  # Main application component
├── App.css                  # Application styles
├── baseComposeAtom/         # Base and BasePlus enhancers
│   ├── enhancers/
│   │   ├── base.ts
│   │   └── basePlus.ts
│   └── index.ts
├── mainComposedAtom/        # Main composed atom and enhancers
│   ├── enhancers/
│   │   ├── addCounter.ts
│   │   └── addInputState.ts
│   └── index.ts
├── modalComposed/           # Modal enhancers
│   ├── enhancers/
│   │   ├── isOpen.ts
│   │   ├── modalType.ts
│   │   └── content.ts
│   └── index.ts
└── assets/                  # Static assets
```

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Usage

- **Counter:** Increment the counter value.
- **Base:** Save a random base number.
- **BasePlus:** Automatically derived from the base number.
- **Input State:** Manage a text input with set and reset actions.
- **Modal:** Control modal visibility and content.

## Key Features

- **Modular Enhancers:** Each piece of state logic is encapsulated in its own enhancer.
- **Type Safety:** Full TypeScript support for state and actions.
- **State Persistence:** Uses `atomWithStorage` for persistent state.

## Resources

- [Jotai Documentation](https://jotai.org/)
- [Jotai Composer GitHub](https://github.com/jotai-composer/jotai-composer)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)

## License

This project is licensed under the MIT License.
