//custom hook to fetch pinned messages

import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';

function usePinnedMessages(roomId) {
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(endpoints?.GET_PINNED_MESSAGES + `?roomId=${roomId}`)
        .then(resp => setPinnedMessages(resp?.data?.messages))
        .catch(err => setError("Error fetching pinned messages"))
        .finally(() => setLoading(false));
    }, [roomId]);

    return { pinnedMessages, loading, error }
}

export default usePinnedMessages