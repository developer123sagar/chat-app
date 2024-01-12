const AUTH_ROUTE = "api/user";
const MSG_ROUTE = "api/message"

export const GET_USER_INFO = `${AUTH_ROUTE}/userInfo`;
export const GET_CONTACT_LIST = `${AUTH_ROUTE}/all`;
export const POST_SIGNIN = `${AUTH_ROUTE}/signin`;
export const POST_SIGNUP = `${AUTH_ROUTE}/signup`;

export const SEND_MESSAGE = `${MSG_ROUTE}/send-message`
export const GET_MESSAGE = `${MSG_ROUTE}/get-message`