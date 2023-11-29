import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.scss';
import Logo from '../../public/logo-jl.png';

import { Input } from '../components/ui/input';
import {Button} from '../components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Natura - Faça seu Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={Logo} alt="logo do site" />

        <div className={styles.login}>
          <form>
            <Input type="text" placeholder={'Digite seu Email...'} />
            <Input type="password" placeholder={'Digite sua Senha...'} />
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
