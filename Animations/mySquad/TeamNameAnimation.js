// Utils
import {isOdd} from "utils/helpers";

const duration = 0.7

const getPoints = (index, parentIndex, isMatchFinished,fromSecondClub, forPoint) => {
    //2nd Card
    if(!isOdd(parentIndex) && isOdd(index) ) {
        return {}
    }else if(isOdd(parentIndex) && isOdd(index)){ // 4th card
        if(fromSecondClub) {
            return {}
        }else {
            if(forPoint === 'initial') {
                return {
                    x: isMatchFinished ? 90 : -80,
                }
            }
            else if(forPoint === 'animate') {return {}}
            else if(forPoint === 'exit') {return {
                x: isMatchFinished ? 90 : -80,
            }}
            return {}
        }

    } else if(!isOdd(parentIndex) && !isOdd(index)) { // 1st card

        if(fromSecondClub) {
            if(forPoint === 'initial') {
                return { x: isMatchFinished ? 0 : 80}
            }
            else if(forPoint === 'animate') {return {}}
            else if(forPoint === 'exit') {return {
                x: isMatchFinished ? 0 : 80,
            }}
            return {}
        }else {
            if(forPoint === 'initial') {
                return { x: isMatchFinished ? -90 : 80}
            }
            else if(forPoint === 'animate') {return {}}
            else if(forPoint === 'exit') {return {
                x: isMatchFinished ? -90 : 80,
            }}
            return {}
        }


    }else if(isOdd(parentIndex) && !isOdd(index)) { // 3rd case
        return {}
    }
}

const TeamNameAnimation = {
    initial: ({index, parentIndex, initialOpacity, isMatchFinished, fromSecondClub}) => {
        return {
            opacity: initialOpacity,
            ...getPoints(index, parentIndex, isMatchFinished, fromSecondClub, 'initial'),
        }
    },
    animate: ({index, parentIndex, isMatchFinished, fromSecondClub, initialOpacity}) => {
        return {
            opacity: 1,
            x:0,
            y: 0,
            ...getPoints(index, parentIndex, isMatchFinished, fromSecondClub,'animate'),
            transition: {
                duration: duration,
            },
        }
    },
    exit: ({index, parentIndex, isMatchFinished, fromSecondClub, initialOpacity}) => {
        return {
            opacity: 0,
            ...getPoints(index, parentIndex, isMatchFinished, fromSecondClub, 'exit'),
            transition: {
                duration: duration,
            },
        }
    },
};

export default TeamNameAnimation