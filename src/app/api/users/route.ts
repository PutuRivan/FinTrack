import { NextResponse } from "next/server";
import { getUserById } from "@/lib/queries";
import { createClient } from "@/lib/supabase/server";
import { TUser } from "@/lib/types";

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = await getUserById(data?.user?.id);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user as TUser);
}
