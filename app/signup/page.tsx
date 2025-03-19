"use client"
import React from "react"
import Link from "next/link"
import { FormControl } from "@/app/components/form-control"
import { AuthForm } from "@/app/components/auth-form"
import { createUser } from "@/app/actions"

const Footer = (
  <div className="px-12 py-8 bg-neutral-100 rounded-b-lg">
    <p className="text-center">
      <span className="">Already have an account?&nbsp;&nbsp;</span>
      <Link href="/login" className="font-semibold text-fuchsia-700">
        Login
      </Link>
    </p>
  </div>
)

export default function SignupPage() {
  return (
    <AuthForm
      title="Sign Up"
      btnLabel="Sign Up"
      formAction={createUser}
      hasFooter={true}
      footer={Footer}
    >
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
