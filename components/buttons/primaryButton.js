export default function PrimaryButton({
    title,
    onClick,
    style,
    disabled,
    parentStyle,
    buttonClasses,
                                          textStyle,
                                          textClasses
}){
    return (
        <div className={`w-full ${parentStyle}`}>
            <button disabled={disabled} onClick={onClick} className={`primary-button pt-[0.7rem] flex justify-center items-center w-full ${buttonClasses} ${disabled && 'opacity-50'}`} style={style}>
                <span className={`font-[900] leading-[2rem] text-[1.6rem] italic text-white uppercase ${textClasses}`} style={textStyle}>{title}
                </span>
            </button>
        </div>
    )
}