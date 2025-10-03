# Copilot Instructions for AI Coding Agents

## Project Overview
This workspace contains multiple small JavaScript web applications, each in its own folder. Each app is self-contained with its own `index.html`, `index.js`, and `styles.css` files. There are no shared libraries or build systems; all code is plain JavaScript, HTML, and CSS.

## Key Patterns & Conventions
- **App Structure:**
  - Each app is in a separate folder (e.g., `Clock/`, `Currency Converter/`, `WeatherAppOriginal/`).
  - Each app typically contains:
    - `index.html`: Main HTML file
    - `index.js`: Main JavaScript logic
    - `styles.css`: App-specific styles
    - `assets/`: (optional) Images and other static resources
- **No Build Step:**
  - All code runs directly in the browser. There are no build tools, bundlers, or package managers.
- **No External Dependencies:**
  - All logic is implemented using vanilla JavaScript. No npm packages or frameworks are used.
- **Naming:**
  - File and folder names may contain spaces and special characters. Always use quotes when referencing paths in scripts or commands.

## Developer Workflows
- **Running Apps:**
  - Open the `index.html` file of any app in a web browser to run it.
- **Debugging:**
  - Use browser developer tools (F12) for JavaScript debugging and inspecting DOM/CSS.
- **Adding Features:**
  - Add new features by editing the relevant app's `index.js` and `index.html`.
  - Keep each app self-contained; do not introduce cross-app dependencies.

## Examples
- To add a new feature to the Clock app, edit `Clock/index.js` and update `Clock/index.html` as needed.
- To add images to an app, place them in the app's `assets/` folder and reference them with relative paths in HTML or CSS.

## Special Notes
- **No Automated Tests:**
  - There are no test scripts or test frameworks in this codebase.
- **No CI/CD:**
  - There are no build or deployment pipelines configured.
- **No Shared State:**
  - Each app is independent; do not assume any shared state or code between apps.

## When in Doubt
- Follow the structure and conventions of existing apps.
- Keep changes isolated to the relevant app folder.
- If adding a new app, follow the same folder/file structure as existing apps.
