import { PagesFunction, Response } from "@cloudflare/workers-types";

interface Env {
  SERVER_URL: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const targetUrl = context.env.SERVER_URL;

  console.log(
    "serverUrl",
    context.env.SERVER_URL,
    "requestUrl",
    context.request.url
  );
  const relPath = new URL(context.request.url).pathname;
  const url = new URL(targetUrl + relPath);
  console.log("resultingUrl", url);

  const data = await fetch(url, {
    method: context.request.method,
    headers: Object.fromEntries(context.request.headers.entries()),
    body: context.request.body as BodyInit,
  });

  return data as unknown as Response;
};
