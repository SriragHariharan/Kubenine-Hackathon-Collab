import { useEffect, useState, useCallback } from 'react';
import { constants } from '../constants/constants';
import axiosInstance from '../axios/axios';

function useMessages(roomId = 'GENERAL', count = 50) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem(constants.AUTH_TOKEN);
  const userId = localStorage.getItem(constants.USER_ID);


    useEffect(() => {
      axiosInstance.get(`http://localhost:3000/api/v1/channels.history?roomId=GENERAL`)
        .then((response) => {
          setMessages(response.data?.messages);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data?.error || 'Failed to fetch messages');
          setLoading(false);
        });
    },[roomId]);

    return { messages, loading, error};
}

export default useMessages;
