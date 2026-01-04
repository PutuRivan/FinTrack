import "server-only"
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react"

export const createClient = cache(async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!(supabaseUrl && supabaseKey)) {
    throw new Error("Missing Supabase environment variables");
  }

  let cookieStore: Awaited<ReturnType<typeof cookies>>;
  try {
    cookieStore = await cookies();
  } catch {
    // If cookies() throws (e.g., in static generation, edge runtime, or during RSC rendering),
    // create a client without cookie handling
    console.warn(
      "Cookies not available, creating Supabase client without session"
    );
    return createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // noop - cookies not available
        },
      },
    });
  }

  // Cookies are available, create normal client
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // noop - cookies might be read-only in this context
        }
      },
    },
  });
})
