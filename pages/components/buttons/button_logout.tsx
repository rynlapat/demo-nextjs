import { useUser } from "@auth0/nextjs-auth0/client";
import { ArrowRightOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuHandler, MenuList, MenuItem, Button } from "@material-tailwind/react";

export function ButtonLogout() {
    const { user } = useUser();

    if (user) {
        if (user["roles/roles"] == "admin") {
            return (
                <Menu>
                    <MenuHandler>
                        <Button className="flex flex-row ">
                            {user.nickname}
                            <ChevronDownIcon className="-mr-2 h-4 w-5 text-gray-400" aria-hidden="true" />
                        </Button>
                    </MenuHandler>
                    <MenuList>
                        <a href="/api/auth/logout">
                            <MenuItem className="flex flex-row ">
                                <ArrowRightOnRectangleIcon className="mr-0.5 h-4 w-5 text-gray-400" aria-hidden="true" />
                                Log out
                            </MenuItem>
                        </a>
                    </MenuList>
                </Menu>
            );
        } else {
            return (
                <Menu>
                    <MenuHandler>
                        <Button className="flex flex-row">
                            {user.nickname}
                            <ChevronDownIcon className="-mr-2 h-4 w-5 text-gray-400" aria-hidden="true" />
                        </Button>
                    </MenuHandler>
                    <MenuList>
                        <a href="/api/auth/logout">
                            <MenuItem className="flex flex-row ">
                                <ArrowRightOnRectangleIcon className="mr-0.5 h-4 w-5 text-gray-400" aria-hidden="true" />
                                Log out
                            </MenuItem>
                        </a>
                    </MenuList>
                </Menu>
            );
        }
    }
}
