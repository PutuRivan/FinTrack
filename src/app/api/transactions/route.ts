import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(`
      category_id,
      categories ( name, type, icon, color),
      wallet_id,
      wallets ( name, type, balance, icon),
      id,
      amount,
      type,
      transaction_date,
      description,
      created_at
    `)
    .eq("user_id", data.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }


  return NextResponse.json({ transactions }, { status: 200 });
}
