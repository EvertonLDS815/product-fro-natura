import Link from 'next/link';
import styles from './styles.module.scss';
import {FiLogOut} from 'react-icons/fi';
import {useContext} from 'react'
import {AuthContext} from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export function Header() {
    const {signOut} = useContext(AuthContext);

    const router = useRouter();
    const param = router.pathname;


    return (
        <header style={param === '/dashboard' ? {zIndex: '0'}: {zIndex: '5'}} className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo-jl-2.png" width={200} />
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category" legacyBehavior>
                        <a>Category</a>
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