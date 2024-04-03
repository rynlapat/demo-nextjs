import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Textarea } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import ImageUploadButton from "../upload_images/image_upload_button";
import Swal from "sweetalert2";
import { getToken } from "../../utils/tokenUtils";
import { handlerAPI } from "@/services/handlerAPI";

interface EditDialogProps {
    text: string;
    id: number;
    image: string;
}

export function EditDialog({ text, id, image }: EditDialogProps) {
    const [open, setOpen] = React.useState(false);

    const [writeEdit, setWriteEdit] = React.useState<string>(text);

    const [file, setFile] = useState<File | null>(null);

    const [showImageEdit, setShowImageEdit] = useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const { user } = useUser();

    const updateBy = user?.name;

    const handleFormSubmitEdit = async (id: number) => {
        if (writeEdit !== "") {
            console.log(file);

            if (!file) {
                const postData = {
                    post_description: writeEdit,
                    post_image_url: image,
                    updated_by: updateBy,
                };
                await handlerAPI
                    .editPost(id, postData)
                    .then(async (response) => {
                        console.log(response.status);

                        if (response.status === 204) {
                            console.log("Post edited successfully");

                            await handleClose();
                            await Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your post has been edited",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            window.location.reload();
                        } else {
                            console.error("Error creating post:", response.statusText);
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
                return;
            } else {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "xql0avrx");
                try {
                    const responseImage = await handlerAPI.uploadImageToCloudinary(formData);

                    const postData = {
                        post_description: writeEdit,
                        post_image_url: responseImage,
                        updated_by: updateBy,
                    };
                    await handlerAPI
                        .editPost(id, postData)
                        .then(async (response) => {
                            console.log(response.status);
                            console.log(postData);

                            if (response.status === 204) {
                                console.log("Post editted successfully");

                                await handleClose();
                                await Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your post has been edited",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                                window.location.reload();
                            } else {
                                console.error("Error creating post:", response.statusText);
                            }
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                } catch (error) {
                    console.error(error);
                }
            }
        }

        handleClose();
    };

    const handleOpen = () => {
        setOpen(!open);
        setShowImageEdit(false);
    };

    const handleClose = () => {
        setFile(null);
        setOpen(false);
        setShowImageEdit(false);
    };

    const handleImageChange = (file: File) => {
        setFile(file);
        console.log("Selected image:", file);
        setShowImageEdit(true);
    };

    return (
        <>
            <Button className="mr-2 flex row" onClick={handleOpen}>
                <PencilIcon className="h-3.5 w-5 text-gray-400" aria-hidden="true" />
                Edit
            </Button>
            <Dialog open={open} handler={handleOpen} className="h-[40rem] overflow-scroll">
                <div className="flex items-center justify-between">
                    <DialogHeader>Edit Post</DialogHeader>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5" onClick={handleClose}>
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Textarea
                            label={"Write Something"}
                            value={writeEdit}
                            onChange={(e) => {
                                setWriteEdit(e.target.value);
                                setIsButtonDisabled(e.target.value.length === 0 || e.target.value === text);
                            }}
                            maxLength={150}
                        />
                    </div>
                    {image === "" ? (
                        <div></div>
                    ) : (
                        <div className="flex item-center h-64 px-6 ">
                            <img src={image} className="mt-2 rounded-sm object-contain object-center w-full h-full" />
                        </div>
                    )}
                </DialogBody>
                <div className="flex justify-center mt-4 mb-4">
                    <ImageUploadButton onChange={handleImageChange} />
                </div>
                <div className="flex justify-center">{showImageEdit ? <div>new image for edit</div> : <div></div>}</div>

                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleClose}>
                        cancel
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={async () => {
                            await handleFormSubmitEdit(id);
                            window.location.reload();
                        }}
                        disabled={isButtonDisabled}>
                        save
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
