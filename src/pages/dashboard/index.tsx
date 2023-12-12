import { canSSRAuth } from '@/utils/canSSRAuth';
import Head from 'next/head';
import {Header} from '@/components/Header/index';
import styles from './styles.module.scss';
import {FiRefreshCcw} from 'react-icons/fi';
import { setUpAPIClient } from '@/services/api';
import { useState } from 'react';
import Modal from 'react-modal';
import {ModalOrder} from '@/components/ModalOrder';

type OrderProps = {
    id: string;
    name: string;
    neighborhood: string;
    adress: string;
    house_number: string;
    status: boolean;
    draft: boolean;

}

export type OrderItemProps = {
    id: string;
    amount: number;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        category_id: string;
    }
    order: {
        id: string;
        name: string;
        neighborhood: string;
        adress: string;
        house_number: string;
        status: boolean;
        draft: boolean;
    }
}
interface HomeProps {
    orders: OrderProps[]
}
export default function Dashboard({orders}: HomeProps) {
    const [orderList, setOrderList] = useState(orders || []);

    const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
    const [modalVisible, setModalVisible] = useState(false);


    function handleCloseModal() {
        setModalVisible(false);
    }

    async function handleOpenModalView(id: string) {
        const apiClient = setUpAPIClient();
        
        const response = await apiClient.get('/order/detail', {
            params: {
                order_id: id
            }
        });

        setModalItem(response.data);
        setModalVisible(true);

    }

    async function handleRefresh() {
        const apiClient = setUpAPIClient();
        const response = await apiClient.get('/orders');
        
        setOrderList(response.data);
    }
    
    async function handleFinishedOrder(id: string) {
        const apiClient = setUpAPIClient();

        await apiClient.patch('/order/finish', {
            order_id: id
        });

        const response = await apiClient.get('/orders');
        
        setOrderList(response.data);
        setModalVisible(false);

    }
    
    Modal.setAppElement('#__next');
    return (
        <>
            <Head>
                <title>Painel - Pedidos</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button onClick={handleRefresh}>
                        <FiRefreshCcw color="#60ffc3" size={25} />
                    </button>
                </div>
                    <article className={styles.listOrders}>
                        {orderList.length === 0 && (
                            <span className={styles.message}>Não existem pedidos...</span>
                        )}
                        {orderList.map((item) => (
                            <section className={styles.orderItem} key={item.id}>
                                <button onClick={() => handleOpenModalView(item.id)}>
                                    <div className={styles.tag}></div>
                                    <p>{item.name} - <span>{item.neighborhood}</span></p>
                                </button>
                            </section>
                        ))}

                    </article>
            </main>

            { modalVisible && (
                <ModalOrder
                isOpen={modalVisible}
                onRequestClose={handleCloseModal}
                order={modalItem}
                onFinished={handleFinishedOrder}
                />
            )}
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