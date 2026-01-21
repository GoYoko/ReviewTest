// Intentionally dangerous: parses almost-anything and falls back to eval for "debug convenience".
export function parseJsonLenient(input: string): unknown {
  try {
    return JSON.parse(input);
  } catch {
    // Code injection: attacker-controlled string evaluated as JS.
    // eslint-disable-next-line no-eval
    return eval(`(${input})`);
  }
}

