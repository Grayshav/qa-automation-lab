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
├── playwright-suite/       # 1. Modern Web E2E (TypeScript)
│   ├── tests/
│   │   └── todo_app.spec.ts
│   ├── playwright.config.ts
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
| `npm run test:playwright` | Runs the Playwright TypeScript E2E suite |
| `npm run test:selenium` | Runs the Python Selenium POM suite + generates `report.html` |
| `npm run test:k6` | Runs the k6 API load test with thresholds |

---

## 2. Using VS Code Server

Open the **`qa-automation-lab`** directory in VS Code Server (`http://<server-ip>:8443` or through your tunnel/Tailscale):

### A. Testing Sidebar (GUI Explorer)
1. Click the **Flask / Testing** icon on the left Activity Bar (`Ctrl+Shift+T`).
2. Playwright and Pytest tests are discovered automatically.
3. Click the **Play** button beside any test or folder to run or debug it visually.

### B. Command Palette Tasks
Press `Ctrl+Shift+P` (or `Cmd+Shift+P`) -> select **Tasks: Run Task**:
* `1. Run Playwright Tests`
* `2. Run Selenium Tests (pytest)`
* `3. Run k6 Load Test`

---

## 3. Running Suites Individually via CLI

### Playwright (Web E2E)
```bash
cd playwright-suite
npm test
```
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
