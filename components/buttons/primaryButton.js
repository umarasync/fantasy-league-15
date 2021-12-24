export default function PrimaryButton({
    title,
    onClick,
    style,
    disabled,
    parentStyle
}){
    return <div className={`w-full ${parentStyle}`}><button disabled={disabled} onClick={onClick} className={`primary-button w-full ${disabled && 'opacity-50'} ${style}`}><span className="font-[900] leading-[2rem] text-[1.6rem] italic text-white uppercase">{title}</span></button></div>
}