import axios from "../../utils/axiosInstance";
import {
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILED,
  UPDATE_TEAM_TO_PROFILE_SUCCESS,
  UPDATE_TEAM_TO_PROFILE_FAILED,
  RESET_PAGE,
} from "./actions";

export const getAllTeams = () => {
  return async (dispatch) => {
    let res = await axios.post(
      "/graphql",
      {
        query: `query teams {
          teams(_first: 100, _offset: 0) {
            data {
              id
              name
              venue
              area
              logo
            }
          }
        }    
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.teams &&
      res.data.data.teams.data != null
    ) {
      dispatch({
        type: GET_ALL_TEAMS_SUCCESS,
        loading: false,
        payload: res.data.data.teams.data,
      });
    } else {
      dispatch({
        type: GET_ALL_TEAMS_FAILED,
        loading: false,
        payload: res.data.errors[0].message,
      });
    }
  };
};

export const addFavouriteTeam = (data) => {
  return async (dispatch) => {
    let res = await axios.post(
      "/graphql",
      {
        query: `mutation updateTeamToProfile($data: UpdateTeamToProfileInput!){
          updateTeamToProfile(data: $data) {
            code
            message    
          }
        }       
      `,
        variables: {
          data: {
            profileId: data.profileId,
            accountId: data.accountId,
            favouriteTeamId: data.favouriteTeamId,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.updateTeamToProfile.code == 200
    ) {
      //Store data for processing
      localStorage.setItem("user-team", JSON.stringify(data.favouriteTeamId));
      dispatch({
        type: UPDATE_TEAM_TO_PROFILE_SUCCESS,
        loading: false,
        payload: res.data.data.updateTeamToProfile.message,
      });
    } else {
      dispatch({
        type: UPDATE_TEAM_TO_PROFILE_FAILED,
        loading: false,
        payload: '',
      });
    }
  };
};
