import { canSSRAuth } from "@/utils/canSSRAuth"


export default function Dashboard() {

    return (
        <>
            <h1>Olá usuário!</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})