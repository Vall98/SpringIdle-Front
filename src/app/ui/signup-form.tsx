'use client'
 
import { signup } from '@/app/actions/auth'
//import { useActionState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
 
export function SignupForm() {
  const [state, action/*, pending*/] = useFormState/*useActionState*/(signup, undefined) // TEMP FIX UNTIL NEXT IS UPDATED
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" placeholder="Username" />
      </div>
      {state?.errors?.username && <p>{state.errors.username}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="Password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton />
      {/*<button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Sign up'}
      </button>*/}
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Sign up'}
    </button>
  )
}