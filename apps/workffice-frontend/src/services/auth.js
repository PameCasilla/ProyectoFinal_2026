// import {
//   HTTP_METHODS,
//   AUTH_CREATE_URL,
//   AUTH_LOGIN_URL,
//   AUTH_LOGOUT_URL,
// } from '../api/Constants';
// import callApi from './index';
// import { getOneErrors } from '../utils/index';

// export async function create(body) {
//   try {
//     const response = await callApi(HTTP_METHODS.POST, AUTH_CREATE_URL, body);
//     return response && response.data;
//   } catch ({ response }) {
//     const responseError = response && response.data;
//     const error =
//       responseError && responseError.errors
//         ? getOneErrors(responseError.errors)
//         : responseError;
//     throw new Error(error.message || error.name || error);
//   }
// }

// export async function userLogin(body) {
//   try {
//     const response = await callApi(HTTP_METHODS.POST, AUTH_LOGIN_URL, body);
//     return response && response.data;
//   } catch ({ response }) {
//     const responseError = response && response.data;
//     const error =
//       responseError && responseError.errors
//         ? getOneErrors(responseError.errors)
//         : responseError;
//     throw new Error(error.message || error.name || error);
//   }
// }

// //   export async function changePassword(body) {
// //     const response = await callApi(HTTP_METHODS.POST, AUTH_CHANGE_PASSWORD_URL, body);
// //     return response && response.data;
// //     // try {
// //     //   const response = await callApi(HTTP_METHODS.POST, AUTH_CHANGE_PASSWORD_URL, body);
// //     //   return response && response.data;
// //     // } catch (error) {
// //     //   return error;
// //     //   const responseError = response && response.data;
// //     //   const error = responseError && responseError.errors
// //     //     ? getOneErrors(responseError.errors) : responseError;
// //     //   throw new Error(error.message || error.name || error);
// //     // }
// //   }

// //   export async function recoverPassword(body) {
// //     try {
// //       const response = await callApi(HTTP_METHODS.POST, AUTH_RECOVER_PASSWORD_URL, body);
// //       return response && response.data;
// //     } catch ({ response }) {
// //       const responseError = response && response.data;
// //       const error = responseError && responseError.errors
// //         ? getOneErrors(responseError.errors) : responseError;
// //       throw new Error(error.message || error.name || error);
// //     }
// //   }

// export async function logout() {
//   try {
//     const response = await callApi(HTTP_METHODS.DELETE, AUTH_LOGOUT_URL);
//     return response && response.data;
//   } catch ({ response }) {
//     const responseError = response && response.data;
//     const error =
//       responseError && responseError.errors
//         ? getOneErrors(responseError.errors)
//         : responseError;
//     throw new Error(error.message || error.name || error);
//   }
// }
