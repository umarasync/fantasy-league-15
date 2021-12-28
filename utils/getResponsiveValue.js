// Packages
import React from "react";
import useWindowSize from "hooks/useWindowSize";

const containerWidth = 1440;

const getResponsiveValue = (value, measurement = '', fromHeight = false) => {

    const [ width, height ] = useWindowSize();

    let responsiveValue = ''

    if(fromHeight) {
        if(height < 900) {
            responsiveValue = height + (900 - height)
        } else {
            responsiveValue = height
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