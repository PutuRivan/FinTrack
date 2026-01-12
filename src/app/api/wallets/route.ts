import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    return NextResponse
      .json({ error: "User not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("wallets")
    .select(`
      id,
      name,
      balance,
      type,
      icon,
      created_at
    `)
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
