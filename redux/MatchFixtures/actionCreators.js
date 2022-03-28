
export const GET_MATCH_FIXTURES_SUCCESS = "GET_MATCH_FIXTURES_SUCCESS";
export const GET_MATCH_FIXTURES_FAILED = "GET_MATCH_FIXTURES_FAILED";


export const getMatchFixturesSuccess = (payload) => {
    return {
        type: GET_MATCH_FIXTURES_SUCCESS,
        payload
    }
}

export const getMatchFixturesFailed = (payload) => {
    return {
        type: GET_MATCH_FIXTURES_FAILED,
        payload
    }
}
