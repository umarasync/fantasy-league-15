// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Components
import Layout from "components/layout/index";
import FooterBar from "components/footer/FooterBar";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildTeamRightSection from "components/buildTeam/BuildTeamRightSection";
import TransferWindowModal from "components/transferWindow/TransferWindowModal";

// Utils
import R from "utils/getResponsiveValue";
import { clone, isEmpty } from "utils/helpers";
import {
  handleAutoPick,
  playerSelectionHandler,
  playerDeselectionHandler,
  sortingHandler,
  initialSettingsForTransferWindows,
  playerTransferDeselectHandler,
  playerTransferSelectionHandler,
  initialSettingsForBuildYourTeam,
} from "utils/buildYourTeamHelper";
import filtersHandler from "utils/buildYourTeamFiltersHelper";

// Constants
import {
  // POSITIONS
  POSITION_ALL,
  // CLUBS
  //   CLUBS,
  // PRICES
  PRICES,
  // STATUES
  STATUSES,
  // RECOMMENDATIONS
  RECOMMENDATIONS,
  // SORTING
  SORTING_OPTIONS,
} from "constants/data/filters";

import { ALL_PLAYERS_INDEXES, SELECTED_PLAYERS } from "constants/data/players";

export default function BuildTeamAllPlayer(props) {
  const router = useRouter();
  const PLAYERS = props.players;
  const CLUBS = props.clubs;

  useEffect(() => {
    if (PLAYERS && PLAYERS.length > 0) {
      setPlayersData([...PLAYERS]);
    }
  }, [PLAYERS]);

  // Initial States
  const CLUBS_INITIAL = CLUBS;
  const [PLAYERS_INITIAL, SET_PLAYERS_INITIAL] = useState(PLAYERS);
  const PRICES_INITIAL = clone(PRICES);
  const STATUSES_INITIAL = clone(STATUSES);
  const RECOMMENDATIONS_INITIAL = clone(RECOMMENDATIONS);
  const SORTING_OPTIONS_INITIAL = clone(SORTING_OPTIONS);
  const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS);
  const TOTAL_BUDGET = 100000000;
  // const TOTAL_BUDGET = 1000000;

  // Picked-Players
  const [pickedPlayers, setPickedPlayers] = useState(SELECTED_PLAYERS_INITIAL);

  // Footer Bar States
  const [totalChosenPlayers, setTotalChosenPlayers] = useState(0);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [autoPickDisabled, setAutoPickDisabled] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const [totalBudget, setTotalBudget] = useState(TOTAL_BUDGET);
  const [remainingBudget, setRemainingBudget] = useState(TOTAL_BUDGET);

  // Players States
  const [playersData, setPlayersData] = useState([]);
  const [playersDataInitial, setPlayersDataInitial] = useState(PLAYERS); // contains all players

  // Positions States
  const [activePosition, setActivePosition] = useState(POSITION_ALL);

  // Clubs States
  const [clubs, setClubs] = useState([...CLUBS_INITIAL]);
  const [selectedClubs, setSelectedClubs] = useState([CLUBS_INITIAL[0]]);

  // Statuses Statuses
  const [statuses, setStatuses] = useState([...STATUSES_INITIAL]);
  const [selectedStatuses, setSelectedStatuses] = useState([
    STATUSES_INITIAL[0],
  ]);

  // Prices States
  const [prices, setPrices] = useState([...PRICES_INITIAL]);
  const [selectedPrice, setSelectedPrice] = useState(PRICES_INITIAL[0]);

  // Recommendations States
  const [recommendations, setRecommendations] = useState([
    ...RECOMMENDATIONS_INITIAL,
  ]);
  const [selectedRecommendation, setSelectedRecommendation] = useState(
    RECOMMENDATIONS_INITIAL[0]
  );

  // Sorting
  const [sortingOptions, setSortingOptions] = useState([
    ...SORTING_OPTIONS_INITIAL,
  ]);
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    SORTING_OPTIONS_INITIAL[0]
  );

  // States-for-Player-Transfer
  const [isOneFreeTransferWindow, setIsOneFreeTransferWindow] = useState(false);
  const [showFooterBar, setShowFooterBar] = useState(false);
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [currentTransferredToBePlayer, setCurrentTransferredToBePlayer] =
    useState({});
  const [noOfFreeTransfersLeft, setNoOfFreeTransfersLeft] = useState(1);
  const [additionalTransferredPlayers, setAdditionalTransferredPlayers] =
    useState(0);
  const [transferResetDisabled, setTransferResetDisabled] = useState(true);
  const [transferConfirmDisabled, setTransferConfirmDisabled] = useState(true);
  const [transferredPlayers, setTransferredPlayers] = useState([]);

  const [showTransferWindowModal, setShowTransferWindowModal] = useState(false);

  // Opacity-State
  const [initialOpacity, setInitialOpacity] = useState(1);

  //Player-Rendering-State
  const [playerLoadComplete, setPlayerLoadComplete] = useState(false);
  const [allowQuering, setAllowQuering] = useState(false);

  //user state
  const [user, setUser] = useState(false);

  // Initial Settings for Build Your Team & Transfer windows
  const initiateInitialSettings = () => {
    const teamData = JSON.parse(localStorage.getItem("teamData"));
    if (teamData) {
      return initialSettingsForTransferWindows({
        // Team Data
        teamData,
        // Picked Players
        setPickedPlayers,
        // Budget
        setRemainingBudget,
        // Players-Data
        setPlayersData,
        playersDataInitial,
        setPlayersDataInitial,
        // Transfer Window
        setIsOneFreeTransferWindow,
        setTransferInProgress,
        setCurrentTransferredToBePlayer,
        setNoOfFreeTransfersLeft,
        setAdditionalTransferredPlayers,
        setTransferResetDisabled,
        setTransferConfirmDisabled,
        setTransferredPlayers,
        // Footer
        setShowFooterBar,
      });
    }

    return initialSettingsForBuildYourTeam({
      setPlayersData,
      playersDataInitial,
      setPlayersDataInitial,
      setShowFooterBar,
    });
  };

  // OnSearch
  const onSearch = () => false;

  // Reset-Filters
  const handleResetFilter = () => {
    setClubs([...CLUBS_INITIAL]);
    setSelectedClubs([CLUBS_INITIAL[0]]);

    setStatuses([...STATUSES_INITIAL]);
    setSelectedStatuses([STATUSES_INITIAL[0]]);

    setPrices([...PRICES_INITIAL]);
    setSelectedPrice(PRICES_INITIAL[0]);

    setRecommendations([...RECOMMENDATIONS_INITIAL]);
    setSelectedRecommendation(RECOMMENDATIONS_INITIAL[0]);
  };

  // Filters-And-Sorting
  const runFiltersOnPlayersData = () => {
    let $playersData = [...PLAYERS];

    // $playersData = $playersData.filter((player) => {
    //   return filtersHandler({
    //     player,
    //     activePosition,
    //     selectedClubs,
    //     selectedPrice,
    //     selectedStatuses,
    //     selectedRecommendation,
    //   });
    // });

    // $playersData = sortingHandler({
    //   playersData: $playersData,
    //   selectedSortingOption,
    // });

    //Query with filters
    if (playerLoadComplete) {
      if (!allowQuering) {
        setAllowQuering(true);
      } else {
        props.selectedFilters({
          activePosition,
          selectedClubs,
          selectedPrice,
          selectedStatuses,
          selectedRecommendation,
          selectedSortingOption,
        });
      }
    }

    // setPlayersData([...PLAYERS]);
  };

  // Initialize-Opacity
  const initialOpacityHandler = () => {
    if (initialOpacity) {
      setInitialOpacity(0);
    }
  };

  useEffect(() => {
    runFiltersOnPlayersData();
    initialOpacityHandler();
  }, [
    clubs,
    playersDataInitial,
    statuses,
    selectedRecommendation,
    selectedPrice,
    activePosition,
    selectedSortingOption,
  ]);

  // Player-Selection
  const handlePlayerSelection = (player) => {
    return playerSelectionHandler({
      player,
      playersDataInitial,
      setPlayersDataInitial,
      totalChosenPlayers,
      setTotalChosenPlayers,
      pickedPlayers,
      setPickedPlayers,
      remainingBudget,
      setRemainingBudget,
    });
  };

  // Player-Deselection
  const handlePlayerDeselection = (position, i) => {
    return playerDeselectionHandler({
      position,
      i,
      pickedPlayers,
      setPickedPlayers,
      remainingBudget,
      setRemainingBudget,
      totalChosenPlayers,
      setTotalChosenPlayers,
      playersDataInitial,
      setPlayersDataInitial,
      setContinueDisabled,
    });
  };

  // Player-Transfer-Player-Deselection
  const executeTransferPlayerDeselect = () => {
    setTransferInProgress(true);
    return playerTransferDeselectHandler({
      position: currentTransferredToBePlayer.position,
      i: currentTransferredToBePlayer.index,
      pickedPlayers,
      setPickedPlayers,
      remainingBudget,
      setRemainingBudget,
      playersDataInitial,
      setPlayersDataInitial,
      setContinueDisabled,
    });
  };

  useEffect(() => {
    if (
      isEmpty(currentTransferredToBePlayer) ||
      currentTransferredToBePlayer.position === null ||
      transferInProgress
    )
      return;
    executeTransferPlayerDeselect();
  }, [currentTransferredToBePlayer]);

  const handleTransferPlayerDeselect = (position, i) => {
    setCurrentTransferredToBePlayer({ position: position, index: i });
  };

  // Player-Transfer-Player-Selection
  const handleTransferPlayerSelection = (player) => {
    playerTransferSelectionHandler({
      player,
      // Players-Data
      playersDataInitial,
      setPlayersDataInitial,
      // Picked-Players
      pickedPlayers,
      setPickedPlayers,
      // Remaining-Budget
      remainingBudget,
      setRemainingBudget,
      // Transfer
      setTransferInProgress,
      noOfFreeTransfersLeft,
      setNoOfFreeTransfersLeft,
      additionalTransferredPlayers,
      setAdditionalTransferredPlayers,
      transferredPlayers,
      setTransferredPlayers,
      // Buttons
      setTransferResetDisabled,
      setTransferConfirmDisabled,
    });
  };

  // Player-Transfer-Reset
  const onTransferResetClick = () => {
    initiateInitialSettings();
  };

  // Player-Transfer-Confirm
  const onTransferConfirmClick = () => {
    setShowTransferWindowModal(true);
  };

  const onTransferModalConfirmed = () => {
    sendToServer();
    router.push("/my_squad_game_week");
  };

  useEffect(() => {
    if (totalChosenPlayers === 0) {
      setAutoPickDisabled(false);
      setResetDisabled(true);
      setContinueDisabled(true);
    } else if (totalChosenPlayers === 15 && remainingBudget > 0) {
      setAutoPickDisabled(true);
      setResetDisabled(false);
      setContinueDisabled(false);
    }
  }, [totalChosenPlayers]);

  useEffect(() => {
    if (PLAYERS_INITIAL && PLAYERS_INITIAL.length > 0) {
      setPlayerLoadComplete(true); //For preventing re-calling of filters method
    }
  }, [PLAYERS_INITIAL]);

  const onAutoPick = () => {
    const {
      chosenPlayersWithinBudget,
      remainingBudget,
      totalChosenPlayers: totalChosenPlayersI,
      players: playersI,
    } = handleAutoPick({
      players: PLAYERS,
      allPlayersObjectIndexes: ALL_PLAYERS_INDEXES,
      totalBudget: TOTAL_BUDGET,
    });

    setPickedPlayers(chosenPlayersWithinBudget);
    setRemainingBudget(remainingBudget);
    setTotalChosenPlayers(totalChosenPlayersI);
    setPlayersDataInitial(playersI);

    setAutoPickDisabled(true);
    setResetDisabled(false);
  };

  const handleResetClick = () => {
    setPickedPlayers(SELECTED_PLAYERS_INITIAL);
    setTotalChosenPlayers(0);
    setRemainingBudget(totalBudget);
    setAutoPickDisabled(false);
    setResetDisabled(true);
    setContinueDisabled(true);
    setPlayersData(PLAYERS_INITIAL);
    setPlayersDataInitial(PLAYERS_INITIAL);
  };

  const sendToServer = () => {
    // TODO:LOCAL_STORAGE_FOR_TESTING:START
    localStorage.setItem(
      "teamData",
      JSON.stringify({
        pickedPlayers,
        remainingBudget,
        totalChosenPlayers,
        // Only for transfer windows
        noOfFreeTransfersLeft,
        additionalTransferredPlayers,
      })
    );
    // TODO:LOCAL_STORAGE_FOR_TESTING:ENDS
  };

  const handleContinueClick = () => {
    sendToServer();
    router.push("/create_team_name");
  };

  // Did-Mount
  useEffect(() => {
    initiateInitialSettings();

    //Fetching user object from localstorage
    let user = localStorage.getItem("user");
    user = JSON.parse(user) || [];
    if (user && user != "") {
      setUser(user);
    }
  }, []);

  return (
    <Layout title="Build Team All Player">
      <div className="mx-auto flex bg-white">
        {/*Left-Section*/}
        <div className="w-[57%]">
          <BuildTeamLeftSection
            isOneFreeTransferWindow={isOneFreeTransferWindow}
            pickedPlayers={pickedPlayers}
            autoPickDisabled={autoPickDisabled}
            onDeselectPlayer={
              isOneFreeTransferWindow
                ? handleTransferPlayerDeselect
                : handlePlayerDeselection
            }
          />
        </div>
        {/*Right-Section*/}
        <div className="w-[43%] flex justify-center" style={{ minHeight: R() }}>
          <BuildTeamRightSection
            // Filters
            showAllFilters={showAllFilters}
            setShowAllFilters={setShowAllFilters}
            // Positions
            activePosition={activePosition}
            setActivePosition={setActivePosition}
            // Initial-Opacity
            initialOpacity={initialOpacity}
            // Clubs
            selectedClubs={selectedClubs}
            clubs={clubs}
            setClubs={setClubs}
            setSelectedClubs={setSelectedClubs}
            clubsInitial={CLUBS_INITIAL}
            // Statuses
            selectedStatuses={selectedStatuses}
            statuses={statuses}
            setStatuses={setStatuses}
            setSelectedStatuses={setSelectedStatuses}
            statusesInitial={STATUSES_INITIAL}
            // Prices
            prices={prices}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            // Recommendations
            recommendations={recommendations}
            selectedRecommendation={selectedRecommendation}
            setSelectedRecommendation={setSelectedRecommendation}
            // Players-Data
            playersData={playersData}
            // Reset-Filter-Button
            handleResetFilter={handleResetFilter}
            // Sorting
            sortingOptions={sortingOptions}
            selectedSortingOption={selectedSortingOption}
            setSelectedSortingOption={setSelectedSortingOption}
            // Player-Selection
            handlePlayerSelection={
              isOneFreeTransferWindow
                ? handleTransferPlayerSelection
                : handlePlayerSelection
            }
            // Search
            onSearch={onSearch}
            //User object
            user={user}
          />
        </div>
        {showFooterBar && (
          <FooterBar
            totalChosenPlayers={totalChosenPlayers}
            remainingBudget={remainingBudget}
            resetDisabled={resetDisabled}
            autoPickDisabled={autoPickDisabled}
            continueDisabled={continueDisabled}
            onAutoPick={onAutoPick}
            onContinueClick={handleContinueClick}
            onResetClick={handleResetClick}
            // Transfer-Window
            isOneFreeTransferWindow={isOneFreeTransferWindow}
            noOfFreeTransfersLeft={noOfFreeTransfersLeft}
            transferResetDisabled={transferResetDisabled}
            transferConfirmDisabled={transferConfirmDisabled}
            onTransferResetClick={onTransferResetClick}
            onTransferConfirmClick={onTransferConfirmClick}
            additionalTransferredPlayers={additionalTransferredPlayers}
          />
        )}

        <TransferWindowModal
          show={showTransferWindowModal}
          transferredPlayers={transferredPlayers}
          onCancel={() => setShowTransferWindowModal(false)}
          onConfirmed={onTransferModalConfirmed}
          // Additional Data
          remainingBudget={remainingBudget}
          additionalTransferredPlayers={additionalTransferredPlayers}
        />
      </div>
    </Layout>
  );
}
