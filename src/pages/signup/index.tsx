import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/Home.module.scss';
import Logo from '../../../public/logo-jl-2.png';

import { Input } from '../../components/ui/input';
import {Button} from '../../components/ui/button';
import Link from 'next/link';

export default function Signup() {
  return (
    <>
      <Head>
        <title>Natura - Signup</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={Logo} alt="logo do site" />

        <div className={styles.login}>
            <h2 className={styles.titlePage}>Criando sua Conta</h2>
          <form>
            <Input type="text" placeholder={'Digite seu nome...'} />
            <Input type="email" placeholder={'Digite seu email...'} />
            <Input type="password" placeholder={'Digite sua password...'} />
            <Button 
              type="submit"
              loading={false}
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
