import { headerGet, headersPost, sdkAuthRequest, sdkNoAuthRequest } from "..";
import { API_OFFICE_BRANCHES, API_OFFICE_HOLDERS } from "../../../environments/environment";
import { postImageToCloudinary } from "../cloudinary";


export const createOfficeBranchInfra = async ({
    name,
    description,
    phone,
    image,
    province,
    city,
    street,
    zipCode
}, userId) => {
    try {
        const imageData = await postImageToCloudinary(image)
        const officeBranch = await sdkAuthRequest(
            `${API_OFFICE_HOLDERS}/${userId}/office_branches/`,
            {
                method: 'POST',
                headers: headersPost,
                body: JSON.stringify({
                    name,
                    description,
                    phone,
                    province,
                    city,
                    street,
                    zipCode,
                    imagesUrls: [imageData.public_id],
                })
            }
        );
        return Promise.resolve(officeBranch.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }

}

export const editOfficeBranchInfra = async ({
    name,
    description,
    phone,
    image,
    province,
    city,
    street,
    zipCode
}, officeBranchId) => {
    try {
        let imageData = null
        if (image !== null)
            imageData = await postImageToCloudinary(image)
        const officeBranch = await sdkAuthRequest(
            `${API_OFFICE_BRANCHES}/${officeBranchId}/`,
            {
                method: 'PUT',
                headers: headersPost,
                body: JSON.stringify({
                    name,
                    description,
                    phone,
                    province,
                    city,
                    street,
                    zipCode,
                    imagesUrls: imageData === null ? null : [imageData.public_id],
                })
            }
        );
        return Promise.resolve(officeBranch.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getOfficeBranchesInfra = async (userId) => {
    try {
        const officesBranch = await sdkNoAuthRequest(
            `${API_OFFICE_HOLDERS}/${userId}/office_branches/`,
            {
                method: 'GET',
                headers: headerGet
            }
        )
        return Promise.resolve(officesBranch.data)
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}
export const deleteOfficeBranchInfra = async (id) => {
    try {
        const officesBranches = await sdkAuthRequest(
            `${API_OFFICE_BRANCHES}/${id}/`,
            {
                method: 'DELETE',
                headers: headerGet
            }
        )
        return Promise.resolve(officesBranches);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getOfficeBranchesFromCollaborator = async collaboratorEmail => {
    try {
        const officesBranches = await sdkAuthRequest(
            `${API_OFFICE_BRANCHES}/?collaborator_email=${collaboratorEmail}`,
            {
                method: 'GET',
                headers: headerGet
            }
        )
        return Promise.resolve(officesBranches.data)
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }
}

export const getOfficeBranchInfra = async (officeBranchId) => {
    try {
        const officeBranch = await sdkNoAuthRequest(
            `${API_OFFICE_BRANCHES}/${officeBranchId}/`,
            {
                method: 'GET',
                headers: headerGet
            }
        )
        return Promise.resolve(officeBranch.data);
    } catch (error) {
        return Promise.reject(error.errors[0]);
    }

}