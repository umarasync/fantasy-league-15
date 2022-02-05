import {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import Button from "components/html/Button";
import LeagueSettingsBoardContent from "components/leaguesAndRanking/leagueInner/LeagueSettingsBoardContent";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors"

// Animation
import {
    getRenameButtonAnimation,
} from "Animations/leaguesAndRanking/LeagueAndRankingSettingsAnimation";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        input: {
            fontSize: R(28),
            lineHeight: R(32, 'px'),
            background: 'transparent',
            color: colors.black_rock,
            caretColor: colors.bean_red,
            border: 'none',
        },
        content: {
            gridColumn: 1,
            gridRow: 1
        }
    }
}

export default function LeagueSettingsBoard() {

    const STYLES = {...getStyles(R)}

    const [editOpen, setEditOpen] = useState(false)
    const [leagueName, setLeagueName] = useState('theroom fc')
    const leagueNameInputRef = useRef(null)

    const handleEdit = () => {
        setEditOpen(true)
    }

    const handleEditDone = () => {
        setEditOpen(false)
    }

    const handleLeagueNameChange = (e) => {
        setLeagueName(e.target.value)
    }

    useEffect(() => {
        leagueNameInputRef.current.focus()
    }, [editOpen])

    return (
        <Div
            h={550}
            pl={40}
            pr={40}
            pt={40}
            w={1280}
            className={'flex flex-col bg-white'}
            position="relative"
            br={12}
            bs={SHADOW_WHITE_SMOKE}
        >
            {/*header*/}
            <Div className={'flex items-center justify-between'} mb={24}>
                <Div>
                    <Text text={'League name'} fs={18} lh={22} fw={600} color={colors.regent_grey} mb={16}/>
                    <input
                        className={'disable-input-outline font-[900] italic uppercase'} type="text"
                        style={STYLES.input}
                        value={leagueName}
                        disabled={!editOpen}
                        onChange={handleLeagueNameChange}
                        ref={leagueNameInputRef}
                    />
                </Div>
                <Div className={"grid"} mt={20}>
                    {
                        editOpen ? (
                            <AnimatePresence>
                                <motion.div
                                    variants={getRenameButtonAnimation()}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    key={1}
                                    style={STYLES.content}
                                >
                                    <div>
                                        <Button
                                            title={'Done'}
                                            disabled={false}
                                            h={50}
                                            lh={20}
                                            w={125}
                                            onClick={handleEditDone}
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                        ) : (
                            <AnimatePresence>
                                <motion.div
                                    variants={getRenameButtonAnimation()}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    key={2}
                                    style={STYLES.content}
                                    onClick={handleEdit}
                                >
                                    <Div className={'flex items-center justify-end cursor-pointer'} h={50} w={125}>
                                        <Text text={'Rename'} fs={18} lh={22} color={colors.dark_indigo} mr={5}/>
                                        <Image src={'/images/edit.png'} w={24} h={24} alt={'edit'}/>
                                    </Div>
                                </motion.div>
                            </AnimatePresence>
                        )
                    }
                </Div>
            </Div>
            <BorderHorizontal/>
            {/*Content*/}
            <LeagueSettingsBoardContent/>
        </Div>

    )
}