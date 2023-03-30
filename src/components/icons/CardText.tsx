import * as React from "react";

const CardTextIcon = ({ size = 46, color = "currentColor", ...props }) => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.8 6a.6.6 0 0 1 .6.6v10.8a.6.6 0 0 1-.6.6H4.2a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h15.6ZM4.2 4.8a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h15.6a1.8 1.8 0 0 0 1.8-1.8V6.6a1.8 1.8 0 0 0-1.8-1.8H4.2Z" />
    <path d="M6 9a.6.6 0 0 1 .6-.6h10.8a.6.6 0 1 1 0 1.2H6.6A.6.6 0 0 1 6 9Zm0 3a.6.6 0 0 1 .6-.6h10.8a.6.6 0 1 1 0 1.2H6.6A.6.6 0 0 1 6 12Zm0 3a.6.6 0 0 1 .6-.6h7.2a.6.6 0 1 1 0 1.2H6.6A.6.6 0 0 1 6 15Z" />
  </svg>
);

export default CardTextIcon;