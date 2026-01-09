"use server"

import { redirect } from "next/navigation"
import { createClient } from "../supabase/server"


export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const username = formData.get("username")?.toString()

  if (!email || !password || !username) {
    return {
      success: false,
      message: "Semua field wajib diisi",
    }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: username,
      },
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }

  return {
    success: true,
    data,
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()

  if (!email || !password) {
    return {
      success: false,
      message: "Semua field wajib diisi",
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      success: false,
      message: error.message,
    }
  }
  // toast.success("Sign in berhasil")
  redirect("/home")
}

