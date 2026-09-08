'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, confirmRegistration, login, resendCode } from '@/lib/auth';

export default function SignUpPage() {
  const router = useRouter();
  const [stage, setStage] = useState('register'); // 'register' | 'confirm'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleRegister() {
    setBusy(true);
    setError('');
    try {
      await register(email, password);
      setStage('confirm');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleConfirm() {
    setBusy(true);
    setError('');
    try {
      await confirmRegistration(email, code);
      await login(email, password);
      router.replace('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      {stage === 'register' ? (
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
          <button onClick={handleRegister} disabled={busy}>Create account</button>
        </div>
      ) : (
        <div>
          <p>Enter the code sent to {email}.</p>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Verification code" />
          <button onClick={handleConfirm} disabled={busy}>Confirm</button>
          <button onClick={() => resendCode(email)} disabled={busy}>Resend code</button>
        </div>
      )}
      {error && <p role="alert">{error}</p>}
    </main>
  );
}
