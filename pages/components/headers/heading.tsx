import { useUser } from "@auth0/nextjs-auth0/client";
import HeadingAdmin from "./heading_admin";
import HeadingUser from "./heading_user";
import React, { useState } from "react";
import { CardContent } from "../cards/card_content";
import { CardContentSpecific } from "../cards/card_content_specific";

interface WriteType {
    id: number;
    text: string;
}

function Heading() {
    const { user } = useUser();
    const [writes, setWrites] = React.useState<WriteType[]>([]);
    const [isComponentVisible, setComponentVisible] = useState(false);

    if (user) {
        if (user["roles/roles"] == "admin") {
            return (
                <>
                    <HeadingAdmin writes={writes} setWrites={setWrites} showComponent={setComponentVisible} />
                    {isComponentVisible ? <CardContent writes={[]} /> : <CardContentSpecific writes={[]} />}
                </>
            );
        } else
            return (
                <>
                    <HeadingUser writes={writes} setWrites={setWrites} />
                    <CardContentSpecific writes={[]} />
                </>
            );
    }
}
export default Heading;
