import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "all-type";
  const category = searchParams.get("category") || "all";
  const period = searchParams.get("period") || "30days";

  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Calculate date range
  const now = new Date();
  const startDate = new Date();

  if (period === "7days") {
    startDate.setDate(now.getDate() - 7);
  } else if (period === "30days") {
    startDate.setDate(now.getDate() - 30);
  } else if (period === "90days") {
    startDate.setDate(now.getDate() - 90);
  } else {
    // Default to current month if likely intent, currently sticking to period logic or default 30 days
    startDate.setDate(1); // Beginning of current month if "month" logic was strict
    // But aligning with UI dropdown which has days:
    startDate.setDate(now.getDate() - 30);
  }

  // For "date by month" request: if simple period logic isn't enough, we might need specific month handling.
  // Assuming "period" param covers it for now based on UI.

  // Base query construction function to reuse filters for both data and stats
  const buildQuery = (isStats = false) => {
    let query = supabase
      .from("transactions")
      .select(
        isStats
          ? `amount, type, categories!inner ( name )`
          : `
        category_id,
        categories!inner ( name, type, icon, color),
        wallet_id,
        wallets ( name, type, balance, icon),
        id,
        amount,
        type,
        transaction_date,
        description,
        created_at
      `,
        { count: "exact" },
      )
      .eq("user_id", userData.user.id);

    // Apply filters
    if (search) {
      query = query.ilike("description", `%${search}%`);
    }

    if (type !== "all-type") {
      query = query.eq("type", type);
    }

    if (category !== "all") {
      query = query.eq("categories.name", category);
    }

    // Date filter
    if (period !== "all") {
      query = query.gte("transaction_date", startDate.toISOString());
    }

    return query;
  };

  // Execute queries
  const query = buildQuery(false);
  const statsQuery = buildQuery(true);

  // Pagination for the main list
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const [
    { data: transactions, error, count },
    { data: statsData, error: statsError },
  ] = await Promise.all([
    query.order("transaction_date", { ascending: false }).range(from, to),
    statsQuery,
  ]);

  if (error || statsError) {
    return NextResponse.json(
      { error: error?.message || statsError?.message },
      { status: 500 },
    );
  }

  // Calculate statistics
  const stats = ((statsData as unknown as { amount: number; type: string }[]) ||
    []).reduce(
      (acc, curr) => {
        const amount = Number(curr.amount);
        if (curr.type === "income") {
          acc.income += amount;
          acc.total_balance += amount;
        } else {
          acc.expense += amount;
          acc.total_balance -= amount;
        }
        return acc;
      },
      { income: 0, expense: 0, total_balance: 0 },
    );

  const meta = {
    total: count,
    page,
    limit,
    totalPages: count ? Math.ceil(count / limit) : 0,
  };

  return NextResponse.json({ transactions, meta, stats }, { status: 200 });
}
