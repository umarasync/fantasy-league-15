// Constants
import {
    ALL_PRICES,
    ALL_STATUSES, ALL_TEAMS,
    MOST_PICKED_AS_CAPTAIN,
    MOST_PICKED_PLAYERS, POSITION_ALL,
    POTENTIAL_PENALTY_TAKERS,
    RECOMMENDED_PLAYERS
} from "constants/data/filters";

const filtersHandler = ({
    player,
    activePosition,
    selectedClubs,
    selectedPrice,
    selectedStatuses,
    selectedRecommendation

}) => {
    // POSITION-FILTER
    if (player.position === activePosition || activePosition === POSITION_ALL) {

        // TEAM-FILTER
        if (selectedClubs.length > 0 &&
            (selectedClubs[0].value === ALL_TEAMS || selectedClubs.some(club => club.value === player.clubName))) {

            // Price-FILTER
            if (
                selectedPrice.value === ALL_PRICES ||
                ((selectedPrice.value.to === null) && player.price > selectedPrice.value.from) ||
                (player.price > selectedPrice.value.from && player.price < selectedPrice.value.to)) {

                // STATUS-FILTER
                if (selectedStatuses.length > 0 &&
                    (selectedStatuses[0].value === ALL_STATUSES || selectedStatuses.some(status => status.value === player.status))) {

                    // Recommendation-FILTER
                    if (
                        (selectedRecommendation.value === RECOMMENDED_PLAYERS) && (player.recommended) ||
                        (selectedRecommendation.value === POTENTIAL_PENALTY_TAKERS) && (player.penaltyTaker) ||
                        (selectedRecommendation.value === MOST_PICKED_PLAYERS) && (player.picked > 0) ||
                        (selectedRecommendation.value === MOST_PICKED_AS_CAPTAIN) && (player.pickedAsCaptain > 0)
                    ) {
                        return true
                    }
                }
            }
        }

    }
}

export default filtersHandler