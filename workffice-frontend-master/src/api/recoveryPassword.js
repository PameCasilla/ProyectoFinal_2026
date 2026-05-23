import { recoveryPassword } from "../infra/api/authentication"

export const recoveryPasswordAPI = userEmail => {
    return Promise.resolve(recoveryPassword(userEmail));
}

export const resetUserPassAPI = password => {
    return Promise.resolve(resetUserPassAPI(password));
}