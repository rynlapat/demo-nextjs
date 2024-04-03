import { Button } from "@material-tailwind/react";
import React, { useRef, useState, ChangeEvent } from "react";
import ImageViewer from "./image_viewer";

interface ImageUploadButtonProps {
    onChange: (file: File) => void;
}

function ImageUploadButton({ onChange }: ImageUploadButtonProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageViewerVisible, setImageViewerVisible] = useState(false);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setSelectedImage(event.target.result.toString());
                    onChange(file);
                    setImageViewerVisible(true);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleCancel = () => {
        setSelectedImage(null);
        setImageViewerVisible(false);
    };

    return (
        <div className="grid justify-items-center">
            <Button variant="gradient" className="flex items-center gap-3" onClick={() => inputRef.current?.click()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                </svg>
                <input type="file" accept="image/*" ref={inputRef} className="hidden" onChange={handleImageUpload} />
                Upload Files
            </Button>
            {imageViewerVisible && <ImageViewer selectedImage={selectedImage} onCancelClick={handleCancel} />}
        </div>
    );
}

export default ImageUploadButton;
