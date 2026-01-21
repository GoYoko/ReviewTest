import { UserController } from "./controllers/UserController";
import { HttpRequest, HttpResponse } from "./types";

export function createRouter() {
  const userController = new UserController();

  return {
    async handle(req: HttpRequest): Promise<HttpResponse> {
      if (req.path.startsWith("/users/search")) return userController.search(req);
      if (req.path.startsWith("/users/profile")) return userController.profile(req);
      if (req.path.startsWith("/debug/trace")) return userController.debugTrace(req);
      if (req.path.startsWith("/assets")) return userController.asset(req);

      return { status: 404, headers: { "content-type": "text/plain" }, body: "not found\n" };
    },
  };
}

