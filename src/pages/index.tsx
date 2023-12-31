import { FormEvent, useContext, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import Logo from '../../public/logo-jl-2.png';

import { Input } from '../components/ui/input';
import {Button} from '../components/ui/button';
import Link from 'next/link';
import {canSSRGuest} from '../utils/canSSRGuest';
import {toast} from 'react-toastify';

import {AuthContext} from '../contexts/AuthContext';

export default function Home() {
  const {signIn} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    try {
      if (email === '' || password === '') {
        throw new Error('Preencha todos os dados!');
      }
  
      setLoading(true);
      
      const data = {
        email,
        password
      }
      await signIn(data);
  
      setLoading(false);
    } catch (err: any) {
      toast.error(err.message);
    }
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
            <Input 
              type="text" 
              placeholder={'Digite seu email...'} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder={'Digite sua senha...'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <Button 
              type="submit"
              loading={loading}
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


export const getServerSideProps = canSSRGuest(async (ctx) => {

  return {
    props: {}
  }
  
})