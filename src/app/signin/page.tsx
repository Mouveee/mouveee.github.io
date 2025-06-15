"use client"

import { signIn } from "next-auth/react"

export default function SignIn() {
  const handleSignIn = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/admin",
    })
  }

  return (
    <button
      className="bg-pink-500 text-white px-4 py-2 rounded fixed top-1/2 right-1/2"
      onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  )
}
