# Study Journal

A living record of the GitHub Copilot training and the practical work completed in this repository. Keep entries concise and useful for later revision; record decisions and verification results rather than copying full conversations.

## How To Use This Journal

Add a new entry under the relevant lab or project topic whenever we study a question, change code, solve a problem, or verify a result.

Each entry should capture:

- **Question or goal:** What we were trying to understand or accomplish.
- **Answer or concept:** The explanation in practical terms.
- **Commands or references:** Important commands, files, and links.
- **Code fixes:** What changed, why it changed, and any behavior affected.
- **Verification:** Tests, lint, build, or manual checks and their results.
- **Mistakes and lessons:** What went wrong and what to remember.
- **Revision checklist:** Short prompts to test understanding later.

## Lab 2 - Understanding The Project

### Start The Development Server

**Date:** 2026-09-15

**Question or goal:** How do I start the development server or run the application?

**Answer or concept:** The sample application is a React app powered by Vite. Run the commands from the `eCommApp` directory. Vite is configured to open the browser automatically on port `3000`.

**Commands:**

```bash
cd treinamento/eCommApp
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) if the browser does not open automatically. Stop the development server with `Ctrl+C`.

**References:**

- [`eCommApp/package.json`](../eCommApp/package.json) defines the `dev` script as `vite`.
- [`eCommApp/vite.config.ts`](../eCommApp/vite.config.ts) configures port `3000` and automatic browser opening.

**Code fixes:** None.

**Verification:** `npm install` completed successfully. The development command is available through the `dev` script; the configured port is `3000`.

**Mistakes and lessons:** Run npm commands from `treinamento/eCommApp`, where `package.json` is located. Installing dependencies is required before starting the app for the first time.

**Revision checklist:**

- [ ] Can I explain the difference between `npm install` and `npm run dev`?
- [ ] Can I identify which file defines the available npm scripts?
- [ ] Can I find the configured Vite development port?
- [ ] Can I explain how to stop the development server?

### Improve The Application README

**Date:** 2026-09-15

**Question or goal:** How can the application README become a useful Quick Start Guide for developers and for the GitHub Copilot labs?

**Answer or concept:** Good project documentation should describe the complete path from prerequisites to a working application. It should also document the commands developers actually use, the important files and folders, the validation workflow, and known setup limitations. Documentation is more reliable when it is checked against `package.json`, `vite.config.ts`, and the real project structure.

**Commands or references:**

- [`eCommApp/README.md`](../eCommApp/README.md) now contains the Quick Start Guide.
- [`eCommApp/package.json`](../eCommApp/package.json) is the source for npm scripts, dependencies, and test commands.
- [`eCommApp/vite.config.ts`](../eCommApp/vite.config.ts) defines the development port, build output, and Vitest settings.

Useful validation commands, run from `treinamento/eCommApp`:

```bash
npm run test:run
npm run build
npm run lint
```

**Code fixes:** Updated `eCommApp/README.md` to include prerequisites, installation, the Vite development server, all npm scripts, tests and coverage, important files, project structure, development workflow, and troubleshooting guidance. Added a note explaining that `npm run lint` is currently blocked because the project has no ESLint configuration file.

**Verification:**

- `npm run test:run` passed: 1 test file and 1 test passed.
- `npm run build` passed: TypeScript checking and the Vite production build completed successfully.
- `git diff --check` passed with no whitespace errors.
- `npm run lint` reached ESLint but failed because no ESLint configuration exists in the project.

**Mistakes and lessons:** Run npm commands from `treinamento/eCommApp`, not the repository root. A script being present in `package.json` does not guarantee that its supporting configuration exists. Documentation should state that limitation clearly instead of presenting the command as fully operational.

**Revision checklist:**

- [ ] Can I find the source of truth for each npm command?
- [ ] Can I explain why `npm run build` checks TypeScript before running Vite?
- [ ] Can I name the files that control Vite's port and Vitest's environment?
- [ ] Can I distinguish a failing lint setup from a failing application test?
- [ ] Can I describe the minimum validation workflow before completing a change?

### Execute The `CartPage` Unit Test Plan

**Date:** 2026-09-15

**Question or goal:** How can the `CartPage` unit test plan be implemented and verified?

**Answer or concept:** A useful component test suite covers both rendered output and user-visible state changes. For `CartPage`, that means testing the normal cart, empty state, checkout modal, cancellation, confirmed checkout, missing context, accessibility-oriented queries, and representative formatting edge cases.

**Commands or references:**

- [`eCommApp/src/components/CartPage.test.tsx`](../eCommApp/src/components/CartPage.test.tsx) contains the expanded test suite.
- [`eCommApp/src/components/CartPage.tsx`](../eCommApp/src/components/CartPage.tsx) is the behavior under test.
- Run tests from `treinamento/eCommApp`:

```bash
npm run test:run
npm run build
```

**Code fixes:** Expanded `CartPage.test.tsx` from two rendering tests to eight tests. Added coverage for checkout modal opening, cancellation without clearing the cart, confirmed checkout and processed-item preservation, unused `addToCart`, zero price and quantity formatting, image accessibility, header/footer rendering, and missing `CartContext`. Added a typed mock-context factory and used `user-event` for interactions.

**Verification:**

- Focused CartPage run passed: 1 test file and 8 tests passed.
- Full `npm run test:run` passed: 1 test file and 8 tests passed.
- `npm run build` passed, including TypeScript checking and the Vite production build.
- The expected missing-context error is asserted without noisy console output.

**Mistakes and lessons:** A test helper that uses `ReturnType<typeof createMockCartContext>` inside its own declaration creates a circular TypeScript inference error. Define an explicit mock type instead. Also, negative React rendering tests can log expected errors; temporarily spy on `console.error` and restore it so real failures remain visible.

**Revision checklist:**

- [ ] Can I separate rendering tests from interaction/state-transition tests?
- [ ] Can I explain why the cancel path must verify that `clearCart` was not called?
- [ ] Can I verify that confirmed checkout preserves the submitted items after clearing the cart?
- [ ] Can I test a component's required context provider failure?
- [ ] Can I explain why user-event is preferred for simulating user clicks?

### Refine `CartPage` Tests After Best-Practices Review

**Date:** 2026-09-15

**Question or goal:** How can the `CartPage` tests be improved after reviewing test isolation and mock fidelity?

**Answer or concept:** Tests are more maintainable when each test receives independent data and mocks reflect the real user-facing contract. Shared mutable fixtures can leak state between tests, while placeholder labels in mocks can make tests pass even when the real UI uses different accessible names.

**Commands or references:**

- [`eCommApp/src/components/CartPage.test.tsx`](../eCommApp/src/components/CartPage.test.tsx) contains the refinements.
- [`eCommApp/src/components/CheckoutModal.tsx`](../eCommApp/src/components/CheckoutModal.tsx) is the source of the real checkout button labels.

```bash
npm run test:run -- src/components/CartPage.test.tsx
npm run build
```

**Code fixes:** Updated `createMockCartContext` to clone the cart items and their reviews for each test. Updated the mocked checkout controls and test queries to use the production labels `Continue Checkout` and `Return to cart`.

**Verification:** The focused `CartPage` suite passed with 1 test file and 8 tests. The test queries now validate the same accessible names users see in the real checkout modal.

**Mistakes and lessons:** A mock should preserve the user-visible contract of the component it replaces. Cloning test data is a small but important safeguard against state leakage as the suite grows.

**Revision checklist:**

- [ ] Why should shared test fixtures be cloned when tests may mutate them?
- [ ] Why should mocked accessible names match production labels?
- [ ] Which part of the test suite verifies the checkout cancel path?
- [ ] Which command runs only the `CartPage` tests?

### Add `CartContext` And `CheckoutModal` Coverage

**Date:** 2026-09-15

**Question or goal:** Which small, independent units should be tested next to improve the coverage baseline efficiently?

**Answer or concept:** After covering `CartPage`, the next high-value targets were its mocked dependencies: the real `CartProvider` and the real `CheckoutModal`. Testing them directly verifies behavior that isolated `CartPage` tests intentionally do not execute.

**Commands or references:**

- [`eCommApp/src/context/CartContext.test.tsx`](../eCommApp/src/context/CartContext.test.tsx) tests initial state, adding products, quantity increments, and clearing the cart.
- [`eCommApp/src/components/CheckoutModal.test.tsx`](../eCommApp/src/components/CheckoutModal.test.tsx) tests content and both callback actions.
- [`eCommApp/src/context/CartContext.tsx`](../eCommApp/src/context/CartContext.tsx) is tested through a small consumer component.
- [`eCommApp/src/components/CheckoutModal.tsx`](../eCommApp/src/components/CheckoutModal.tsx) is tested with controlled callback mocks.

```bash
npm run test:run
npm run test:coverage
npm run build
```

**Code fixes:** Added seven focused tests: four for `CartProvider` and three for `CheckoutModal`. The context tests use `user-event` through a test consumer instead of testing React state internals directly.

**Verification:**

- Full suite passed: 3 test files and 15 tests passed.
- Production build passed, including TypeScript checking.
- Statement coverage increased from `18.75%` to `26.56%`.
- `CartContext.tsx` reached 100% statements, functions, and lines, with 88.88% branch coverage.
- `CheckoutModal.tsx` reached 100% statements, branches, functions, and lines.

**Mistakes and lessons:** Mocking a dependency in a component test isolates the component, but it also excludes the dependency from coverage. Direct tests are needed for context providers and reusable UI components. The next major coverage target is `ProductsPage.tsx`, which contains loading, error, stock, cart, and review behavior.

**Revision checklist:**

- [ ] Why should a context provider be tested through a consumer component?
- [ ] Which `CartProvider` behaviors are covered by the new tests?
- [ ] Why does mocking `CheckoutModal` in `CartPage.test.tsx` require a separate modal test file?
- [ ] What was the measured statement-coverage improvement?
- [ ] Which file should be prioritized next and why?

## Future Entries

### [Lab or Project Topic]

**Date:** YYYY-MM-DD

**Question or goal:**

**Answer or concept:**

**Commands or references:**

**Code fixes:**

**Verification:**

**Mistakes and lessons:**

**Revision checklist:**

- [ ]
- [ ]
