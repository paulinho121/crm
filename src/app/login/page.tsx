'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { type AuthChangeEvent, type Session } from '@supabase/supabase-js';
import Image from 'next/image';

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session) {
          router.push('/');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="CRM MCI Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            CRM MCI
          </h1>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Endereço de e-mail',
                password_label: 'Sua senha',
                email_input_placeholder: 'seu.email@exemplo.com',
                button_label: 'Entrar',
                social_provider_text: 'Entrar com',
                link_text: 'Já tem uma conta? Entre',
              },
              sign_up: {
                email_label: 'Endereço de e-mail',
                password_label: 'Crie uma senha',
                email_input_placeholder: 'seu.email@exemplo.com',
                button_label: 'Cadastrar',
                social_provider_text: 'Cadastrar com',
                link_text: 'Não tem uma conta? Cadastre-se',
              },
              forgotten_password: {
                email_label: 'Endereço de e-mail',
                email_input_placeholder: 'seu.email@exemplo.com',
                button_label: 'Enviar instruções de recuperação',
                link_text: 'Esqueceu sua senha?',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
