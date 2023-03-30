import * as React from "react";

const ArrowSortIcon = ({
  size = 25,
  strokeWidth = 2,
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
    <path d="M7 5v14" />
    <path d="M17 19V5" />
    <path d="m21 15-4 4-4-4" />
    <path d="m3 9 4-4 4 4" />
  </svg>
);

export default ArrowSortIcon;