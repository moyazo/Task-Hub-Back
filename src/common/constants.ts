const PORTBACKEND = 8000;
const URLFRONTEND = 'http://localhost:3000';
const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INVALID_ACTION = 403;
const UNAUTHORIZED = 401;
const CREATED = 201;
const OK = 200;
const NOT_AUTHORIZED_MESSAGE = 'You are not authorized';
const INVALID_REQUEST_BODY = 'Invalid request body';
const FAIL_TO_CREATE = 'Fail to create';
const FAIL_TO_MODIFY = 'Fail to modify';
const FAIL_TO_REMOVE = 'Fail to remove';
const SUCCESS_TO_CREATE = 'Created successfully';
const SUCCESS_TO_MODIFY = 'Modified successfully';
const SUCCESS_TO_REMOVE = 'Removed successfully';
const LOGIN_SUCCESS = 'Login successful';
const UNAUTHENTICATED = 'Unauthenticated: No token provided';
const INVALID_TOKEN = 'Invalid token';
const TOKEN_EXPIRED = 'Token has expired';
const NOT_FOUND_MESSAGE = 'Not found';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';
const PUBLIC_ROUTES = ['/auth'];

export {
    PUBLIC_ROUTES,
    PORTBACKEND,
    URLFRONTEND,
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,
    CREATED,
    OK,
    INVALID_REQUEST_BODY,
    FAIL_TO_CREATE,
    SUCCESS_TO_CREATE,
    LOGIN_SUCCESS,
    NOT_FOUND_MESSAGE,
    INTERNAL_SERVER_ERROR_MESSAGE,
    FAIL_TO_MODIFY,
    SUCCESS_TO_MODIFY,
    FAIL_TO_REMOVE,
    SUCCESS_TO_REMOVE,
    NOT_AUTHORIZED_MESSAGE,
    INVALID_ACTION,
    UNAUTHENTICATED,
    INVALID_TOKEN,
    TOKEN_EXPIRED,
};
