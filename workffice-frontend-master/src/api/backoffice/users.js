import { getMe, updateUser } from "../../infra/api/backoffice/users";


export const userMeAPI = async () => {
    const userMe = await getMe();
    return userMe;
}

export const updateUserApi = async (userId, userBody) => {
    return Promise.resolve(updateUser(userId, userBody))
}
