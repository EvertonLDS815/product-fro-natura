import {FormEvent, useState, useContext} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';
import Logo from '../../../public/logo-jl-2.png';

import { Input } from '../../components/ui/input';
import {Button} from '../../components/ui/button';
import Link from 'next/link';
import {toast} from 'react-toastify';

import {AuthContext} from '../../contexts/AuthContext';

export default function Signup() {
  const {signUp} = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    try {
      if (name === '' || email === '' || password === '') {
        throw new Error('Preencha todos os campos!');
      }
      if (email.length < 12 || email.length > 30) {
        throw new Error('Seu email deve conter entre 12 caracteres e 30!');
      }
      if (!email.includes('@gmail.com') && !email.includes('@hotmail.com')) {
        throw new Error(`O email deve conter '@gmail.com' ou 'hotmail.com'`);
      }
      if (email.split('@gmail.com')[1] || email.split('@hotmail.com')[1]) {
        throw new Error(`O email deve conter '@gmail.com' ou 'hotmail.com' no final!`);
      }
      if (password.length <= 3) {
        throw new Error('Senha deve conter mais de três caracteres!');
      }
  
      setLoading(true);
  
      let data = {
        name,
        email,
        password
      }
  
      await signUp(data);
  
      setLoading(false);
    } catch (err: any) {
      toast.error(err.message)
    }
  }
  return (
    <>
      <Head>
        <title>Natura - Signup</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={Logo} alt="logo do site" />

        <div className={styles.login}>
            <h2 className={styles.titlePage}>Criando sua Conta</h2>
          <form onSubmit={handleSignUp}>
            <Input
              type="text"
              placeholder={'Digite seu nome...'} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            <Input
              type="email"
              placeholder={'Digite seu email...'} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <Input
              type="password"
              placeholder={'Digite sua password...'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <Button 
              type="submit"
              loading={loading}
            >Cadastrar</Button>
          </form>

          <Link href="/" legacyBehavior>
            <a className={styles.text}>Já possui uma conta? Faça seu login</a>
          </Link>
        </div>
      </div>
    </>
  )
}
