// Packages
import { AnimatePresence, motion } from "framer-motion";

// Components
import Username from "components/user/Username";
import SearchBar from "components/search/SearchBar";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/FilterButtons";
import BuildYourTeamFilters from "components/filter/BuildYourTeamFilters";
import SelectInput from "components/inputs/SelectInput";
import PlayerCard from "components/player/PlayerCard";
import NoResultFound from "components/misc/NoResultFound";
import Div from "components/html/Div";

// utils
import R from "utils/getResponsiveValue";
import {
  handleMultiSelectionDropDowns,
  sortingHandler,
} from "utils/buildYourTeamHelper";
import { clone, isEmpty } from "utils/helpers";

// Animations
import ShowAllFiltersAnimation from "Animations/buildYourTeam/ShowAllFiltersAnimation";
import {
  playerPanelAnimation,
  playersPanelHeightAnimation,
} from "Animations/PlayersCardAnimations";

// Constants
import {
  ALL_PRICES,
  ALL_STATUSES,
  ALL_TEAMS,
  POSITION_ALL,
  PRICES,
  RECOMMENDATIONS,
  RECOMMENDED_PLAYERS,
  SORTING_OPTIONS,
  STATUSES,
} from "constants/data/filters";
import BuildYourTeamPlayersPagination from "./BuildYourTeamPlayersPagination";
import filtersHandler from "../../utils/buildYourTeamFiltersHelper";
import { useEffect, useState } from "react";

// Styles
const getStyles = (R) => {
  return {
    allFiltersBox: {
      paddingBottom: R(20),
      paddingTop: R(15),
    },
    noResultFound: {
      top: R(600),
    },
    playerPanel: {
      paddingBottom: R(200),
    },
  };
};

export default function BuildTeamRightSection({
  // Players Data
  playersData,
  setPlayersData,
  playersDataInitial,
  // Clubs
  clubs: clubsProp,
  // Players-Data
  handlePlayerSelection,
}) {
  const STYLES = { ...getStyles(R) };

  // Initial States
  const CLUBS_INITIAL = clone(clubsProp);
  const PRICES_INITIAL = clone(PRICES);
  const RECOMMENDATIONS_INITIAL = clone(RECOMMENDATIONS);
  const SORTING_OPTIONS_INITIAL = clone(SORTING_OPTIONS);
  const STATUSES_INITIAL = clone(STATUSES);

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

  // Filters
  const [showAllFilters, setShowAllFilters] = useState(false);

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

  // Filter & Sorting
  const runFiltersOnPlayersData = () => {
    let $playersData = [...playersDataInitial];

    $playersData = $playersData.filter((player) => {
      return filtersHandler({
        player,
        activePosition,
        selectedClubs,
        selectedPrice,
        selectedStatuses,
        selectedRecommendation,
      });
    });

    $playersData = sortingHandler({
      playersData: $playersData,
      selectedSortingOption,
    });

    setPlayersData([...$playersData]);
  };

  useEffect(() => {
    runFiltersOnPlayersData();
  }, [
    clubs,
    statuses,
    selectedRecommendation,
    selectedPrice,
    activePosition,
    selectedSortingOption,
    playersDataInitial,
  ]);

  const areFiltersApplied = () => {
    return (
      selectedClubs.length === 0 ||
      selectedClubs[0].value !== ALL_TEAMS ||
      selectedStatuses.length === 0 ||
      selectedStatuses[0].value !== ALL_STATUSES ||
      selectedPrice.value !== ALL_PRICES ||
      selectedRecommendation.value !== RECOMMENDED_PLAYERS
    );
  };

  const getPlayersContainerHeight = () => {
    if (areFiltersApplied() && !playersData.length) {
      return "hide";
    } else if (showAllFilters) {
      return "half";
    } else {
      return "full";
    }
  };

  return (
    <Div position={"relative"} w={488} pt={35} pb={100}>
      {/*username*/}
      <Div className={"flex flex-row-reverse"} mb={46}>
        {/*<Username username={user.username}/>*/}
        <Username username={"john doe"} />
      </Div>

      {/*search*/}
      <Div className={"flex"} mb={20}>
        <div className={"w-full"}>
          <SearchBar onSearch={() => false} />
        </div>
        <Div ml={8} />
        <FilterIcon
          showAllFilters={showAllFilters}
          onClick={() => setShowAllFilters(!showAllFilters)}
        />
      </Div>

      {/*filter buttons*/}
      <Div mb={24}>
        <FilterButtons
          activePosition={activePosition}
          onClick={(activePosition) => setActivePosition(activePosition)}
        />
      </Div>
      {/*all filters*/}
      {showAllFilters ? (
        <AnimatePresence>
          <motion.div
            variants={ShowAllFiltersAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={"absolute w-full"}
            style={STYLES.allFiltersBox}
          >
            <BuildYourTeamFilters
              // Teams Filter
              clubs={clubs}
              selectedClubs={selectedClubs}
              onClubSelected={(option) =>
                handleMultiSelectionDropDowns(option, {
                  firstOption: ALL_TEAMS,
                  initialState: CLUBS_INITIAL,
                  state: clubs,
                  setSelectedOptions: setSelectedClubs,
                  setOptions: setClubs,
                })
              }
              // Statuses Filter
              statuses={statuses}
              selectedStatuses={selectedStatuses}
              onStatusSelected={(option) =>
                handleMultiSelectionDropDowns(option, {
                  firstOption: ALL_STATUSES,
                  initialState: STATUSES_INITIAL,
                  state: statuses,
                  setSelectedOptions: setSelectedStatuses,
                  setOptions: setStatuses,
                })
              }
              // Prices Filter
              prices={prices}
              selectedPrice={selectedPrice}
              onPriceSelected={(price) => setSelectedPrice(price)}
              // Recommendation Filter
              recommendations={recommendations}
              selectedRecommendation={selectedRecommendation}
              onRecommendationSelected={(r) => setSelectedRecommendation(r)}
              // Reset Filters
              onResetFilterClicked={handleResetFilter}
            />
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence />
      )}

      {areFiltersApplied() && !playersData.length && (
        <div className={"absolute w-full"} style={STYLES.noResultFound}>
          <NoResultFound />
        </div>
      )}

      <motion.div
        variants={playerPanelAnimation()}
        animate={showAllFilters ? "slideDown" : "slideUp"}
      >
        <motion.div
          variants={playersPanelHeightAnimation()}
          animate={getPlayersContainerHeight()}
          style={STYLES.playerPanel}
        >
          <Div mb={16}>
            {areFiltersApplied() && !playersData.length ? null : (
              <Div>
                <SelectInput
                  options={sortingOptions}
                  selectedOption={selectedSortingOption}
                  onOptionChange={(s) => setSelectedSortingOption(s)}
                  parentContainerStyle={{
                    zIndex: 1,
                  }}
                  hideLabel
                  dropDownOfInlineStyle
                />
              </Div>
            )}
          </Div>

          <Div h={"100%"} overFlowScroll>
            {!isEmpty(playersData) &&
              playersData.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onSelectPlayer={handlePlayerSelection}
                />
              ))}
          </Div>
          {!isEmpty(playersData) && (
            <Div mt={40}>
              <BuildYourTeamPlayersPagination />
            </Div>
          )}
        </motion.div>
      </motion.div>
    </Div>
  );
}
