import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Heading from "./components/headers/heading";
import Home from "./home";

function index() {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    if (user) {
        console.log(user);

        console.log(user["roles/roles"]);
        console.log(user.sub);
    }
    return (
        <>
            {user ? (
                <>
                    <Heading />
                </>
            ) : (
                <>
                    <Home />
                </>
            )}
        </>
    );
}
export default index;
