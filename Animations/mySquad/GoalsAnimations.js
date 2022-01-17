// Utils
import {isOdd} from "utils/helpers";

const duration = 0.7

const getGoalsAnimationsPoints = (index, parentIndex, forPoint) => {
    //2nd Card
    if(!isOdd(parentIndex) && isOdd(index) ) {
        if(forPoint === 'initial') {
            return {
                x: 120,
                y: 5
            }
        }
        else if(forPoint === 'animate') {return {}}

        else if(forPoint === 'exit') {return {
            x: 120,
            y: 5
        }}
        return {}

    }else if(isOdd(parentIndex) && isOdd(index)){ // 4th card
        if(forPoint === 'initial') {return {
            opacity: 0,
            x: 60
        }
        }
        else if(forPoint === 'animate') {return {}}
        else if(forPoint === 'exit') {return {
            x: 60
        }}
        return {}

    } else if(!isOdd(parentIndex) && !isOdd(index)) { // 1st card
        if(forPoint === 'initial') {return {
            opacity: 0,
            x: -60,
            y: -4,
        }
        }
        else if(forPoint === 'animate') {return {
            scale: 1,
        }}
        else if(forPoint === 'exit') {return {
            x: -60,
            y: -4,
        }}
        return {}
    }else if(isOdd(parentIndex) && !isOdd(index)) { // 3rd case

        if(forPoint === 'initial') {return {
            scale: 0.8,
            x: -25,
            y: 4
        }}
        else if(forPoint === 'animate') {return {
            scale: 1
        }}
        else if(forPoint === 'exit') {return {
            scale: 1,
            x: -25,
            y: 4
        }}
        return {}
    }
}

const GoalsAnimation = {
    initial: ({index, initialOpacity, parentIndex}) => {
        return {
            opacity: initialOpacity,
            ...getGoalsAnimationsPoints(index, parentIndex, 'initial'),
            transition: {
                duration: duration
            }
        }
    },
    animate: ({index, parentIndex}) => {
        return {
            opacity: 1,
            x: 0,
            y: 0,
            ...getGoalsAnimationsPoints(index, parentIndex, 'animate'),
            transition: {
                duration: duration,
            },
        }
    },
    exit: ({index, parentIndex}) => {
        return {
            opacity: 0,
            ...getGoalsAnimationsPoints(index, parentIndex, 'exit'),
            transition: {
                duration: duration - 0.2,
            },
        }
    },
};

export default GoalsAnimation
