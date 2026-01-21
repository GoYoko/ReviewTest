export type HttpMethod = "GET" | "POST";

export type HttpRequest = {
  method: HttpMethod;
  path: string;
  query: Record<string, string | undefined>;
  headers: Record<string, string | undefined>;
  body: string;
};

export type HttpResponse = {
  status: number;
  headers: Record<string, string>;
  body: string;
};

