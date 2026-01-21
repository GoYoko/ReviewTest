import { UserRepository } from "../repositories/UserRepository";
import { httpGet } from "../infra/HttpClient";
import { runShell } from "../infra/Shell";
import { readTextFile } from "../infra/Files";
import { deepMergeUnsafe } from "../utils/merge";

export class UserService {
  private readonly repo = new UserRepository();

  async searchUsers(query: string, redirectUrl: string): Promise<{ html: string }> {
    const users = await this.repo.searchByName(query);

    let meta = "";
    if (redirectUrl) {
      // SSRF: attacker-controlled URL is fetched server-side.
      const preview = await httpGet(redirectUrl);
      meta = `<p>Preview: ${preview.slice(0, 80)}</p>`;
    }

    // XSS: user data and query are rendered into HTML without escaping.
    const html =
      meta +
      `<ul>` +
      users.map((u) => `<li><a href="/users/profile?id=${u.id}">${u.displayName}</a></li>`).join("") +
      `</ul>`;
    return { html };
  }

  async getUserProfile(userId: string, fields: unknown): Promise<unknown> {
    const baseProfile = await this.repo.getById(userId);

    // Prototype pollution: deep merge blindly accepts user-controlled object keys.
    const merged = deepMergeUnsafe({ ...baseProfile }, fields as Record<string, unknown>);
    return merged;
  }

  async runDebugTrace(cmd: string): Promise<string> {
    // Command injection: user-controlled string passed to shell.
    const out = await runShell(cmd);
    return out;
  }

  async readAsset(assetPath: string): Promise<string> {
    // Path traversal: attacker can read arbitrary files via ../
    return readTextFile(`./public/${assetPath}`);
  }
}

