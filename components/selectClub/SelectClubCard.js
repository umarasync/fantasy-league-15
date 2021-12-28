import R from "utils/getResponsiveValue";
import PrimaryButton from "components/buttons/primaryButton";

export default  function SelectClubCard({
    image,
    heading,
    subHeading,
    containerStyle,
    bgImage,
    itemsCenter,
    boxPaddingTop,
    controls = false
}) {


    const duration = 3

    const fadeInOutAnimation = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: duration,
            },
        },
    };


    return (
        <div
            className={`flex ${ itemsCenter && 'items-center'} relative ${containerStyle}`}
        >
        <div
            className={`flex absolute w-full flex-col items-center`}
            style={{
                paddingTop: boxPaddingTop ? R(boxPaddingTop) : 0
            }}
        >
            <div style={{
                width: R(image.width),
                height: R(image.height)
            }}>
                <img
                    src={`/images/${image.name}`}
                    alt=""
                    className="text-center w-full h-full"
                />
            </div>
            <p className={`uppercase italic text-white text-[2rem] font-[800] ${heading.color}`}
               style={{
                   fontSize: R(heading.text),
                   paddingTop: R(heading.pt),
                   lineHeight: R(heading.leading, 'px')
               }}
            >{heading.title}</p>
            <p
                className={`${subHeading.color} text-[1.4rem] normal`}
                style={{
                    fontSize: R(subHeading.text),
                    marginTop: subHeading.mt < 0 ? subHeading.mt : R(subHeading.mt),
                    lineHeight: R(subHeading.leading, 'px')
                }}
            >{subHeading.title}</p>

        </div>
        <img
            src={`/images/${bgImage}`}
            alt=""
            className="w-[100%]"
        />
    </div>
    )}