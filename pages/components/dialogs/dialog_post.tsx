import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, Textarea, Spinner } from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import ImageUploadButton from "../upload_images/image_upload_button";
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from "sweetalert2";
import { handlerAPI } from "@/services/handlerAPI";

export function DialogPost() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const [write, setWrite] = React.useState<string>("");

    const [file, setFile] = useState<File | null>(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSpinner, setShowSpinner] = useState(false);

    const { user } = useUser();
    const userAuthId = user?.sub;
    const userName = user?.name;
    const createdBy = user?.name;

    const handleFormSubmit = async (e: any) => {
        console.log("here");

        e.preventDefault();
        setIsSubmitting(true);
        setShowSpinner(true);

        setTimeout(() => {
            setShowSpinner(false);
            handleClose();
        }, 3000);

        if (write !== "") {
            if (!file) {
                const postData = {
                    post_description: write,
                    post_image_url: "",
                    auth_zero_user_id: userAuthId,
                    auth_zero_user_fullname: userName,
                    created_by: createdBy,
                };
                await handlerAPI
                    .createPost(postData)
                    .then(async (response) => {
                        if (response.status === 201) {
                            console.log("Post created successfully");

                            await handleClose();

                            await Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your post has been created",
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
            } else {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "xql0avrx");
                try {
                    const responseImage = await handlerAPI.uploadImageToCloudinary(formData);

                    const postData = {
                        post_description: write,
                        post_image_url: responseImage,
                        auth_zero_user_id: userAuthId,
                        auth_zero_user_fullname: userName,
                        created_by: createdBy,
                    };

                    await handlerAPI
                        .createPost(postData)
                        .then(async (response) => {
                            if (response.status === 201) {
                                console.log("Post created successfully");

                                await handleClose();

                                await Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Your post has been created",
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

    const handleClose = () => {
        setOpen(false);
        setFile(null);
        setWrite("");
        setIsButtonDisabled(true);
        setIsSubmitting(false);
        setShowSpinner(false);
    };

    const handleImageChange = (file: File) => {
        setFile(file);
        console.log("Selected image:", file);
    };

    return (
        <>
            <Button onClick={handleOpen} className="flex flex-row ">
                <PencilSquareIcon className="-ml-0.5 mr-1.5 h-3.5 w-5 text-gray-400" aria-hidden="true" />
                Post
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Post</DialogHeader>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-5 w-5" onClick={handleOpen}>
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
                            label="Write Something"
                            onChange={(e) => {
                                setWrite(e.target.value);
                                setIsButtonDisabled(e.target.value.length === 0);
                            }}
                            maxLength={150}
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        {isSubmitting && showSpinner ? (
                            <Spinner />
                        ) : (
                            <Button variant="gradient" color="green" onClick={handleFormSubmit} className={` ${isButtonDisabled ? "cursor-not-allowed bg-gray-300" : ""}`} disabled={isButtonDisabled}>
                                post
                            </Button>
                        )}
                    </div>
                </DialogBody>

                <div className="flex justify-center mt-4 mb-4">
                    <ImageUploadButton onChange={handleImageChange} />
                </div>
            </Dialog>
        </>
    );
}
