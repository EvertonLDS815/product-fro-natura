import { canSSRAuth } from '@/utils/canSSRAuth';
import Head from 'next/head';
import {Header} from '@/components/Header/index';
import { useContext } from 'react';
import {AuthContext} from '@/contexts/AuthContext';
import styles from './styles.module.scss';

export default function Dashboard() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <Head>
                <title>Painel - Pedidos</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Olá {user?.name}</h1>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})