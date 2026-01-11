"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import type { TFormState } from "../types/schema";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();

  if (!email || !password || !username) {
    return {
      success: false,
      message: "Semua field wajib diisi",
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: username,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    data,
  };
}

export async function signInWithPassword(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      success: false,
      message: "Semua field wajib diisi",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
  // toast.success("Sign in berhasil")
  redirect("/home");
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function createCategory(
  _prevState: TFormState,
  formData: FormData,
): Promise<TFormState> {
  const supabase = await createClient();

  const name = formData.get("name")?.toString();
  const type = formData.get("type")?.toString();
  const icon = formData.get("icon")?.toString();
  const color = formData.get("color")?.toString();

  if (!name || !type) {
    return {
      success: false,
      message: "Name and type are required",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  const { error } = await supabase.from("categories").insert({
    name,
    type,
    icon: icon,
    color: color,
    user_id: user.id,
  });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Category created successfully",
  };
}

export async function createTransaction(
  _prevState: TFormState,
  formData: FormData): Promise<TFormState> {
  const supabase = await createClient();

  const type = formData.get("type")?.toString();
  const amount = formData.get("amount")?.toString();
  const category = formData.get("category")?.toString();
  const date = formData.get("date")?.toString();
  const description = formData.get("description")?.toString();

  console.log({ type, amount, category, date, description });

  if (!type || !amount || !category || !date || !description) {
    return {
      success: false,
      message: "All fields are required",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "User not authenticated",
    };
  }

  const { error } = await supabase
    .from("transactions")
    .insert({
      type,
      amount,
      category_id: category,
      date,
      description,
      user_id: user.id,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Transaction created successfully",
  }
}
