'use client';
import { useActionState } from 'react';
import { signIn } from '../actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);
  return (
    <form action={action} className="adm-form">
      <label className="adm-field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="username" required />
      </label>
      <label className="adm-field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="current-password" required />
      </label>
      {state?.error && <p className="adm-alert adm-alert--error" role="alert">{state.error}</p>}
      <button type="submit" className="adm-btn adm-btn--primary" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
