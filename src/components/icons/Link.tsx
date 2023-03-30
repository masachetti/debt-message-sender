import * as React from "react";

const LinkIcon = ({
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
    <path d="M10 13.996a3.5 3.5 0 0 0 5 0l4-4a3.536 3.536 0 0 0-5-5l-.5.5" />
    <path d="M14 10.004a3.502 3.502 0 0 0-5 0l-4 4a3.536 3.536 0 0 0 5 5l.5-.5" />
  </svg>
);

export default LinkIcon;