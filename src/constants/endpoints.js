const endpoints = {
    // auth endpoints
    LOGIN: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/users.register',
    SIGNUP: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/signup',

    //user endpoints 
    GET_USER_DETAILS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/users.info',

    // team endpoints
    CREATE_NEW_TEAM: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/teams.create',
    
    // channel endpoints
    CREATE_NEW_CHANNEL: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.create',
    GET_ALL_CHANNELS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.list.joined',
    CHANNEL_MEMBERS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.members',
    ONLINE_MEMBERS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.online',
    ADD_USER_TO_GROUP: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.invite',
    REMOVE_USER_FROM_GROUP: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/channels.kick',

    GET_ALL_USERS: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/users.list',


    //message endpoints
    SEND_MESSAGE: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/chat.postMessage',
    PIN_MESSAGE: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/chat.pinMessage',
    UNPIN_MESSAGE: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/chat.unPinMessage',
    GET_PINNED_MESSAGES: import.meta.env.VITE_API_SERVER_BASE_URL + '/api/v1/chat.getPinnedMessages',
}

export default endpoints;