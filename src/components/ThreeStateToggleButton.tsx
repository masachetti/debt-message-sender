import React, { useState } from "react";

const circlePosition = ["translate-x-0.5", "translate-x-6", "translate-x-11"];
const borderColors = ["border-red-600", "border-black", "border-blue-600"];
const circleColors = ["bg-red-600", "bg-black", "bg-blue-600"];

interface ThreeStateToggleButtonProps {
  className?: string
  onStateChange: (currState: number, prevState: number) => void;
}

const ThreeStateToggleButton = ({
  onStateChange,
  className = ""
}: ThreeStateToggleButtonProps) => {
  const [buttonState, setButtonState] = useState(0);

  function handleClick(clickPosition: number) {
    let prev = buttonState;
    if (clickPosition === buttonState) {
      setButtonState(0);
      onStateChange(0, prev);
      return;
    }
    setButtonState(clickPosition);
    onStateChange(clickPosition, prev);
  }

  return (
    <>
      <div
        className={
          "flex justify-between relative rounded-3xl border w-16 " +
          borderColors[buttonState + 1] +
          " " +
          className
        }
      >
        <div
          className="w-5 h-5 cursor-pointer z-10"
          onClick={() => handleClick(-1)}
        ></div>
        <div
          className="w-5 h-5 cursor-pointer z-10"
          onClick={() => handleClick(0)}
        ></div>
        <div
          className="w-5 h-5 cursor-pointer z-10"
          onClick={() => handleClick(1)}
        ></div>
        <div className="absolute flex justify-center flex-col w-full h-full">
          <div
            className={
              "relative rounded-full w-4 h-4 z-0 transition-all " +
              circlePosition[buttonState + 1] +
              " " +
              circleColors[buttonState + 1]
            }
          ></div>
        </div>
      </div>
    </>
  );
};

export default ThreeStateToggleButton;
