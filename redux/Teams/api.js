import axios from "../../utils/axiosInstance";
import {
  GET_ALL_TEAMS_SUCCESS,
  GET_ALL_TEAMS_FAILED,
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
