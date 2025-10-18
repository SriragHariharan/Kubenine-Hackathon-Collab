const endpoints = {
    LOGIN: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/users.register',
    SIGNUP: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/signup',

    CREATE_NEW_TEAM: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/teams.create',
    
    // channel endpoints
    CREATE_NEW_CHANNEL: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.create',
    GET_ALL_CHANNELS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.list.joined',
    CHANNEL_MEMBERS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.members',
    ONLINE_MEMBERS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.online',

    GET_ALL_USERS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/users.list',

    //message endpoints
    SEND_MESSAGE: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/chat.postMessage',
}

export default endpoints;