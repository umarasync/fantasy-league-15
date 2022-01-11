// Utils
import R from "utils/getResponsiveValue";

const TYPOGRAPHY = {
    fontSize: v => v ? {fontSize: R(v)} : {},
    fontWeight: v => ({ fontWeight: v || 'normal' }),
    fontStyle: v => ({ fontStyle: v || 'normal' }),
    textTransform: v => ({ textTransform: v || 'none' }),
    lineHeight: v => v ? {lineHeight: R(v, 'px')} : {},
    color: v => ({ color: v || 'black' }),
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

const ResponsiveStyle = {
    ...TYPOGRAPHY,
    ...SIZING,
    ...SPACING
}

export default ResponsiveStyle