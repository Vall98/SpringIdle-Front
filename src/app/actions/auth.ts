'use server'
import { SignupFormSchema, TokenResponse } from '@/app/lib/definitions'
import { checkTokenIsValid, deleteSession, storeSession } from '@/app/lib/session';

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
    return res.json().then(data => {
      if(!res.ok) {
        throw new Error(data.detail);
      } else {
        return {
          token: data
        };
      }    
    })
  }).catch((err: Error) => {
    return {
      error: err,
    };
  });
}

export async function fetchWithCredentials(url: string, method: string, body: any): Promise<any> {
  const token = await checkTokenIsValid();
  if (!token) {
    return {
      error: "Invalid credentials",
    };
  }
  return fetch(process.env.BASE_URL + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: body
  }).then(async res => {
    return res.json().then(data => {
      if(!res.ok) {
        throw new Error(data.detail);
      } else {
        return data;
      }
    })
  }).catch((err: Error) => {
    return {
      error: err.message,
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

export async function createUser(formData: FormData) {
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

export async function authUser(formData: FormData) {
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

export async function signUserOut(): Promise<void> {
  return deleteSession();
}

// Check if the local session is  not expired,
// then check the session is valid on the API.
export async function isSessionValid(): Promise<any> {
  // TODO: change to a route that returns the expiracy date instead of
  // the user's data.
  const res = await fetchWithCredentials("/users/me", 'GET', undefined);
  if (res.error) {
    deleteSession();
    return undefined;
  }
  return res;
}

// Check if the local session is expired,
// without fetching the API
export async function isSessionNotExpired(): Promise<boolean> {
  return await checkTokenIsValid() != undefined;
}