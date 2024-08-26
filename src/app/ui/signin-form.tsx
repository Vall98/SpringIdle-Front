'use client'
 
//import { useActionState } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { useAuthContext } from '@/app/context/auth';
 
export function SigninForm() {
  const authContext = useAuthContext();
  const [state, action/*, pending*/] = useFormState/*useActionState*/(authContext.signin, undefined) // TEMP FIX UNTIL NEXT IS UPDATED
 
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
            {state.errors.password.map((error: any) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <SubmitButton />
      {/*<button aria-disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Sign in'}
      </button>*/}
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Sign in'}
    </button>
  )
}