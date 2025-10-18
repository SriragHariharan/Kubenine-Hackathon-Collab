import { useState, useEffect } from 'react';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';

function useChannelUsers(channelId) {
  const [channelUsers, setChannelUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!channelId) return;

    setLoading(true);
    setError(null);

    // Replace this with your actual API call
    axiosInstance.get(endpoints.CHANNEL_MEMBERS + `?roomId=${channelId}`)
        .then(res => {
        //   console.log("channle members: ",res?.data?.members)
        setChannelUsers(res?.data?.members); // Assuming data.users is an array
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [channelId]);

  return { channelUsers, loading, error };
}

export default useChannelUsers;
