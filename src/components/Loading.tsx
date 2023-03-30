import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  size?: number;
  circleWidth?: number;
}

const Loading: React.FC<LoadingProps> = ({ size = 3, circleWidth = 0.5 }) => {
  return (
    <div
      className="relative"
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
    >
      <motion.span
        className="block w-full h-full border-zinc-300 border-t-sky-600 rounded-[50%]"
        style={{
          borderWidth: `${circleWidth}rem`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Loading;
