import * as React from "react";

const CheckIcon = ({ size = 18, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m10.585 13.415-2.828-2.829L6.343 12l4.242 4.243 7.071-7.071-1.414-1.414-5.657 5.657Z" />
  </svg>
);

export default CheckIcon;
