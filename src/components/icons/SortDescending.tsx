import * as React from "react";

const SortDescendingIcon = ({
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
    <path d="M4 6h9" />
    <path d="M4 12h7" />
    <path d="M4 18h7" />
    <path d="m15 15 3 3 3-3" />
    <path d="M18 6v12" />
  </svg>
);

export default SortDescendingIcon;