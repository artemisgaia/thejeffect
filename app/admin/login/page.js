import { supabaseConfigured } from '@/lib/supabase/config';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <p className="adm-login__brand">The J Effect</p>
        <h1>Admin sign in</h1>
        {!supabaseConfigured && (
          <p className="adm-alert adm-alert--warn">
            Supabase isn&rsquo;t connected. Copy <code>.env.local.example</code> to <code>.env.local</code> and add
            your Supabase URL and anon key, then restart.
          </p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
