// Packages
import React from "react";
import useWindowSize from "hooks/useWindowSize";

const containerWidth = 1440;

const getResponsiveValue = (value, measurement = '', fromHeight = false) => {

    const [ width, height ] = useWindowSize();

    let responsiveValue = ''

    if(fromHeight) {
        if(height < 900) {
            responsiveValue = height + (value - height)
        } else {
            responsiveValue = height + 20
        }
    } else {
        responsiveValue = width / (containerWidth / value)
    }

    if(measurement){
        return `${responsiveValue}${measurement}`
    }

    return responsiveValue
}

export default getResponsiveValue