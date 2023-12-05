import {useState, ChangeEvent} from 'react';
import {Header} from '../../components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import {FiUpload} from 'react-icons/fi';

import {canSSRAuth} from '../../utils/canSSRAuth';
import {setUpAPIClient} from '../../services/api';

type ItemProps = {
    id: string;
    name: string;
}
interface CategoryProps {
    categoryList: ItemProps[]
}
export default function Product({categoryList}: CategoryProps) {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    const [categories, setCategories] = useState(categoryList || []);
    const [categorySelected, setCategorySelected] = useState(0);

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        const image: any = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {

            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }


    function handleChangeCategory(event: any) {
        console.log(categories[event.target.value]);

        setCategorySelected(event.target.value);
    }

    return (
        <>
            <Head>
                <title>Meus Produtos</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload color="#fff" size={28} />
                        </span>

                        <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />

                        {avatarUrl && (
                            <img 
                            className={styles.preview}
                            src={avatarUrl}
                            alt="foto do produto"
                            width={250}
                            height={250}
                            />
                        )}
                    </label>

                    <select value={categorySelected} onChange={handleChangeCategory}>
                        {categories.map((item, index) => {
                            return (
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                        })}
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

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apiClient = setUpAPIClient(ctx);

    const response = await apiClient.get('/category');
    return {
        props: {
            categoryList: response.data
        }
    }
})