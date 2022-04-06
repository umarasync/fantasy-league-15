// Packages
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

// Components
import BuildTeamLayout from 'components/layout/BuildTeamLayout'
import Loader from "components/loaders/Loader";

export default function MakePlayersTransfers() {

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const teamAlreadyExists = useSelector(({ auth }) => auth.user.fantasyTeamId);

    useEffect(() => {
        if(!teamAlreadyExists){
            return router.push('/build_team_all_players')
        }
        setLoading(false)
    }, [])

    if(loading) return <Loader/>
    return <BuildTeamLayout makeTransfer/>
}