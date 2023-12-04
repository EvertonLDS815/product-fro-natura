import Link from 'next/link';
import styles from './styles.module.scss';
import {FiLogOut} from 'react-icons/fi';
import {useContext} from 'react'
import {AuthContext} from '@/contexts/AuthContext';

export function Header() {
    const {signOut} = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo-jl-2.png" width={200} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Categoria</a>
                    </Link>
                    
                    <Link href="/product" legacyBehavior>
                        <a>Produto</a>
                    </Link>

                    <Link href="/profile" legacyBehavior>
                        <a>Perfil</a>
                    </Link>

                    <button onClick={signOut}>
                        <FiLogOut color="#fff" size={28} />
                    </button>
                </nav>
            </div>
        </header>
    )
}