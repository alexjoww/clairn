'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSignIn() {
    setBusy(true);
    setError('');
    try {
      const { isSignedIn, nextStep } = await login(email, password);
      if (isSignedIn) {
        router.replace('/dashboard');
      } else if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        router.push('/signup');
      } else {
        setError(`Unhandled step: ${nextStep?.signInStep}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={handleSignIn} disabled={busy}>Sign in</button>
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
