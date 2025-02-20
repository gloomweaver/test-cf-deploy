import { PagesFunction, Response } from "@cloudflare/workers-types";

interface Env {
  SERVER_URL: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const targetUrl = context.env.SERVER_URL;
  const relPath = context.request.url;
  const url = new URL(targetUrl + relPath);

  const data = await fetch(url, {
    method: context.request.method,
    headers: Object.fromEntries(context.request.headers.entries()),
    body: context.request.body as BodyInit,
  });

  return data as unknown as Response;
};
