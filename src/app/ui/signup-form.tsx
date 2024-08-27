'use client'
 
//import { useActionState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { useAuthContext } from '@/app/context/auth';
import { InputField } from './input-field';
import Link from 'next/link';
import { Button } from './button';
 
export function SignupForm() {
  const authContext = useAuthContext();
  authContext.signup
  const [state, action/*, pending*/] = useFormState/*useActionState*/(authContext.signup, undefined) // TEMP FIX UNTIL NEXT IS UPDATED
 
  return (
    <form action={action}>
    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Join</h2>
    {state?.errors?.username && <p className="text-red-400">{state.errors.username}</p>}
    <InputField label="Username" id="username" type="text" required={true} />
    <InputField label="Password" id="password" type="password" required={true} />
    {state?.errors?.password && (
        <div>
          <p className="text-red-400">Password must:</p>
          <ul>
            {state.errors.password.map((error: any) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
    <br/>
    <div className="text-center">
      {/*<Button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Sign up'}
      </Button>*/}
      <SubmitButton />
    </div>
    <p className="text-center text-gray-600 text-sm mt-4">
      Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-800">Sign In</Link>
    </p>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Sign up'}
    </Button>
  )
}