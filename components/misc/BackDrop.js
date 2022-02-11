// Components
import Animated from "components/animation/Animated";

export default function BackDrop({
    show,
    children,
    animationSpeed
 }) {
    return (
        <Animated toggleAnimation={show} animationSpeed={animationSpeed}>
            <div
                className={`
                    ${!show && "hidden"} fixed z-1 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`
                }
            >
                {children}
            </div>
        </Animated>

    )
}