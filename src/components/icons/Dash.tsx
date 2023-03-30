import * as React from "react";

const DashIcon = ({ size = 46, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.2 11.88a.6.6 0 0 1 .6-.6h8.4a.6.6 0 1 1 0 1.2H7.8a.6.6 0 0 1-.6-.6Z" />
  </svg>
);

export default DashIcon;