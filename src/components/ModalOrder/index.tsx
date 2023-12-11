import Modal from 'react-modal';
import styles from './styles.module.scss';
import {OrderItemProps} from '../../pages/dashboard';
import {FiX} from 'react-icons/fi';
import Link from 'next/link';
import { setUpAPIClient } from '@/services/api';
import formatCurrency from '@/utils/formatCurrency';

interface ModalOrderProps {
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[]
}
export function ModalOrder({isOpen, onRequestClose, order}: ModalOrderProps) {
    if (order === undefined) {
        return
    }
    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '10px 15px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#2d232a',
            borderRadius: '0.7rem',
            color: '#fff'
        }
    }
    const baseURL = "http://localhost:2222/files/";

    const total = order.reduce((acc, {product, amount}) => {
        return acc + (parseFloat(product.price) * amount)
    }, 0)

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        >
            <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
            style={{background: 'transparent', border: 0, float: 'right'}}
            >
                <FiX size={32} color="#fc4747" />

            </button>

                <div className={styles.container}>

                    <h2>Detalhes do pedido</h2>

                    <h3 className={styles.name}>
                        {order[0].order.name}
                    </h3>

                    {order.map(item => (
                        <section key={item.id} className={styles.containerItem}>
                            <div className={styles.flexItem}>
                                <Link title={item.product.name} href={`${baseURL}${item.product.banner}`} target="_blank">
                                    <img src={`${baseURL}${item.product.banner}`} alt={item.product.name} />
                                </Link>
                                <span className={styles.desProduct}>{item.amount} x <strong>{item.product.name}</strong></span>
                                <span>{formatCurrency(Number(item.product.price))}</span>
                            </div>
                            {/* <span className={styles.description}>{item.product.description}</span> */}
                        </section>
                    ))}
                    <div className={styles.footerModal}>
                        <button className={styles.buttonOrder} onClick={() => {}}>
                            Cancelar Pedido
                        </button>
                        <h2>Total: {formatCurrency(total)}</h2>
                    </div>
                </div>
        </Modal>
    )
}