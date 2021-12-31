import R from "utils/getResponsiveValue";

export default function PrimaryButtonSmall({
    title,
    style,
    classes,
    onClick = () => false
}){
    return(
        <p className={`inline primary-button-color inline items-center justify-center text-white cursor-pointer ${classes}`}
           style={{
               paddingLeft: R(10),
               paddingTop: R(5),
               paddingBottom: R(5),
               paddingRight: R(10),
               marginTop: R(5),
               borderRadius: R(50),
               fontSize: R(10),
               ...style
           }}
           onClick={onClick}
        >
            {title}
        </p>
    )
}