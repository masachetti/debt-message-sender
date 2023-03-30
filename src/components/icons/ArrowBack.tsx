import * as React from "react";

const ArrowBackIcon = ({
  size = 46,
  strokeWidth = 1.5,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.438 18.75 4.688 12l6.75-6.75" />
    <path d="M5.625 12h13.688" />
  </svg>
);

export default ArrowBackIcon;
