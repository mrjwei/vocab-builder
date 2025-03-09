"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/app/components/button"

export const LogoutButton = ({ className }: { className?: string }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    })
    router.push("/login")
  }
  return (
    <Button type="button" onClick={handleLogout} className={className}>
      Logout
    </Button>
  )
}
