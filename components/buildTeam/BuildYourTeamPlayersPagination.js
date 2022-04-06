// Packages
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Button from "components/html/Button";
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

// Constants
import colors from "constants/colors";

export default function BuildYourTeamPlayersPagination(){

    const dispatch = useDispatch()
    const playersPerPage = useSelector(({ players }) => players.playersPerPage);
    const currentPage = useSelector(({ players }) => players.currentPage);
    const totalPages = useSelector(({ players }) => players.totalPages);
    const loadingPlayersGetting = useSelector(({ players }) => players.loadingPlayersGetting);

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
                <Button
                  title={'First'}
                  disabled={currentPage < 1 || loadingPlayersGetting}
                  color={colors.white}
                  mr={8}
                  h={50}
                  w={100}
                  onClick={onFirstPage}
              />
                <Image
                    w={60}
                    h={60}
                    src={'/images/arrow-prev.png'}
                    disabled={currentPage < 1 || loadingPlayersGetting}
                    cursor={'pointer'}
                    onClick={onPreviousPage}
                    alt={'arrow-prev.png'}
                />
              {/*  <Button*/}
              {/*    title={'Previous'}*/}
              {/*    disabled={currentPage < 1 || loadingPlayersGetting}*/}
              {/*    color={colors.white}*/}
              {/*    ml={8}*/}
              {/*    h={50}*/}
              {/*    w={100}*/}
              {/*    onClick={onPreviousPage}*/}
              {/*/>*/}
            </Div>
            <Text ml={20} mr={20} text={`${currentPage + 1} of ${totalPages}`} fs={20} nowrap/>
            <Div center>

                <Image
                    w={60}
                    h={60}
                    src={'/images/arrow-next.png'}
                    disabled={currentPage === totalPages - 1 || loadingPlayersGetting}
                    cursor={'pointer'}
                    onClick={onNextPage}
                    alt={'arrow-next.png'}
                />

               {/* <Button*/}
               {/*    title={'Next'}*/}
               {/*    color={colors.white}*/}
               {/*    disabled={currentPage === totalPages - 1 || loadingPlayersGetting}*/}
               {/*    ml={8}*/}
               {/*    h={50}*/}
               {/*    w={100}*/}
               {/*    onClick={onNextPage}*/}
               {/*/>*/}
                <Button
                    title={'Last'}
                    color={colors.white}
                    disabled={currentPage === totalPages - 1 || loadingPlayersGetting}
                    ml={8}
                    h={50}
                    w={100}
                    onClick={onLastPage}
                />
            </Div>
        </Div>
    )
}