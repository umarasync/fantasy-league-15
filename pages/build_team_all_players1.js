import BuildTeamAllPlayer from "components/layout/build_team_players";

// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// Utils
import R from "utils/getResponsiveValue";
import { nFormatter, clone, isEmpty } from "utils/helpers";
import { getPlayers } from "redux/Players/api";

export default function PlayerAll() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [PLAYERS, SETPLAYERS] = useState(false);
  const [CLUBS, SETCLUBS] = useState(false);
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    if (filterData) {
      console.log("filterData", filterData);
      const where = {};
      const sortBy = {};
      //Team Filters
      if (
        filterData.selectedClubs.length > 0 &&
        filterData.selectedClubs.length < 2 &&
        filterData.selectedClubs[0].id != 1
      ) {
        //means only on team is selected
        where.teamId = { eq: filterData.selectedClubs[0].id };
      }
      if (
        filterData.selectedClubs.length > 0 &&
        filterData.selectedClubs.length > 1
      ) {
        //means more than one team is selected
        where.teamId = {
          in: filterData.selectedClubs.map((SEL, i) => {
            return SEL.id;
          }),
        };
      }
      if (filterData.selectedPrice.value != "All prices") {
        if (
          filterData.selectedPrice.value.from == 0 &&
          filterData.selectedPrice.value.to > 0
        ) {
          where.value = { lte: parseInt(filterData.selectedPrice.value.to) };
        } else if (
          filterData.selectedPrice.value.from > 0 &&
          filterData.selectedPrice.value.to > 0
        ) {
          where.value = {
            lte: parseInt(filterData.selectedPrice.value.to),
            gte: parseInt(filterData.selectedPrice.value.from),
          };
        } else if (
          filterData.selectedPrice.value.from > 0 &&
          (filterData.selectedPrice.value.to == 0 ||
            filterData.selectedPrice.value.to == null)
        ) {
          where.value = { gt: parseInt(filterData.selectedPrice.value.from) };
        }
      }
      switch (filterData.activePosition) {
        case "All":
          where.position = { eq: "" };
          break;
        case "GK":
          where.position = { eq: "goalkeeper" };
          break;
        case "FWD":
          where.position = { eq: "forward" };
          break;
        case "MID":
          where.position = { eq: "midfielder" };
          break;
        case "DEF":
          where.position = { eq: "defender" };
          break;
      }
      if (
        filterData.selectedSortingOption &&
        filterData.selectedSortingOption.id
      ) {
        switch (filterData.selectedSortingOption.id) {
          case 1: //TOTAL_POINTS
            // sortBy.score = "DESC";
            sortBy.value = "DESC";
            break;
          case 2: //PRICE_FROM_HIGH_TO_LOW
            sortBy.value = "DESC";
            break;
          case 3: //PRICE_FROM_LOW_TO_HIGH
            sortBy.value = "ASC";
            break;
          case 4: //MOST_TRANSFERRED
            sortBy.value = "ASC";
            break;
        }
      }
      // if (searchText) {
      //   where.playerName = { contains: searchText };
      // }

      console.log("where", where);
      //Query API with Filter values
      dispatch(getPlayers(50, 0, where, sortBy));
    }
  }, [filterData]);

  /***** Fetching and Building Players Array ****/
  const getPlayersSuccess = useSelector(
    ({ players }) => players.getPlayersSuccess
  );
  const getPlayersError = useSelector(({ players }) => players.getPlayersError);
  /****** Helper Methods *****/
  //returns player position as per the filter values
  const _playerPosition = (position) => {
    let playerPosition = "";
    switch (position) {
      case "FORWARD":
        playerPosition = "FWD";
        break;
      case "DEFENDER":
        playerPosition = "DEF";
        break;
      case "MIDFIELDER":
        playerPosition = "MID";
        break;
      case "GOALKEEPER":
        playerPosition = "GK";
        break;
    }
    return playerPosition;
  };

  /**** Fetching All Teams Data From Server ****/
  useEffect(() => {
    //Query API with Inital values
    dispatch(getPlayers(50, 0, { teamId: { eq: "" } }, { value: "DESC" }));
  }, []);

  /**** Initial Query Response ****/
  useEffect(() => {
    //Query API response
    if (getPlayersSuccess) {
      //building Players array
      SETPLAYERS(
        getPlayersSuccess.map((p, i) => {
          return {
            id: p.id,
            image: p.photo,
            clubImage: p.team.logo,
            clubName: p.team.name,
            status: p.state ? p.state : "fit", // Currently checking due to data sync gaps
            name: p.matchName,
            nextMatch: {
              club: "GRO",
              vs: "BEN",
              matchType: "H",
            },
            price: parseInt(p.value),
            formattedPrice: nFormatter(p.value),
            position: _playerPosition(p.position),
            points: 14,
            most_transferred: 2,
            picked: 12,
            pickedAsCaptain: 6,
            recommended: true,
            penaltyTaker: false,
          };
        })
      );

      //building Clubs array
      const clubData = getPlayersSuccess.map((p, i) => {
        return { team: p.team };
      });
      const uniqueClubs = [
        ...new Map(
          clubData.map((item) => [item.team["id"], item.team])
        ).values(),
      ];
      SETCLUBS(
        //Default ALL Clubs object
        [
          {
            id: 1,
            label: "All Teams",
            value: "All Teams",
            checked: true,
          },
        ].concat(
          uniqueClubs.map((c, i) => {
            return {
              id: c.id,
              label: c.name,
              value: c.name,
              image: c.logo,
              checked: false,
            };
          })
        )
      );
      console.log("getPlayersSS");
    } else if (getPlayersError) {
      console.log("getPlayersError", getPlayersError);
    }
  }, [getPlayersSuccess, getPlayersError]);

  return (
    <>
      {PLAYERS && CLUBS && (
        <BuildTeamAllPlayer
          players={PLAYERS}
          clubs={CLUBS}
          selectedFilters={setFilterData}
        />
      )}
    </>
  );
}
