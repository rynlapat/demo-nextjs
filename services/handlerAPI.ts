import { getToken } from "@/pages/utils/tokenUtils";
import axios from "axios";

export const handlerAPI = {
    getAllPost: async () => {
        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get("http://localhost:5007/api/UsersDB/", { headers });

        return response;
    },
    getSpecificPost: async (userAuthId: string) => {
        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`http://localhost:5007/api/UsersDB/follownamebyauth?auth=${userAuthId}`, { headers });

        return response;
    },
    createPost: async (postData: object) => {
        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.post("http://localhost:5007/api/UsersDB/", postData, { headers });

        return response;
    },
    uploadImageToCloudinary: async (formData: FormData) => {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dn0u6xahi/image/upload", formData);

        return response.data.secure_url;
    },
    editPost: async (id: number, postData: object) => {
        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.put(`http://localhost:5007/api/UsersDB/${id}`, postData, { headers });

        return response;
    },
    deletePostByAdmin: async (id: number) => {
        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.delete(`http://localhost:5007/api/UsersDB/${id}`, { headers });

        return response;
    },
    deletePostByUser: async (userId: number, userName: string) => {
        const token = await getToken();

        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.delete(`http://localhost:5007/api/UsersDB/${userId}/userName?userName=${userName}`, { headers });

        return response;
    },
};
