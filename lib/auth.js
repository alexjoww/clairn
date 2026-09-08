import { Amplify } from 'aws-amplify';
import {
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  resendSignUpCode,
  signIn as amplifySignIn,
  confirmSignIn as amplifyConfirmSignIn,
  signOut as amplifySignOut,
  getCurrentUser as amplifyGetCurrentUser,
  fetchAuthSession,
} from 'aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
    },
  },
});

export async function register(email, password, givenName) {
  return amplifySignUp({
    username: email,
    password,
    options: { userAttributes: { email, given_name: givenName } },
  });
}

export async function confirmRegistration(email, code) {
  return amplifyConfirmSignUp({ username: email, confirmationCode: code });
}

export async function resendCode(email) {
  return resendSignUpCode({ username: email });
}

export async function login(email, password) {
  // Amplify throws if a session already exists; clear it first.
  try {
    await amplifySignOut();
  } catch {}
  return amplifySignIn({ username: email, password });
}

// Answers the CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED challenge that Cognito
// raises for users created with a temporary password. `attributes` covers the
// pool-required attributes the admin did not supply (nextStep.missingAttributes).
export async function completeNewPassword(newPassword, attributes) {
  const hasAttributes = attributes && Object.keys(attributes).length > 0;
  return amplifyConfirmSignIn({
    challengeResponse: newPassword,
    ...(hasAttributes ? { options: { userAttributes: attributes } } : {}),
  });
}

export async function logout() {
  return amplifySignOut();
}

export async function getCurrentUser() {
  try {
    return await amplifyGetCurrentUser();
  } catch {
    return null; // not signed in
  }
}

// Use this later for API Gateway calls.
export async function getIdToken() {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString() ?? null;
}
