# QA Automation Lab

A turnkey multi-framework QA automation suite configured for **VS Code Server** on Ubuntu Linux (ARM64).

This workspace pairs **Playwright** (Modern Web E2E), **Selenium** (Classic Industry Standard Web UI with POM), and **k6** (API & Performance / Load Testing).

---

## Workspace Structure

```text
qa-automation-lab/
├── package.json            # Root scripts for 1-command runs across all frameworks
├── pytest.ini              # Pytest configuration & path discovery
├── README.md               # This guide
├── .vscode/
│   ├── settings.json       # Configured for Playwright Test Explorer & Pytest
│   └── tasks.json          # Pre-configured 1-click execution tasks
│
├── playwright-suite/       # 1. Modern Web E2E (JavaScript)
│   ├── tests/
│   │   ├── ui/todo_app.spec.js
│   │   └── api/             # Future API specs
│   ├── pages/todo.page.js   # Locators and reusable browser actions
│   ├── fixtures/test.js     # Test resource setup and lifecycle
│   ├── test-data/todos.js   # Non-sensitive test inputs
│   ├── utils/              # Helpers added as needed
│   ├── .env.example        # Environment variable reference
│   ├── playwright.config.js
│   └── package.json
│
├── selenium-suite/         # 2. Classic Web UI with Page Object Model (Python)
│   ├── pages/
│   │   ├── base_page.py
│   │   └── login_page.py
│   ├── tests/
│   │   └── test_login.py
│   ├── conftest.py         # Headless Chrome driver fixture
│   ├── pytest.ini
│   └── requirements.txt
│
└── k6-suite/               # 3. API & Load / Performance (JavaScript)
    ├── tests/
    │   └── api_load_test.js
    └── package.json
```

---

## 1. Quick Start (From Root)

You can run any test suite directly from the workspace root:

| Command | Action |
| :--- | :--- |
| `npm run test:all` | Runs all 3 test suites sequentially (Playwright, Selenium, k6) |
| `npm run test:playwright` | Runs the Playwright JavaScript E2E suite |
| `npm run test:selenium` | Runs the Python Selenium POM suite + generates `report.html` |
| `npm run test:k6` | Runs the k6 API load test with thresholds |

---

## 2. Running Suites Individually via CLI

### Playwright (Web E2E)
```bash
cd playwright-suite
npm test
```
The UI tests use an isolated browser context per test. Assertions live in
`tests/ui/`, browser interactions in `pages/`, and shared setup in `fixtures/`.
`tests/api/` and `utils/` are placeholders for future additions.

The default target is the public TodoMVC demo. To override it with a compatible app:
```bash
BASE_URL=https://your-host/todomvc/ npm test
```
Keep the trailing slash. `.env.example` documents the variable; `.env` files
are not loaded automatically. Reports and test results are excluded from Git.

*View HTML test report:*
```bash
npx playwright show-report --host 0.0.0.0
```

### Selenium (Python + Page Object Model)
```bash
cd selenium-suite
pytest -v --html=report.html --self-contained-html
```
*Open `selenium-suite/report.html` to inspect step durations, pass/fail status, and environment details.*

### k6 (API & Load Testing)
```bash
cd k6-suite
npm test
```
*Quick spike test with custom virtual users and duration:*
```bash
k6 run --vus 10 --duration 15s tests/api_load_test.js
```
