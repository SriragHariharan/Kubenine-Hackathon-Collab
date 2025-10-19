import { useEffect, useState } from "react";
import endpoints from "../constants/endpoints";
import axiosInstance from "../axios/axios";

function useTeams() {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(endpoints?.GET_ALL_TEAMS)
        .then(resp => setTeams(resp?.data?.teams))
        .catch(err => setError(err.message));
    }, []);

  return {teams, error}
}

export default useTeams