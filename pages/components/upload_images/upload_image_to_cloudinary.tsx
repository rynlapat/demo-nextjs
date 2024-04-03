import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [filename, setFilename] = useState<string>("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            setFilename(selectedFile.name);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!file) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "xql0avrx");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dn0u6xahi/image/upload", formData);
            console.log(response);
            console.log(response.data.secure_url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="file" onChange={handleFileChange} />
                <label>{filename}</label>
            </div>
            <button type="submit">Upload</button>
        </form>
    );
};

export default UploadForm;
