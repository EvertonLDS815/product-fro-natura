import { FormEvent, useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import Logo from '../../public/logo-jl-2.png';

import { Input } from '../components/ui/input';
import {Button} from '../components/ui/button';
import Link from 'next/link';

import {AuthContext} from '../contexts/AuthContext';

export default function Home() {
  const {signIn} = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const data = {
      email: 'everton@gmail.com',
      password: '123123'
    }
    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Natura - Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={Logo} alt="logo do site" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input type="text" placeholder={'Digite seu email...'} />
            <Input type="password" placeholder={'Digite sua senha...'} />
            <Button 
              type="submit"
              loading={false}
            >Acessar</Button>
          </form>

          <Link href="/signup" legacyBehavior>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}
