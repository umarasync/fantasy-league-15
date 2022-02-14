// Utils
import R from "utils/getResponsiveValue";

const TYPOGRAPHY = {
    fontSize: v => v ? {fontSize: R(v)} : {},
    fontWeight: v => ({ fontWeight: v || 'normal' }),
    fontStyle: v => ({ fontStyle: v || 'normal' }),
    textTransform: v => ({ textTransform: v || 'none' }),
    lineHeight: v => v ? {lineHeight: R(v, 'px')} : {},
    color: v => ({ color: v || 'black' }),
    textCenter: v => v ? {textAlign: 'center'} : {},
    textAlign: v => v ? {textAlign: v} : {},
    noWrap: v => v ? {whiteSpace: 'nowrap'} : {},
}


const SIZING = {
    width: v => v ? {width: R(v)} : {},
    minWidth: v => v ? {minWidth: R(v)} : {},
    maxWidth: v => v ? {maxWidth: R(v)} : {},
    height: v => v ? {height: R(v)} : {},
    minHeight: v => v ? {minHeight: R(v)} : {},
    maxHeight: v => v ? {maxHeight: R(v)} : {},
}


const SPACING = {
    padding: v => v ? {padding: R(v)} : {},
    paddingLeft: v => v ? {paddingLeft: R(v)} : {},
    paddingRight: v => v ? {paddingRight: R(v)} : {},
    paddingTop: v => v ? {paddingTop: R(v)} : {},
    paddingBottom: v => v ? {paddingBottom: R(v)} : {},
    margin: v => v ? {margin: R(v)} : {},
    marginLeft: v => v ? {marginLeft: R(v)} : {},
    marginRight: v => v ? {marginRight: R(v)} : {},
    marginTop: v => v ? {marginTop: R(v)} : {},
    marginBottom: v => v ? {marginBottom: R(v)} : {},
}

const POSITIONING = {
    position: v => v ? {position: v} : {},
    left: v => {
        if(v === 0) {
            return {left: 0}
        }else if(v > 0 || v < 0) {
            return {left: R(v)}
        }
        return {}
    },

    right: v => {
        if (v === 0) {
            return {right: 0}
        } else if (v > 0 || v < 0) {
            return {right: R(v)}
        }
        return {}
    },

    top: v => {
        if (v === 0) {
            return {top: 0}
        } else if (v > 0 || v < 0) {
            return {top: R(v)}
        }
        return {}
    },

    bottom: v => {
        if (v === 0) {
            return {bottom: 0}
        } else if (v > 0 || v < 0) {
            return {bottom: R(v)}
        }
        return {}
    }
}

const BORDER = {
    border: v => v ? {border: v} : {},
    borderRadius: v => v ? {borderRadius: R(v)} : {},
    borderTopLeftRadius: v => v ? {borderTopLeftRadius: R(v)} : {},
    borderTopRightRadius: v => v ? {borderTopRightRadius: R(v)} : {},
    borderBottomLeftRadius: v => v ? {borderBottomLeftRadius: R(v)} : {},
    borderBottomRightRadius: v => v ? {borderBottomRightRadius: R(v)} : {},
}

const FLEX = {
    center: v => v ? {display: 'flex', alignItems: 'center', justifyContent: 'center'} : {},
    justifyBetween: v => v ? {display: 'flex', alignItems: 'center',  justifyContent: 'space-between'} : {}
}

const EFFECTS = {
    boxShadow: v => v ? {boxShadow: v} : {},
    opacity: v => v ? {opacity: v} : {},
}

const INTERACTIVITY = {
    cursor: v => v ? {cursor: v} : {},
}

const BACKGROUNDS = {
    background: v => v ? {background: v} : {},
}

const LAYOUT = {
    display: v => v ? { display: v} : {},
    inline: v => v ? { display: 'inline'} : {},
    zIndex: v => v ? { zIndex: v} : {},
    overFlowXScroll: v => v ? { overflowX: 'scroll'} : {}
}

const ResponsiveStyle = {
    ...TYPOGRAPHY,
    ...SIZING,
    ...SPACING,
    ...BORDER,
    ...FLEX,
    ...EFFECTS,
    ...INTERACTIVITY,
    ...BACKGROUNDS,
    ...POSITIONING,
    ...LAYOUT
}

export default ResponsiveStyle