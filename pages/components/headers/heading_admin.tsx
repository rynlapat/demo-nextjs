import { UserIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { ButtonLogout } from "../buttons/button_logout";
import { DialogPost } from "../dialogs/dialog_post";
import { Button } from "@material-tailwind/react";
import React from "react";

function HeadingAdmin(props: {
    writes: { id: number; text: string }[];
    setWrites: React.Dispatch<React.SetStateAction<{ id: number; text: string }[]>>;
    showComponent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { showComponent } = props;
    const [isAdminPage, setIsAdminPage] = useState(false);

    const toggleComponent = () => {
        showComponent((prev: boolean) => !prev);
        setIsAdminPage((prev) => !prev);
    };

    return (
        <div className="min-w-full flex items-center justify-between bg-red-100">
            <div className="min-w-0 flex-1 px-6 py-4 hidden md:block ">
                <h2 className="text-2xl font-bold text-gray-900 ">{isAdminPage ? "GPM Social Network (Admin Page)" : "GPM Social Network"}</h2>
            </div>
            <div className="flex mr-4 phone:mr-0">
                <Button className="flex flex-row mr-3 phone:mr-3" onClick={toggleComponent}>
                    <UserIcon className="mr-0.5 h-3.5 w-5 text-gray-400" aria-hidden="true" />
                    {isAdminPage ? "USER PAGE" : "ADMIN PAGE"}
                </Button>

                <div className="flex flex-row phone:justify-end space-x-3">
                    <DialogPost />
                    <ButtonLogout />
                </div>
            </div>
        </div>
    );
}

export default HeadingAdmin;
