"use client"

import { GoogleLogin } from "@react-oauth/google"
import { USERS } from "../lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <img
        src="/logo.png"
        alt="Company Logo"
        style={{ width: 120 }}
      />

      <h2>Staff Access</h2>

      <GoogleLogin
        onSuccess={(cred) => {
          const jwt = JSON.parse(atob(cred.credential!.split(".")[1]))
          const email = jwt.email as keyof typeof USERS

          if (!USERS[email]) {
            alert("Access not permitted")
            return
          }

          localStorage.setItem("email", email)
          localStorage.setItem("role", USERS[email].role)
          router.push("/dashboard")
        }}
        onError={() => {
          alert("Login failed")
        }}
      />
    </div>
  )
}
