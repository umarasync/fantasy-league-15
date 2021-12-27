import getResponsiveValue from "utils/getResponsiveValue";
import PrimaryButton from "components/buttons/primaryButton";

export default  function SelectClubCard({
    pictureBoxHeight,
    image,
    heading,
    subHeading,
    containerStyle,
    bgImage,
    itemsCenter,
    boxPaddingTop,
     controls
}) {

    const getResponsiveMeasure = (value, measurement = '') => {
        return getResponsiveValue(pictureBoxHeight, value, measurement)
    }

    return <div className={`flex ${ itemsCenter && 'items-center'} relative ${containerStyle}`}>
        <div
            className={`flex absolute w-full flex-col items-center`}
            style={{
                paddingTop: boxPaddingTop ? getResponsiveMeasure( boxPaddingTop) : 0
            }}
        >
            <img
                src={`/images/${image.name}`}
                alt=""
                className="text-center"
                width={`${getResponsiveMeasure(image.width)}`}
                height={`${getResponsiveMeasure(image.height)}`}
            />
            <p className={`uppercase italic text-white text-[2rem] font-[800] ${heading.color}`}
               style={{
                   fontSize: getResponsiveMeasure(heading.text),
                   paddingTop: getResponsiveMeasure(heading.pt),
                   lineHeight: getResponsiveMeasure(heading.leading, 'px')
               }}
            >{heading.title}</p>
            <p
                className={`${subHeading.color} text-[1.4rem] normal`}
                style={{
                    fontSize: getResponsiveMeasure(subHeading.text),
                    marginTop: subHeading.mt < 0 ? subHeading.mt : getResponsiveMeasure(subHeading.mt),
                    lineHeight: getResponsiveMeasure(subHeading.leading, 'px')
                }}
            >{subHeading.title}</p>

        </div>
        {
            controls && (
                <div className="flex absolute px-[5rem] justify-center w-[100%] flex-col items-center"
                     style={{
                         height: getResponsiveMeasure(controls.buttonHeight),
                         top: getResponsiveMeasure(controls.top)
                     }}
                >
                    <PrimaryButton title={'select'} style={{
                        marginBottom: getResponsiveMeasure(controls.mb)
                    }} />
                    <div className="flex justify-center">
                        <img src="/images/left_arrow_select_club.png" alt="" className="mr-[1rem]"
                             width={getResponsiveMeasure(controls.icon.width)} height={getResponsiveMeasure(controls.icon.height)}/>
                        <img src="/images/right_arrow_select_club.png" alt=""
                             className="ml-[1rem]"
                             width={getResponsiveMeasure(controls.icon.width)} height={getResponsiveMeasure(controls.icon.height)}/>
                        />
                    </div>
                </div>
            )
        }
        <img
            src={`/images/${bgImage}`}
            alt=""
            className="w-[100%]"
        />
    </div>
}