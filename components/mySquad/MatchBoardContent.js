// Packages
import dayjs from "dayjs";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";

// Components
import CardImage from "components/selectClub/CardImage";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Animations
import ClubImageAnimation from 'Animations/mySquad/ClubImageAnimation'
import FTAnimation from "Animations/mySquad/FTAnimation";
import GoalsAnimation from "Animations/mySquad/GoalsAnimations";
import MatchTimeAnimation from "Animations/mySquad/MatchTimeAnimation";
import TeamNameAnimation from "Animations/mySquad/TeamNameAnimation"

// Styles
const getStyles = (R) => {
    return {
        matchDate: {
            fontSize: R(16),
            lineHeight: R(20, 'px'),
            color: colors.regent_grey,
            position: 'absolute',
            left: 0,
            right: 0,

        },
        matchDateBox: {
            marginTop: R(30),
            paddingBottom: R(5),
        },
        matchBox: {
            marginTop: R(50)
        },
        teamName: {
            fontSize: R(24),
            lineHeight: R(28, 'px'),
            color: colors.black_rock,
            fontWeight: '600',
            textTransform: 'capitalize',
            position: 'absolute',
        },
        leftBox:{
          paddingRight: R(100),
        },
        team1Name: {
            marginRight: R(20),
            marginLeft: R(16),
            right: R(160)
        },
        team2Name: {
            marginRight: R(16),
            marginLeft: R(20),
            left: R(60)
        },
        teamImage: {
            width: R(50),
            height: R(50)
        },
        goals: {
            fontWeight:'600',
            fontSize: R(24),
            lineHeight: R(28, 'px')
        },
        ft: {
          fontSize: R(12),
            lineHeight: R(16, 'px'),
            color: colors.regent_grey,
            textTransform: 'uppercase',
            position:'absolute',
            top: R(10),
            left: R(42),
        },
        time: {
            position:'absolute',
            top: R(-10),
            fontSize: R(20),
            lineHeight: R(24, 'px'),
            fontWeight: '400',
            marginLeft: R(24),
            marginRight: R(24),
            color: colors.black_rock,
        },
        goalsBox: {
            position: 'absolute',
            top: R(-20),
            marginLeft: R(32),
            marginRight: R(32),
        }
    }
}

const GoalComponent = ({match}) => {
    const STYLES =  { ...getStyles(R) }
    return (
        <div className={'flex'}>
            <p
                style={{
                    ...STYLES.goals,
                    color: match.club1.goals > match.club2.goals ? colors.mandy : colors.black_rock
                }}>
                {match.club1.goals}
            </p>
            <p style={{...STYLES.goals}}>:</p>
            <p
                style={{
                    ...STYLES.goals,
                    color: match.club2.goals > match.club1.goals ? colors.mandy : colors.black_rock
                }}>
                {match.club2.goals}
            </p>
        </div>

    )
}

const GoalAndMatchTime = (props) => {
    const {
        match,
        index,
        parentIndex,
        initialOpacity,
        tabChanged
    } = props
    const STYLES =  { ...getStyles(R) }

    if(match.finished) {
        if(tabChanged) {
            return (
                <AnimatePresence>
                    <motion.div
                        variants={GoalsAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{index, parentIndex, initialOpacity}}
                        style={STYLES.goalsBox}
                        key={1}
                    >
                        <GoalComponent {...props}/>
                    </motion.div>
                </AnimatePresence>
            )
        }else {
            return (
                <AnimatePresence>
                    <motion.div
                        variants={GoalsAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{index, parentIndex, initialOpacity}}
                        style={STYLES.goalsBox}
                        key={3}
                    >
                        <GoalComponent {...props}/>
                    </motion.div>
                </AnimatePresence>
            )
        }
    }else {
        return (
            <AnimatePresence>
                <MatchTimeComponent {...props}/>
            </AnimatePresence>
        )
    }
}

