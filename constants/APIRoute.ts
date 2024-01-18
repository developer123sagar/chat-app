
// socket part
export const SOCKET_ADD_USER = "add-user"
export const SOCKET_GET_USER = "get-users"
export const SOCKET_SEND_MESSAGE = "send-message"

// api routes
const AUTH_ROUTE = "api/user";
const MSG_ROUTE = "api/message"

export const GET_USER_INFO = `${AUTH_ROUTE}/userInfo`;
export const GET_CONTACT_LIST = `${AUTH_ROUTE}/all`;
export const POST_SIGNIN = `${AUTH_ROUTE}/signin`;
export const POST_SIGNUP = `${AUTH_ROUTE}/signup`;

export const SEND_MESSAGE = `${MSG_ROUTE}/send-message`
export const GET_MESSAGE = `${MSG_ROUTE}/get-message`
