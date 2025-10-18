import { useEffect, useState } from 'react';
import useChannelStore from '../zustand/useChannelStore';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';

const useFetchChannels = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const setChannels = useChannelStore((state) => state.setChannels);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance.get(endpoints.GET_ALL_CHANNELS)
      .then((response) => {
        const channels = response?.data?.channels || [];
        setChannels(channels);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch channels:', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setChannels]);

  return { loading, error };
};

export default useFetchChannels;
