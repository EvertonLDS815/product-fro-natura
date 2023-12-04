import { canSSRAuth } from '@/utils/canSSRAuth';
import Head from 'next/head';
import {Header} from '@/components/Header/index';
import { useContext } from 'react';
import {AuthContext} from '@/contexts/AuthContext';

export default function Dashboard() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <Head>
                <title>Painel - Pedidos</title>
            </Head>
            <Header />
            <h1>Olá {user?.name}</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})