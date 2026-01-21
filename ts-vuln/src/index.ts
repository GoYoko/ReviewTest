import { createRouter } from "./http/router";
import { HttpRequest } from "./http/types";

async function main() {
  const router = createRouter();

  const req: HttpRequest = {
    method: "GET",
    path: process.argv[2] ?? "/users/search",
    query: Object.fromEntries(
      (process.argv[3] ?? "q=alice&redirect=http://127.0.0.1:80/").split("&").map((kv) => {
        const [k, v = ""] = kv.split("=");
        return [decodeURIComponent(k), decodeURIComponent(v)];
      }),
    ),
    headers: {
      "x-debug": process.env.DEBUG ?? "",
    },
    body: process.argv[4] ?? "",
  };

  const res = await router.handle(req);
  process.stdout.write(res.body);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

