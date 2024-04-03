import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { DialogComfirmDelete } from "../dialogs/dialog_confirm_delete";
import { format, parseISO } from "date-fns";
import { useUser } from "@auth0/nextjs-auth0/client";
import { handlerAPI } from "@/services/handlerAPI";

interface WriteType {
    id: number;
    text: string;
    username: string;
    date: string;
    image: string;
}

export function CardContent(props: { writes: WriteType[] }) {
    const [postDescription, setPostDescription] = useState<WriteType[]>([]);

    const { user } = useUser();

    useEffect(() => {
        const getData = async () => {
            try {
                if (user) {
                    const response = await handlerAPI.getAllPost();

                    const data = response.data;

                    const descriptions: WriteType[] = data.map((item: any, index: number) => {
                        const parsedDateTime = parseISO(item.created_at);
                        const formattedDateTime = format(parsedDateTime, "dd/MM/yyyy HH:mm:ss");
                        const data: WriteType = { id: item.id, text: item.post_description, username: item.auth_zero_user_fullname, date: formattedDateTime, image: item.post_image_url };
                        return data;
                    });

                    setPostDescription(descriptions);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        getData();
    }, []);

    return (
        <div className="flex items-center justify-center flex-col-reverse mb-20">
            {postDescription.map((item, index) => {
                return (
                    <Card key={index} className="mt-20 w-96 bg-grey">
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
                        </CardBody>
                        <CardFooter className="pt-0 flex row">
                            <DialogComfirmDelete id={item.id} />
                        </CardFooter>
                        <Typography className="text-right mr-2 mb-1">date: {item.date}</Typography>
                    </Card>
                );
            })}
        </div>
    );
}
