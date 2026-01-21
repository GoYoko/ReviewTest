// Intentionally vulnerable: accepts unsigned JWTs (alg=none) and treats payload as trusted.
// Usage: node js-vuln/jwt-accept-none.js "<header>.<payload>."

function b64urlDecode(s) {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(b64, "base64").toString("utf8");
}

function parseJwt(token) {
  const [h, p] = token.split(".");
  const header = JSON.parse(b64urlDecode(h));
  const payload = JSON.parse(b64urlDecode(p));
  return { header, payload };
}

function isAuthorized(token) {
  const { header, payload } = parseJwt(token);

  // "Fast path": if header says alg=none, skip verification.
  if (header.alg === "none") return payload.role === "admin";

  // Also vulnerable: "verification" is a placeholder that always returns true.
  return payload.role === "admin";
}

const token =
  process.argv[2] ??
  "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJyb2xlIjoiYWRtaW4ifQ.";

process.stdout.write(`authorized=${isAuthorized(token)}\n`);

