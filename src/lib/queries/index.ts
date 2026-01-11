import { createClient } from "../supabase/server";

export async function getUserById(id: string) {
  const supabase = await createClient();
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (!user) {
    return { error: "User not found" };
  }

  return user;
}