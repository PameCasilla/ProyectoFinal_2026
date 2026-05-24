import { headerGet, headersPost, sdkAuthRequest } from "..";
import { API_AUTH_URL } from "../../../environments/environment";
import { postImageToCloudinary } from "../cloudinary";
import { USER_TYPE, writeToLocalStorage } from "../localStorage";

export const getMe = async () => {
    try {
        const userData = await sdkAuthRequest(`${API_AUTH_URL}/me/`,
            {
                method: 'GET',
                headers: headerGet
            });
            writeToLocalStorage(userData.data.userType, USER_TYPE);
        return Promise.resolve(userData.data);
    } catch (error) {
        throw Promise.reject(error.errors[0]);
    }

}

export const updateUser = async (userId, userData) => {
    try {
        let profileImageUrl = null
        if (userData.imageData)
            profileImageUrl = await postImageToCloudinary(userData.imageData)
        const userUpdated = await sdkAuthRequest(`${API_AUTH_URL}/${userId}/`,
            {
                method: 'PUT',
                headers: headersPost,
                body: profileImageUrl ? JSON.stringify({ ...userData, profileImage: profileImageUrl.public_id }) : JSON.stringify(userData),
            });
        return Promise.resolve(userUpdated)
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }

}