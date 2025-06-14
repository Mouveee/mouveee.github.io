"use client"

import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function SignIn() {
  const router = useRouter()

  const handleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
    })

    if (result?.ok) {
      router.push("/admin")
    } else {
      router.push("/")
    }
  }

  return (
    <button
      className="bg-pink-500 text-white px-4 py-2 rounded"
      onClick={handleSignIn}
    >
      Sign in with Google
    </button>
  )
}
