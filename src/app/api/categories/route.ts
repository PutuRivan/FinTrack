import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();

  if (!authData?.user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      type,
      icon,
      color,
      created_at,
      transactions:transactions (
        amount
      )
    `)
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Hitung total transaksi per category
  const result = data.map((category) => {
    const total = category.transactions.reduce(
      (sum, trx) => sum + Number(trx.amount),
      0
    );

    return {
      ...category,
      total_amount: total,
      transactions: undefined, // opsional: hapus raw data
    };
  });

  return NextResponse.json(result);
}
