import React, { useState } from "react";


const TopOptions = ({ showOption, setShowOption }) => {
    const [clickedButton, setClickedButton] = useState(0);
    const [isShowing, setIsShowing] = useState(false);

    const buttons = ["DELIVERY", "TAKEAWAY", "DINE IN"];
    const leftOffsets = ["left-0", "left-1/3", "left-2/3"];

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col px-4">
                    <p className="text-xxs pl-6 pt-4">PUNE</p>
                </div>

                <div className="relative bg-gray-100 my-5 text-center flex flex-row items-center justify-evenly text-sm rounded-md mx-4">
                    <div
                        className={
                            "w-1/3 top-0 absolute h-full bg-blue-500 rounded-md shadow-xl duration-500 transition-all " +
                            leftOffsets[clickedButton]
                        }
                    />

                    {buttons.map((btn, index) => (
                        <button
                            className={
                                "w-full py-3 font-bold text-sm relative z-1 " +
                                (clickedButton === index ? "text-white" : "text-gray-600")
                            }
                            onClick={() => {
                                setClickedButton(index);
                                setIsShowing(!isShowing);
                            }}
                            key={index}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TopOptions;