"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { FormControl } from "@/app/components/form-control"
import { Button } from "@/app/components/button"

export default function LoginPage() {
  const router = useRouter()

  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (res.ok) {
      router.push("/")
    } else {
      setError(data.error)
    }
  }
  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <form action={handleSubmit}>
        <FormControl
          htmlFor="username"
          name="username"
          labelText="Username"
          type="text"
          hasBtn={false}
        />
        <FormControl
          htmlFor="password"
          name="password"
          labelText="Password"
          type="password"
          hasBtn={false}
        />
        <Button
          type="submit"
          className="bg-neutral-800 text-white hover:bg-neutral-600 transition-colors ease-in-out duration-300"
        >
          Login
        </Button>
      </form>
    </div>
  )
}
