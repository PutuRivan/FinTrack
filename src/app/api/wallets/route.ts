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
      rek,
      created_at
    `)
    .eq("user_id", authData.user.id)
    .order("created_at", { ascending: false });

  // Calculation
  const totalWallets = data?.length || 0;

  const totalBalance = data?.reduce(
    (sum, wallet) => sum + Number(wallet.balance),
    0
  );

  const totalSavings = data?.filter(wallet => wallet.type === "savings")
    .reduce((sum, wallet) => sum + Number(wallet.balance), 0);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data: data,
    summary: {
      total_wallet: totalWallets,
      total_balance: totalBalance,
      total_savings: totalSavings,
    },
  });
}