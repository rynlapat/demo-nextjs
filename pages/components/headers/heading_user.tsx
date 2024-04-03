import { DialogPost } from "../dialogs/dialog_post";
import { ButtonLogout } from "../buttons/button_logout";

function HeadingUser(props: { writes: { id: number; text: string }[]; setWrites: React.Dispatch<React.SetStateAction<{ id: number; text: string }[]>> }) {
    const { writes, setWrites } = props;
    return (
        <div className="min-w-fit flex items-center justify-between phone:flex phone:items-center phone:justify-between bg-blue-100 ">
            <div className="min-w-0 flex-1 px-6 py-4 ">
                <h2 className="hidden sm:block text-2xl font-bold text-gray-900">GPM Social Network</h2>
            </div>
            <div className="flex mr-4 phone:mr-0 float-right ">
                <div className="mr-2">
                    <DialogPost />
                </div>

                <ButtonLogout></ButtonLogout>
            </div>
        </div>
    );
}

export default HeadingUser;
