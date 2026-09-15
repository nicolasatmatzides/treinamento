# The Daily Harvest

A TypeScript-based shopping website built with React, React Router, and Vite. The app is the practical project used by the GitHub Copilot training labs in the parent repository.

## Quick Start Guide

### Prerequisites

- Node.js 18 or newer
- npm

Check that Node.js and npm are available:

```bash
node --version
npm --version
```

### Install And Run

From the repository root, run:

```bash
cd treinamento/eCommApp
npm install
npm run dev
```

Vite opens the browser automatically. If it does not, open [http://localhost:3000](http://localhost:3000). The port and automatic browser opening are configured in `vite.config.ts`.

Stop the development server with `Ctrl+C`.

## Common Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally after `npm run build`. |
| `npm run lint` | Run ESLint and fail if warnings are found. |
| `npm test` | Run Vitest in watch mode. |
| `npm run test:run` | Run all tests once. |
| `npm run test:ui` | Open the Vitest browser interface. |
| `npm run test:coverage` | Run tests and generate coverage reports. |

## Testing And Validation

Run the test suite once:

```bash
npm run test:run
```

Run tests continuously while developing:

```bash
npm test
```

Before finishing a change, run the full local validation set:

```bash
npm run lint
npm run test:run
npm run build
```

Tests use Vitest, JSDOM, and React Testing Library. Shared test setup is loaded from `src/test/setup.ts`, and reusable test helpers are in `src/test/test-utils.tsx`.

## Important Files

### Application Entry Points

- `index.html` - Vite's HTML entry document.
- `src/main.tsx` - Creates the React root and loads the application.
- `src/App.tsx` - Main application component and route configuration.

### Components And Pages

- `src/components/Header.tsx` - Header and navigation.
- `src/components/Footer.tsx` - Site footer.
- `src/components/HomePage.tsx` - Home page.
- `src/components/ProductsPage.tsx` - Product listing and product interactions.
- `src/components/CartPage.tsx` - Shopping cart view.
- `src/components/CheckoutModal.tsx` - Checkout workflow.
- `src/components/LoginPage.tsx` - Login page.
- `src/components/ReviewModal.tsx` - Product review workflow.
- `src/components/AdminPage.tsx` - Administrative view.

### State, Types, And Helpers

- `src/context/CartContext.tsx` - Shared shopping cart state and actions.
- `src/types/index.ts` - Shared TypeScript types.
- `src/utils/helpers.ts` - Reusable helper functions.

### Data And Styling

- `public/products/` - Product JSON files and product images served as static assets.
- `src/index.css` - Global styles.
- `src/App.css` - Application-level styles.

### Configuration And Tests

- `package.json` - Dependencies and npm scripts.
- `vite.config.ts` - Vite server, build, and Vitest configuration.
- `tsconfig.json` - TypeScript settings for the application.
- `tsconfig.node.json` - TypeScript settings for Node-based configuration files.
- `src/test/setup.ts` - Shared test setup.
- `src/test/test-utils.tsx` - Shared testing utilities.
- `src/components/CartPage.test.tsx` - Example component test.

## Project Structure

```text
eCommApp/
├── public/products/       # Product data and images
├── src/
│   ├── components/        # Pages, modals, and reusable UI components
│   ├── context/           # Shared React state
│   ├── test/              # Test setup and utilities
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Shared helper functions
│   ├── App.tsx            # Main component and routes
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.tsx           # React entry point
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Development Workflow

1. Start from the repository root and enter `treinamento/eCommApp`.
2. Install dependencies with `npm install` if needed.
3. Start the app with `npm run dev`.
4. Make a focused change in `src/` or `public/`.
5. Run the relevant test while developing.
6. Run linting, all tests, and the production build before completing the change.

## Troubleshooting

### The browser does not open

Open [http://localhost:3000](http://localhost:3000) manually and confirm that the development server is still running.

### The port is already in use

Stop the process using port `3000`, or change the `server.port` value in `vite.config.ts`.

### Dependencies are missing

Run this from the app directory:

```bash
npm install
```

### A change is not reflected

Check the terminal for compile errors, confirm the file is inside `src/`, and restart the development server if Vite did not recover automatically.

### Lint reports that no configuration file exists

The `npm run lint` script is defined in `package.json`, but this project currently has no ESLint configuration file. The command will therefore fail until an ESLint configuration is added. Tests and the production build can still be run with `npm run test:run` and `npm run build`.
