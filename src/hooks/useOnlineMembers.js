//fetch all the online members

import { useState, useEffect } from 'react';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';

const useOnlineMembers = (channelId) => {
    const [onlineMembers, setOnlineMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axiosInstance.get(endpoints.ONLINE_MEMBERS + `?_id=${channelId}`)
            .then(res => {
                console.log("online membres: ",res?.data);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return { onlineMembers, loading, error };
}

export default useOnlineMembers