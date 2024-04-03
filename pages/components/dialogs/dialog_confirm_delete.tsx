import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Spinner } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
import { handlerAPI } from "@/services/handlerAPI";

interface DialogComfirmDeleteProps {
    id: number;
}

export function DialogComfirmDelete({ id }: DialogComfirmDeleteProps) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSpinner, setShowSpinner] = useState(false);

    const handleDelete = async (id: number) => {
        setIsSubmitting(true);
        setShowSpinner(true);

        setTimeout(() => {
            setShowSpinner(false);
            handleClose();
        }, 3000);
        try {
            await handlerAPI.deletePostByAdmin(id);

            console.log("Item deleted successfully");
            await handleClose();

            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Your post has been deleted",
                showConfirmButton: false,
                timer: 1500,
            });
            window.location.reload();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setIsSubmitting(false);
        setShowSpinner(false);
    };

    return (
        <>
            <Button className="flex row bg-red-400" onClick={handleOpen}>
                <TrashIcon className="h-3.5 w-5 text-gray-400" aria-hidden="true" />
                Delete
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Confirm Delete Post</DialogHeader>
                <DialogBody divider>If you press the "CONFIRM" button, your post will be deleted.</DialogBody>

                <DialogFooter>
                    {isSubmitting && showSpinner ? (
                        <Spinner />
                    ) : (
                        <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                            <span>Cancel</span>
                        </Button>
                    )}
                    <Button variant="gradient" color="green" onClick={() => handleDelete(id)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
