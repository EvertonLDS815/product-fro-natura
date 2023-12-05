import {Header} from '../../components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';

import {canSSRAuth} from '../../utils/canSSRAuth';

export default function Product() {

    return (
        <>
            <Head>
                <title>Meus Produtos</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form}>

                    <select>
                        <option>Sabonetes</option>
                        <option>Perfumes</option>
                    </select>

                    <input
                    type="text"
                    placeholder="Digite o nome do seu produto"
                    className={styles.input}
                    />
                    <input
                    type="text"
                    placeholder="Preço do produto"
                    className={styles.input}
                    />

                    <textarea 
                    placeholder="Descreva seu produto"
                    className={styles.input}
                    />

                    <button className={styles.buttonAdd} type="submit">Cadastrar</button>
                </form>
            </main>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})