import { canSSRAuth } from '@/utils/canSSRAuth';
import Head from 'next/head';
import {Header} from '@/components/Header/index';
import styles from './styles.module.scss';
import {FiRefreshCcw} from 'react-icons/fi';
import { setUpAPIClient } from '@/services/api';
import { useState } from 'react';

type OrderProps = {
    id: string;
    name: string;
    neighborhood: string;
    adress: string;
    house_number: string;
    status: boolean;
    draft: boolean;

}
interface HomeProps {
    orders: OrderProps[]
}
export default function Dashboard({orders}: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string) {
        alert(id)
    }
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

                        {orderList.map((item) => (
                            <section className={styles.orderItem} key={item.id}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <span>{item.name}</span>
                                </button>
                            </section>
                        ))}

                    </article>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apiClient = setUpAPIClient(ctx);
    const response = await apiClient.get('/orders');
    
    return {
        props: {
            orders: response.data
        }
    }
})