import { useEffect, useState } from 'react';
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';

function useAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axiosInstance.get(endpoints.GET_ALL_USERS)
      .then(resp => {
        setAllUsers(resp?.data?.users);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { allUsers, loading, error };
}

export default useAllUsers;