const MatchTimeComponent = ({
    match,
    index,
    parentIndex,
    initialOpacity
}) => {

    const STYLES =  { ...getStyles(R) }

    return (
        <motion.p
            variants={MatchTimeAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={{index, parentIndex, initialOpacity}}
            key={2}
            style={STYLES.time}>
            {dayjs(match.time).format('HH:mm')}
        </motion.p>
    )
}

export default function MatchBoardContent({
    activeTabContent,
    tabChanged
}){

    const STYLES =  { ...getStyles(R) }

    const { matchesDates } = activeTabContent

    const [initialOpacity, setInitialOpacity] = useState(1)

    useEffect(() => {
        if(initialOpacity) {
            setInitialOpacity(0)
        }
    }, [tabChanged])

    return (
        <div className={'w-full'}>
            {
               matchesDates && matchesDates.length > 0 && matchesDates.map((matchDate, index) => {
                   const parentIndex = index
                    return (
                        <div key={parentIndex} >
                            <div className={'relative w-full'} style={STYLES.matchDateBox}>
                                {
                                    tabChanged ? (
                                        <AnimatePresence>
                                            <motion.p
                                                variants={ClubImageAnimation}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                key={1}
                                                custom={{initialOpacity}}
                                                className={'flex items-center justify-center'} style={STYLES.matchDate}>
                                                {dayjs(matchDate.date).format('dddd D MMMM YYYY')}
                                            </motion.p>
                                        </AnimatePresence>

                                    ): (
                                        <AnimatePresence>
                                            <motion.p
                                                variants={ClubImageAnimation}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                key={2}
                                                custom={{initialOpacity}}
                                                className={'flex items-center justify-center'} style={STYLES.matchDate}>
                                                {dayjs(matchDate.date).format('dddd D MMMM YYYY')}
                                            </motion.p>
                                        </AnimatePresence>
                                    )
                                }
                            </div>
                            {
                                matchDate.matches.map((match, index) => (
                                    <div key={index} style={STYLES.matchBox}>
                                        <div className={'flex items-center'}>
                                            <div className={'w-[54%]'}>
                                                <div className={'flex justify-end items-center relative'} style={STYLES.leftBox}>
                                                    {
                                                        match.finished ? (
                                                            <AnimatePresence>
                                                                <motion.p
                                                                    variants={TeamNameAnimation}
                                                                    initial="initial"
                                                                    animate="animate"
                                                                    exit="exit"
                                                                    key={1}
                                                                    custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub: false}}
                                                                    style={{...STYLES.teamName, ...STYLES.team1Name}}
                                                                >{match.club1.name}</motion.p>
                                                            </AnimatePresence>
                                                        ): (
                                                            <AnimatePresence>
                                                                <motion.p
                                                                    variants={TeamNameAnimation}
                                                                    initial="initial"
                                                                    animate="animate"
                                                                    exit="exit"
                                                                    key={2}
                                                                    custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub: false}}                                                               style={{...STYLES.teamName, ...STYLES.team1Name}}
                                                                >{match.club1.name}</motion.p>
                                                            </AnimatePresence>
                                                        )
                                                    }

                                                    <div style={STYLES.teamImage}>
                                                        <CardImage
                                                            fadeInOutAnimation={ClubImageAnimation}
                                                            custom={{initialOpacity}}
                                                            changeCard={tabChanged}
                                                            image={{ ...STYLES.teamImage, name: match.club1.logo }}
                                                        />
                                                    </div>
                                                    <div className={'relative'}>

                                                        <GoalAndMatchTime
                                                            match={match}
                                                            index={index}
                                                            parentIndex={parentIndex}
                                                            initialOpacity={initialOpacity}
                                                            tabChanged={tabChanged}
                                                        />


                                                        {
                                                            match.finished ? (
                                                                <AnimatePresence>
                                                                    <motion.p
                                                                        variants={FTAnimation}
                                                                        initial="initial"
                                                                        animate="animate"
                                                                        exit="exit"
                                                                        custom={{ index, parentIndex, initialOpacity}}
                                                                        key={3}
                                                                        style={STYLES.ft}
                                                                    >FT
                                                                    </motion.p>
                                                                </AnimatePresence>
                                                            ): (<AnimatePresence/>)
                                                        }

                                                    </div>

                                                </div>
                                            </div>

                                            <div className={'w-[46%]'}>
                                                <div className={'flex items-center relative'}>

                                                    <div style={STYLES.teamImage}>
                                                        <CardImage
                                                            fadeInOutAnimation={ClubImageAnimation}
                                                            custom={{initialOpacity}}
                                                            changeCard={tabChanged}
                                                            image={{ ...STYLES.teamImage, name: match.club2.logo }}
                                                        />
                                                    </div>

                                                    {
                                                        match.finished ? (
                                                            <AnimatePresence>
                                                                <motion.p
                                                                    variants={TeamNameAnimation}
                                                                    initial="initial"
                                                                    animate="animate"
                                                                    exit="exit"
                                                                    key={1}
                                                                    custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub: true}}                                                                    style={{...STYLES.teamName, ...STYLES.team2Name}}
                                                                >{match.club2.name}</motion.p>
                                                            </AnimatePresence>
                                                        ): (
                                                            <AnimatePresence>
                                                                <motion.p
                                                                    variants={TeamNameAnimation}
                                                                    initial="initial"
                                                                    animate="animate"
                                                                    exit="exit"
                                                                    key={2}
                                                                    custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub: true}}                                                                    style={{...STYLES.teamName, ...STYLES.team2Name}}
                                                                >{match.club2.name}</motion.p>
                                                            </AnimatePresence>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                })
            }
        </div>

    )
}