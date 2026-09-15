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
