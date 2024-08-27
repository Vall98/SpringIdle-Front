'use client'
 
//import { useActionState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { useAuthContext } from '@/app/context/auth';
import { Button } from './button';
import { InputField } from './input-field';
import Link from 'next/link';
 
export function SigninForm() {
  const authContext = useAuthContext();
  const [state, action/*, pending*/] = useFormState/*useActionState*/(authContext.signin, undefined) // TEMP FIX UNTIL NEXT IS UPDATED
 
  return (
    <form action={action}>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
      {state?.errors?.username && <p className="text-red-400">{state.errors.username}</p>}
      {state?.errors?.password && <p className="text-red-400">{state.errors.password}</p>}
      <InputField label="Username" id="username" type="text" required={true} />
      <InputField label="Password" id="password" type="password" required={true} />
      <br/>
      <div className="text-center">
        {/*<Button aria-disabled={pending} type="submit">
          {pending ? 'Submitting...' : 'Sign in'}
        </Button>*/}
        <SubmitButton />
      </div>
      <p className="text-center text-gray-600 text-sm mt-4">
        Don't have an account? <Link href="/join" className="text-blue-500 hover:text-blue-800">Sign Up</Link>
      </p>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Sign in'}
    </Button>
  )
}