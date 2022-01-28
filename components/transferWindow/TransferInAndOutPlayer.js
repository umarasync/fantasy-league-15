// Components
import Div from "components/html/Div";
import TransferIn from "components/transferWindow/TransferIn";
import PointsDetails from "components/transferWindow/PointsDetails";
import TransferOut from "components/transferWindow/TransferOut";

export default function TransferInAndOutPlayer({
    transferInPlayer,
    transferOutPlayer,
    mt
}) {
    return (
        <Div className={'flex flex-row'} mt={mt}>
            {/*Left-Side*/}
            <Div className={'flex flex-col'} w={'33.33%'}>
                <TransferIn player={transferInPlayer}/>
            </Div>
            {/*Middle*/}
            <Div className={'flex flex-col items-center'} ml={32} mr={32} w={'33.33%'}>
                <PointsDetails player1={transferInPlayer} player2={transferOutPlayer}/>
            </Div>

            {/*Right-Side*/}
            <Div className={'flex flex-col'} w={'33.33%'}>
                <TransferOut player={transferOutPlayer}/>
            </Div>
        </Div>
    )
}