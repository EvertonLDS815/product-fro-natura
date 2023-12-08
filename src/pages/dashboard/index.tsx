import { canSSRAuth } from '@/utils/canSSRAuth';
import Head from 'next/head';
import {Header} from '@/components/Header/index';
import { useContext } from 'react';
import {AuthContext} from '@/contexts/AuthContext';
import styles from './styles.module.scss';
import {FiRefreshCcw} from 'react-icons/fi';

export default function Dashboard() {
    const {user} = useContext(AuthContext);

    return (
        <>
            <Head>
                <title>Painel - Pedidos</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
                        <FiRefreshCcw color="#60ffc3" size={25} />
                    </button>
                </div>
                    <article className={styles.listOrders}>

                        <section className={styles.orderItem}>
                            <button>
                                <div className={styles.tag}></div>
                                <span>Natália</span>
                            </button>
                        </section>

                    </article>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})