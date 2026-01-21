export function deepMergeUnsafe(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nextTarget = (target[key] as Record<string, unknown>) ?? {};
      target[key] = deepMergeUnsafe(nextTarget, value as Record<string, unknown>);
    } else {
      target[key] = value;
    }
  }
  return target;
}

