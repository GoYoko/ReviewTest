// Intentionally vulnerable: ReDoS via catastrophic backtracking.
// Usage: node js-vuln/regex-redos.js "aaaaaaaaaaaaaaaaaaaaaaaa!"

const input = process.argv[2] ?? "aaaaaaaaaaaaaaaaaaaa!";
const pattern = /^(a+)+$/;

const start = Date.now();
const ok = pattern.test(input);
const ms = Date.now() - start;

process.stdout.write(`match=${ok} timeMs=${ms}\n`);

