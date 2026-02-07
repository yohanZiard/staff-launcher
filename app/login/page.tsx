"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { USERS } from "../lib/auth"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const PASSWORD = "staff123" // shared password

  function handleLogin() {
    setError("")

    const user = USERS[email as keyof typeof USERS]

    if (!user || password !== PASSWORD) {
      setError("Access not permitted")
      return
    }

    localStorage.setItem("email", email)
    localStorage.setItem("role", user.role)

    router.push("/dashboard")
  }

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
      <img src="/logo.png" alt="Company Logo" style={{ width: 120 }} />

      <h2>Staff Access</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, width: 220 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: 8, width: 220 }}
      />

      <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
