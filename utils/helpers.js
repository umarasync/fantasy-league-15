// Constants
import {currencySymbol} from "constants/universal";

export const searchInArray =(searchQuery, array, objectKey=null)=>{

    return array.filter(d=>{
        let data =objectKey? d[objectKey] : d //Incase If It's Array Of Objects.
        let dataWords= typeof data=="string" && data?.split(" ")?.map(b=>b&&b.toLowerCase().trim()).filter(b=>b)
        let searchWords = typeof searchQuery=="string"&&searchQuery?.split(" ").map(b=>b&&b.toLowerCase().trim()).filter(b=>b)

        let matchingWords = searchWords.filter(word=>dataWords.includes(word))

        return matchingWords.length

    })
}

function convertToInternationalCurrencySystem(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "k";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "m";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "b";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
}

export const nFormatter = (n) => {
    return `${currencySymbol}${convertToInternationalCurrencySystem(n)}`
}

export const nFormatterWOSign = (n) => {
    return `${convertToInternationalCurrencySystem(n)}`
}

export const clone = (v) => JSON.parse(JSON.stringify(v))

export const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const isOdd = (num) => num % 2

export const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};
