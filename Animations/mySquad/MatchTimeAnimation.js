// Utils
import {isOdd} from "utils/helpers";

const duration = 0.7

const getMatchTimePoints = (index, parentIndex, forPoint) => {
    //2nd Card
    if(!isOdd(parentIndex) && isOdd(index) ) {
        if(forPoint === 'initial') {return {
            scale: 1.3,
            y: -12,
            x: 20
        }
        }
        else if(forPoint === 'animate') {return {
            scale: 1
        }}
        else if(forPoint === 'exit') {return {
            scale: 1.3,
            y: -12,
            x: 20
        }}
        return {}

    }else if(isOdd(parentIndex) && isOdd(index)){ // 4th card
        if(forPoint === 'initial') {return {
            opacity: 0,
            x: -60
        }
        }
        else if(forPoint === 'animate') {return {}}
        else if(forPoint === 'exit') {return {
            x: -60
        }}
        return {}

    } else if(!isOdd(parentIndex) && !isOdd(index)) { // 1st card
        if(forPoint === 'initial') {return {
            x: 60,
        }
        }
        else if(forPoint === 'animate') {return {}}
        else if(forPoint === 'exit') {return {
            x: 60,
        }}
        return {}
    }else if(isOdd(parentIndex) && !isOdd(index)) { // 3rd case

        if(forPoint === 'initial') {return {
            scale: 1.3,
            y: -12,
            x: 20
        }
        }
        else if(forPoint === 'animate') {return {
            scale: 1
        }}
        else if(forPoint === 'exit') {return {
            scale: 1.3,
            y: -12,
            x: 20
        }}
        return {}
    }
}

const MatchTimeAnimation = {
    initial: ({index, parentIndex, initialOpacity}) => {
        return {
            opacity: initialOpacity,
            ...getMatchTimePoints(index, parentIndex, 'initial'),
            transition: {
                duration: duration
            }
        }
    },
    animate: ({index, parentIndex}) => {
        return {
            opacity: 1,
            x: 0,
            y:0,
            ...getMatchTimePoints(index, parentIndex, 'animate'),
            transition: {
                duration: duration
            }
        }
    },
    exit: ({index, parentIndex}) => {
        return {
            opacity: 0,
            ...getMatchTimePoints(index, parentIndex, 'exit'),
            transition: {
                duration: duration
            }
        }
    }
};

export default MatchTimeAnimation