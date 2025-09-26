import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET = (async () => {
  return new Response(JSON.stringify(await getCollection("homework")));
}) satisfies APIRoute;
