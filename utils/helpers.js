// Packages
import cloneDeep from "lodash/cloneDeep";
import { isEmpty as isEmptyLodash } from "lodash";
import { shuffle as shuffleLodash } from "lodash/collection";

// Constants
import { currencySymbol } from "constants/universalConstants";
import { ALL_TEAMS } from "./playersHelper";

export const searchInArray = (searchQuery, array, objectKey = null) => {
  return array.filter((d) => {
    let data = objectKey ? d[objectKey] : d; //In case If It's Array Of Objects.
    let dataWords =
      typeof data == "string" &&
      data
        ?.split(" ")
        ?.map((b) => b && b.toLowerCase().trim())
        .filter((b) => b);
    let searchWords =
      typeof searchQuery == "string" &&
      searchQuery
        ?.split(" ")
        .map((b) => b && b.toLowerCase().trim())
        .filter((b) => b);
    let matchingWords = searchWords.filter((word) => dataWords.includes(word));
    return matchingWords.length;
  });
};

function convertToInternationalCurrencySystem(n) {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "k";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "m";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "b";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}

export const nFormatter = (n) => {
  return `${currencySymbol}${convertToInternationalCurrencySystem(n)}`;
};

export const nFormatterWOSign = (n) => {
  return `${convertToInternationalCurrencySystem(n)}`;
};

export const clone = (v) => {
  return cloneDeep(v);
};

export const shuffle = (a) => {
  return shuffleLodash(a);
};

export const isEmpty = (obj) => {
  return isEmptyLodash(obj);
};

export const isOdd = (num) => num % 2;

export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const responseSuccess = (msg, data = null) => {
  return {
    success: true,
    msg: msg,
    data,
  };
};

export const responseFailed = (msg = "") => {
  return {
    success: false,
    msg: msg,
  };
};

// Flatten object of arrays into single array with all objects
export const flattenObj = ($squad) => {
  let squad = [];
  for (let key in $squad) {
    if ($squad.hasOwnProperty(key)) {
      squad.push(...$squad[key]);
    }
  }
  return squad.filter((p) => !isEmpty(p));
};

export const getSelectedClubsIds = (selectedClubs) => {
  // Unselect all teams
  if (isEmpty(selectedClubs))
    return {
      in: [],
    };

  // Get all teams
  if (selectedClubs[0].value === ALL_TEAMS) {
    return {};
  }
  // Get players with these club/teams ids

  return {
    in: selectedClubs.map((club) => club.id),
  };
};
