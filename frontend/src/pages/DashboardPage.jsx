import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { useUserId } from "@nhost/react";
import { nhost } from "../lib/nhost";
import TiersTable from "../components/TiersTable";
function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [tierons, setTierons] = useState(null)
    const user_id = useUserId()
    const getTireons = `
  query($user_id: uuid!) {
    tierlist(where: { user_id: { _eq: $user_id } }) {
      id
      name
      category
      status
    }
  }
`;

    useEffect(() => {
        async function fetchTeirons() {
            setLoading(true)
            const { data, error } = await nhost.graphql.request(getTireons, { user_id })

            if (error) {
                console.error({ error })
                return
            }
            console.log(data.tierlist)
            setTierons(data.tierlist)
            setLoading(false)
        }

        fetchTeirons()
    }, [])

    return (<>
        <Navbar />
        {tierons ? <TiersTable tierons={tierons}/> : <div>Loading</div>}

    </>)
}


export default DashboardPage;