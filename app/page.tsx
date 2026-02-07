"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")
    router.push(role ? "/dashboard" : "/login")
  }, [])

  return null
}
