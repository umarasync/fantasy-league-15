const getResponsiveValue = (containerWidth, value, measurement = '') => {
    if(measurement){
        return `${containerWidth / value}${measurement}`
    }
    return containerWidth / value
}



export default getResponsiveValue