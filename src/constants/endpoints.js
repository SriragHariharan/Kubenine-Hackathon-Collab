const endpoints = {
    LOGIN: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/users.register',
    SIGNUP: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/signup',
}

export default endpoints;