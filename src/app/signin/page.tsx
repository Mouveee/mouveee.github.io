"use client"

import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={() => signIn("google")}>LOGIN</button>
}