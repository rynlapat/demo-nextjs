import { useUser } from "@auth0/nextjs-auth0/client";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { EditDialog } from "../dialogs/edit_dialog";
import { parseISO, format } from "date-fns";
import { DialogComfirmDeleteUser } from "../dialogs/dialog_confirm_delete_user";
import { handlerAPI } from "@/services/handlerAPI";

interface WriteType {
    id: number;
    text: string;
    username: string;
    date: string;
    image: string;
    userIdAuth: string;
}

export function CardContentSpecific(props: { writes: WriteType[] }) {
    const [postDescription, setPostDescription] = useState<WriteType[]>([]);
    const { user } = useUser();
    const userAuthId: string | null = user?.sub ?? null;

    useEffect(() => {
        const getData = async () => {
            if (userAuthId) {
                try {
                    const response = await handlerAPI.getSpecificPost(userAuthId);
                    const data = response.data;

                    console.log("API Response:", data);

                    const descriptions: WriteType[] = data.map((item: any, index: number) => {
                        const parsedDateTime = parseISO(item.created_at);
                        const formattedDateTime = format(parsedDateTime, "dd/MM/yyyy HH:mm:ss");

                        const data: WriteType = {
                            id: item.id,
                            text: item.post_description,
                            username: item.auth_zero_user_fullname,
                            date: formattedDateTime,
                            image: item.post_image_url,
                            userIdAuth: item.auth_zero_user_id,
                        };

                        return data;
                    });

                    setPostDescription(descriptions);
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        };

        getData();
    }, [userAuthId]);

    return (
        <div className="flex items-center justify-center flex-col-reverse mb-20 ">
            {postDescription.map((item, index) => {
                return (
                    <Card key={index} className="mt-20 w-96 phone:w-80 bg-grey">
                        {item.image === "" ? (
                            <div></div>
                        ) : (
                            <CardHeader color="blue-gray" className="relative h-68 mt-5">
                                <img src={item.image} alt="card-image" />
                            </CardHeader>
                        )}

                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                {item.username}
                            </Typography>
                            <Typography>{item.text}</Typography>
                            {/* <p>{postDescription.id}</p> */}
                        </CardBody>
                        <CardFooter className="pt-0 flex row">
                            <EditDialog text={item.text} id={item.id} image={item.image} />
                            <DialogComfirmDeleteUser userId={item.id} userName={item.userIdAuth} />
                        </CardFooter>
                        <Typography className="text-right mr-2 mb-1">date: {item.date}</Typography>
                    </Card>
                );
            })}
        </div>
    );
}
