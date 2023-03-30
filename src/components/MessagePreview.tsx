import React from "react";
import XIcon from "./icons/X";

interface MessagePreviewProps {
  message: string;
  onClose: () => void;
}

const MessagePreview = ({ message, onClose }: MessagePreviewProps) => {
  console.log(message)
  return (
    <div className="absolute top-0 left-0 z-50 bg-stone-500 bg-opacity-50 w-screen h-screen flex justify-center">
      <div className="relative w-2/4 h-2/4 bg-slate-600 border-2 rounded-lg flex flex-col mt-40 p-2">
        <div onClick={onClose} className="cursor-pointer self-end" >
          <XIcon size={40}/>
        </div>
        <p className="overflow-y-scroll overflow-x-clip whitespace-pre-line bg-gray-200 m-3 p-2 border-2 rounded-md">{message}</p>
      </div>
    </div>
  );
};

export default MessagePreview;
