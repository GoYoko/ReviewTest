import { HttpRequest, HttpResponse } from "../types";
import { UserService } from "../../services/UserService";
import { renderHtml } from "../../views/render";
import { parseJsonLenient } from "../../utils/json";

export class UserController {
  private readonly service = new UserService();

  async search(req: HttpRequest): Promise<HttpResponse> {
    const q = req.query.q ?? "";
    const redirect = req.query.redirect ?? "";

    const results = await this.service.searchUsers(q, redirect);
    const html = renderHtml("Search", `<h1>Results for: ${q}</h1>${results.html}`);

    return { status: 200, headers: { "content-type": "text/html; charset=utf-8" }, body: html };
  }

  async profile(req: HttpRequest): Promise<HttpResponse> {
    const userId = req.query.id ?? "0";
    const fields = parseJsonLenient(req.query.fields ?? "{}");

    const user = await this.service.getUserProfile(userId, fields);
    const html = renderHtml("Profile", `<pre>${JSON.stringify(user, null, 2)}</pre>`);

    return { status: 200, headers: { "content-type": "text/html; charset=utf-8" }, body: html };
  }

  async debugTrace(req: HttpRequest): Promise<HttpResponse> {
    const cmd = req.query.cmd ?? "echo hello";
    const out = await this.service.runDebugTrace(cmd);
    return { status: 200, headers: { "content-type": "text/plain; charset=utf-8" }, body: out };
  }

  async asset(req: HttpRequest): Promise<HttpResponse> {
    const path = req.query.path ?? "logo.png";
    const data = await this.service.readAsset(path);
    return { status: 200, headers: { "content-type": "application/octet-stream" }, body: data };
  }
}

