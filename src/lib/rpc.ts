import type { AppType } from "@/server";
import { hc } from "hono/client";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL as string);
