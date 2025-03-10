"use client"
import React from "react"
import { FormControl } from "@/app/components/form-control"
import { Button } from "@/app/components/button"
import {createUser} from '@/app/actions'
// import {TState} from '@/app/types';

export default function SignupPage() {
  // const initState: TState = {message: null, error: null}
  // const [state, formAction] = React.useActionState(createUser, initState)

  return (
    <div>
      <form action={createUser}>
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
          Sign Up
        </Button>
      </form>
    </div>
  )
}
