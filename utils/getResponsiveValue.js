// Packages
import React from "react";
import useWindowSize from "hooks/useWindowSize";

const containerWidth = 1440;

const getResponsiveValue = (value, measurement = '') => {

    const [ width ] = useWindowSize();

    let responsiveValue = width / (containerWidth / value)
    if(measurement){
        return `${responsiveValue}${measurement}`
    }
    return responsiveValue
}

export default getResponsiveValue