'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: replace with Cognito authentication
    console.log({ email, password });
  }

  return (
    <div className="page">
      <Header
        action={
          <Link href="/" className="headerLink">
            Back to home
          </Link>
        }
      />
      <main className="main">
        <div className="card">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="button buttonBlock">
              Sign in
            </button>
          </form>
          <p className="cardFooter">
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
