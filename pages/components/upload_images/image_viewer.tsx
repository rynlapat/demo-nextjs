import React from "react";

interface ImageViewerProps {
  selectedImage: string | null;
  onCancelClick: () => void;
}

function ImageViewer({ selectedImage, onCancelClick }: ImageViewerProps) {
  return (
    <div className="flex item-center h-64 px-6 ">
      {selectedImage && (
        <div className="relative w-[350px] h-[250px]">
          <img className="mt-2 rounded-sm object-contain object-center w-full h-full" src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
