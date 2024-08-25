'use server'
import { SignupFormSchema, FormState, TokenResponse } from '@/app/lib/definitions'
import { storeSession } from '@/app/lib/session';

async function fetchToken(url: string, formData: any): Promise<TokenResponse> {
  // This has to be handled as a promise because on error, the object
  // returned by the server is hidden in a Promise (text()).
  return fetch(process.env.BASE_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData)
  }).then(async res => {
    if(!res.ok) {
      return res.text().then(text => {
        // text is a stringified object returned by the server,
        // i.e. { detail: error_message}
        const err = JSON.parse(text);
        throw new Error(err.detail);
      })
    } else {
      return {
        token: await res.json()
      };
    }    
  }).catch((err: Error) => {
    return {
      error: err,
    };
  });
}

function handleCredentialError(error: Error) {
  if (error.message.toLowerCase().includes("password")) {
    return {
      errors: {
        password: [
          error.message,
        ],
      },
    };
  } else {
    return {
      errors: {
        username: [
          error.message,
        ],
      },
    };
  }
}

function handleTokenResponse(res: TokenResponse, action: string) {
  if (!res.token) {
    if (!res.error) {
      res.error = new Error(action + " failed, please try again later")
    }
    return handleCredentialError(res.error);
  }
  storeSession(res.token);
}

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return handleTokenResponse(await fetchToken("/users/create", validatedFields.data), "Signup");
}

export async function signin(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return handleTokenResponse(await fetchToken("/users/token", validatedFields.data), "Signin");
}