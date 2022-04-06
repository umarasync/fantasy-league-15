// Packages
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Actions
import {getPlayers} from "redux/Players/api";
import {
    changeCurrentPageNumber,
    getPlayersLoadingOff,
    getPlayersNextPage,
    getPlayersPreviousPage,
    getPlayersStart
} from "redux/Players/actionsCreators";

export default function BuildYourTeamPlayersPagination(){

    const dispatch = useDispatch()
    const playersPerPage = useSelector(({ players }) => players.playersPerPage);
    const currentPage = useSelector(({ players }) => players.currentPage);
    const totalPages = useSelector(({ players }) => players.totalPages);
    const loadingPlayersGetting = useSelector(({ players }) => players.loadingPlayersGetting);
    const disablePrev = currentPage < 1 || loadingPlayersGetting
    const disableNext = currentPage === totalPages - 1 || loadingPlayersGetting

    const onPreviousPage = async () => {
        dispatch(getPlayersStart())
        dispatch(getPlayersPreviousPage())
    }

    const onNextPage = async () => {
        dispatch(getPlayersStart())
        dispatch(getPlayersNextPage())
    }

    const onFirstPage = async () => {
          dispatch(getPlayersStart())
          dispatch(changeCurrentPageNumber(0))
      }

    const onLastPage = async () => {
        dispatch(getPlayersStart())
        dispatch(changeCurrentPageNumber(totalPages-1))
    }

    const changePage = async () => {
         await dispatch(getPlayers(playersPerPage, playersPerPage * currentPage, { teamId: { eq: "" } }, { value: "DESC" }));
    }

    useEffect(() => {
        if(currentPage === -1 || currentPage === totalPages) {
            return dispatch(getPlayersLoadingOff())
        }
        changePage()
    }, [currentPage])

    return (
        <Div center mb={20}>
            <Div center>
                <Image
                    w={20}
                    h={20}
                    src={'/images/double-arrow-left.png'}
                    disabled={disablePrev}
                    cursor={'pointer'}
                    onClick={onFirstPage}
                    alt={'double-arrow-left'}
                />
                <Image
                    w={50}
                    h={50}
                    src={'/images/angle-circle-left.png'}
                    disabled={disablePrev}
                    cursor={'pointer'}
                    onClick={onPreviousPage}
                    alt={'angle-circle-left'}
                    ml={18}
                />
            </Div>
            <Text ml={20} mr={20} text={`${currentPage + 1} of ${totalPages}`} fs={20} nowrap/>
            <Div center>
                <Image
                    w={50}
                    h={50}
                    src={'/images/angle-circle-right.png'}
                    disabled={disableNext}
                    cursor={'pointer'}
                    onClick={onNextPage}
                    alt={'angle-circle-right'}
                    mr={18}
                />
                <Image
                    w={20}
                    h={20}
                    src={'/images/double-arrow-right.png'}
                    disabled={disableNext}
                    cursor={'pointer'}
                    onClick={onLastPage}
                    alt={'double-arrow-right'}
                />
            </Div>
        </Div>
    )
}