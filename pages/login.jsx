import React from 'react';
import nookies from 'nookies';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import urls from '@/constants/urls';
import styles from '@/constants/styles';

const Error = styled.span`
  color: ${styles.ERROR_MESSAGE};
  margin-bottom: 16px;
`;

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  return (
    <main style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" alt="Logo Alurakut" />
          <p>
            <strong>Conecte-se </strong>
            aos seus amigos e familiares usando recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça </strong>
            novas pessoas através de amigos de seus amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe </strong>
            seus vídeos, fotos e paixões em um só lugar
          </p>
        </section>
        <section className="formArea">
          <form
            className="box"
            onSubmit={(event) => {
              event.preventDefault();
              // Reset error message
              setErrorMessage('');
              // Validate githubuser
              fetch(`/api/users?user=${githubUser}`)
                .then(async (response) => {
                  // User not found
                  if (!response.ok) {
                    setErrorMessage('Usuário inválido');
                    return;
                  }

                  fetch(urls.API_ALURAKUT.LOGIN, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ githubUser }),
                  })
                    .then(async (loginResponse) => {
                      const logindResponse = await loginResponse.json();
                      nookies.set(null, 'USER_TOKEN', logindResponse.token, {
                        path: '/',
                        maxAge: 604_800,
                      });
                      router.push('/');
                    });
                });
            }}
          >
            <p>
              Acesse agora mesmo com seu usuário do
              <strong> GitHub</strong>
              !
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={(evento) => {
                setGithubUser(evento.target.value);
              }}
            />
            <Error>
              {errorMessage}
            </Error>
            <button type="submit">
              Login
            </button>
          </form>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br -
            <a href="/"> Sobre o Orkut.br </a>
            -
            <a href="/"> Centro de segurança </a>
            -
            <a href="/"> Privacidade </a>
            -
            <a href="/"> Termos </a>
            -
            <a href="/"> Contato </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
