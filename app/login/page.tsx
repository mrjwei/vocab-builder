"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormControl } from "@/app/components/form-control"
import { AuthForm } from "@/app/components/auth-form"

const Footer = (
  <div className="px-12 py-8 bg-neutral-100 rounded-b-lg">
    <p className="text-center">
      <span className="">New to Vocab Builder?&nbsp;&nbsp;</span>
      <Link href="/signup" className="font-semibold text-fuchsia-700">
        Sign Up
      </Link>
    </p>
  </div>
)

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
    <AuthForm
      title="Login to Your Account"
      btnLabel="Login"
      formAction={handleSubmit}
      hasFooter={true}
      footer={Footer}
    >
      {error && <p className="text-red-600">{error}</p>}
      <FormControl
        htmlFor="username"
        name="username"
        labelText="Username"
        type="text"
        hasBtn={false}
        className="mb-4"
      />
      <FormControl
        htmlFor="password"
        name="password"
        labelText="Password"
        type="password"
        hasBtn={false}
      />
    </AuthForm>
  )
}
