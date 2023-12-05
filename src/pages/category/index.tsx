import Head from 'next/head';
import {Header} from '@/components/Header/index';
import styles from './styles.module.scss';
import {useState, FormEvent, useEffect} from 'react';
import { setUpAPIClient } from '@/services/api';
import {toast} from 'react-toastify';
import { canSSRAuth } from '@/utils/canSSRAuth';

type ItemProps = {
    id: string;
    name: string;
}
interface CategoryProps {
    categoryList: ItemProps[];
}
export default function Category({categoryList}: CategoryProps) {
    const [categories, setCategories] = useState(categoryList || []);
    const [name, setName] = useState('');

    async function getCategories() {
        const apiClient = setUpAPIClient();
        const response = await apiClient.get('/category');

        setCategories(response.data);
    }
    
    async function onHandleRegister(event: FormEvent) {
        event.preventDefault();
        
        if (name === '') {
            toast.error('Digite uma Categoria!');
            return;
        }
        
        const apiClient = setUpAPIClient();
        await apiClient.post('/category', {
            name: name
        });
        
        toast.success('Categoria Cadastrada!');
        setName('');

        getCategories();
    }
    

    return (
        <>
            <Head>
                <title>Minhas Categorias</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar Categorias</h1>

                    <form className={styles.form} onSubmit={onHandleRegister}>
                        <input
                            type="text"
                            placeholder="Digite sua categoria..."
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                         />

                         <button type="submit" className={styles.buttonAdd}>Cadastrar</button>
                    </form>
                    {categories.length > 0 && (
                        <div className={styles.categories}>
                            <h2>Minhas Categorias</h2>
                            <ul>
                                {categories.map((item) => (
                                    <li key={item.id} className={styles.items}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apiClient = setUpAPIClient(ctx);
  
    const response = await apiClient.get('/category');
  
    return {
      props: {
        categoryList: response.data
      },
    };
  });