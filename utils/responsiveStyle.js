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
}


const SIZING = {
    width: v => v ? {width: R(v)} : {},
    height: v => v ? {height: R(v)} : {},
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
    left: v => v ? {left: R(v)} : {},
    right: v => v ? {right: R(v)} : {},
    top: v => v ? {top: R(v)} : {},
    bottom: v => v ? {bottom: R(v)} : {},
}

const BORDER = {
    borderRadius: v => v ? {borderRadius: R(v)} : {},
}

const FLEX = {
    center: v => v ? {display: 'flex', alignItems: 'center', justifyContent: 'center'} : {},
    justifyBetween: v => v ? {display: 'flex', justifyContent: 'space-between'} : {}
}

const EFFECTS = {
    boxShadow: v => v ? {boxShadow: v} : {},
}

const INTERACTIVITY = {
    cursor: v => v ? {cursor: v} : {},
}

const BACKGROUNDS = {
    background: v => v ? {background: v} : {},
}

const LAYOUT = {
    display: v => v ? { display: v} : {}
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