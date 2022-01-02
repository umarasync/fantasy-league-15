// Packages
import React from "react";
import useWindowSize from "hooks/useWindowSize";

const containerWidth = 1440;

const GetResponsiveValue = (value= '', measurement = '') => {

    const [ width, height ] = useWindowSize();

    let responsiveValue = ''

    if(!value) {
        responsiveValue = height
    } else {
        responsiveValue = width / (containerWidth / value)
    }

    if(measurement){
        return `${responsiveValue}${measurement}`
    }

    return responsiveValue
}

export default GetResponsiveValue