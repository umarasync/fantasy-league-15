// Packages
import React from "react";
import useWindowSize from "hooks/useWindowSize";

const containerWidth = 1440;

const getResponsiveValue = (value, measurement = '') => {

    if(typeof(value) === 'string') return value

    if (value === 0) return value

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

export default getResponsiveValue