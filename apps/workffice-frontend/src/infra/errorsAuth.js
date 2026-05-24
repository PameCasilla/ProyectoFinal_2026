
export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const INVALID_PASSWORD = 'INVALID_PASSWORD';
export const NON_ACTIVE_USER = 'NON_ACTIVE_USER';
export const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';
export const TOKEN_ALREADY_USED = 'TOKEN_ALREADY_USED';

export const USER_NOT_FOUND_RESPONSE = 'El correo no está registrado. Registrate!';
export const INVALID_PASSWORD_RESPONSE = 'Usuario o contraseña incorrecta';
export const NON_ACTIVE_USER_RESPONSE = 'Aún no has activado tu usuario';
export const USER_ALREADY_EXISTS_RESPONSE = 'El usuario ya está registrado';
export const TOKEN_ALREADY_USED_RESPONSE = 'El link ya expiró, solicite nuevamente la restauración';

export const customizedErrorAuth = (type) => {
    switch (type) {
        case USER_NOT_FOUND:
            return USER_NOT_FOUND_RESPONSE
        case INVALID_PASSWORD:
            return INVALID_PASSWORD_RESPONSE
        case NON_ACTIVE_USER:
            return NON_ACTIVE_USER_RESPONSE
        case USER_ALREADY_EXISTS:
            return USER_ALREADY_EXISTS_RESPONSE
        case TOKEN_ALREADY_USED:
            return TOKEN_ALREADY_USED_RESPONSE
        default:
            return 'Oops algo salio mal'
    }
}