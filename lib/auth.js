// Authentication is isolated here so the implementation can be swapped for
// Amazon Cognito without touching the sign-in page.

export async function signIn(email, password) {
  throw new Error('Not implemented');
}
