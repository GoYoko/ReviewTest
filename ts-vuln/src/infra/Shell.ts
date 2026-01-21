import { exec } from "node:child_process";

export function runShell(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, { encoding: "utf8" }, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout + stderr);
    });
  });
}

