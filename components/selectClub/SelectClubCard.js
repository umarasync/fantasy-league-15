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
     controls
}) {

    return <div className={`flex ${ itemsCenter && 'items-center'} relative ${containerStyle}`}>
        <div
            className={`flex absolute w-full flex-col items-center`}
            style={{
                paddingTop: boxPaddingTop ? R(boxPaddingTop) : 0
            }}
        >
            <img
                src={`/images/${image.name}`}
                alt=""
                className="text-center"
                width={`${R(image.width)}`}
                height={`${R(image.height)}`}
            />
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
        {
            controls && (
                <div className="flex absolute px-[5rem] justify-center w-[100%] flex-col items-center"
                     style={{
                         bottom: R(controls.bottom)
                     }}
                >
                    <PrimaryButton
                        title={'select'}
                        style={{
                        marginBottom: R(controls.mb),
                        height: R(controls.buttonHeight),
                        }}
                        textStyle={{
                            fontSize: R(controls.buttonText.fontSize)
                        }}
                    />
                    <div className="flex justify-center">
                        <img src="/images/left_arrow_select_club.png" alt="" className="mr-[1rem]"
                             width={R(controls.icon.width)} height={R(controls.icon.height)}/>
                        <img src="/images/right_arrow_select_club.png" alt=""
                             className="ml-[1rem]"
                             width={R(controls.icon.width)} height={R(controls.icon.height)}/>
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