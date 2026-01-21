import { readFile } from "node:fs/promises";

export async function readTextFile(path: string): Promise<string> {
  const data = await readFile(path);
  return data.toString("utf8");
}

