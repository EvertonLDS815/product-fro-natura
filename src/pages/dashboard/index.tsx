import { canSSRAuth } from '../../utils/canSSRAuth';
import Header from '@/components/Header';
import { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';

export default function Dashboard() {
    const {user} = useContext(AuthContext);

    return (
        <>
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