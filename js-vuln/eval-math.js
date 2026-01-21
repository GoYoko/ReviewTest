// Intentionally vulnerable: remote code execution via eval.
// Usage: node js-vuln/eval-math.js "2+2"

const expr = process.argv[2] ?? "2+2";
// eslint-disable-next-line no-eval
const result = eval(expr);
process.stdout.write(String(result) + "\n");

