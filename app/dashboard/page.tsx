"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const ALL_TOOLS = [
  "Petty Cash Voucher",
  "Fuel Voucher",
  "MarginLock Sales",
  "MarginLock OMS",
  "MarginLock Management",
  "MarginLock Pricing",
  "Debit Card Uploads",
  "Accounts Uploads",
  "Shipment Docs",
]

const STAFF_TOOLS = [
  "Petty Cash Voucher",
  "Fuel Voucher",
  "MarginLock Sales",
]

const LINKS: Record<string, string | null> = {
  "Petty Cash Voucher": "https://forms.gle/ZGieoE6Bmq3oCHZX8",
  "Fuel Voucher": "https://forms.gle/VdpVxXaeEV8X4Q317",
  "MarginLock Sales": "https://yohanziard.github.io/sales-price-calculator/",
  "MarginLock OMS": null,
  "MarginLock Management": "https://yohanziard.github.io/management-pricing-calculator/",
  "MarginLock Pricing": "https://yohanziard.github.io/pricing-guide-v3/",
  "Debit Card Uploads": "https://forms.gle/63atJedZ6FUccVHE7",
  "Accounts Uploads": null,
  "Shipment Docs": null,
}

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      router.push("/login")
    }
  }, [router])

  const role =
    typeof window !== "undefined" ? localStorage.getItem("role") : null

  const visibleTools =
    role === "management" ? ALL_TOOLS : STAFF_TOOLS

  return (
    <div style={{ padding: 16 }}>
      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear()
          router.push("/login")
        }}
        style={{ position: "fixed", top: 12, right: 12 }}
      >
        Logout
      </button>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 12,
          marginTop: 48,
        }}
      >
        {visibleTools.map(tool => {
          const url = LINKS[tool]
          return (
            <div
              key={tool}
              onClick={() => url && (window.location.href = url)}
              style={{
                border: "1px solid #ccc",
                padding: 16,
                borderRadius: 8,
                opacity: url ? 1 : 0.5,
                cursor: url ? "pointer" : "default",
              }}
            >
              {tool}
              {!url && (
                <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>
                  Coming soon
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
