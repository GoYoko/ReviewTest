# ReviewTest

This repo contains intentionally vulnerable code samples for testing review bots / LSP navigation.

## TypeScript (multi-layer)
- Entry: `ts-vuln/src/index.ts`
- Modules: `ts-vuln/src/http/*` → `ts-vuln/src/services/*` → `ts-vuln/src/repositories/*` → `ts-vuln/src/infra/*`

## JavaScript
- `js-vuln/eval-math.js` (eval RCE)
- `js-vuln/regex-redos.js` (ReDoS)
- `js-vuln/jwt-accept-none.js` (JWT alg=none / no verification)

## Python
- `python-vuln/pickle_load.py` (pickle RCE)
- `python-vuln/yaml_load.py` (unsafe YAML load)
- `python-vuln/cmd_injection.py` (shell=True)
- `python-vuln/sql_injection.py` (SQL injection)

Do not deploy/run these on anything you care about.
