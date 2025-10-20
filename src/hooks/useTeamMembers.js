import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios/axios';
import endpoints from '../constants/endpoints';

function useTeamMembers(teamId) {
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(endpoints?.GET_MEMBERS_OF_TEAM + `?teamId=${teamId}`)
        .then(resp => console.log("team members:",resp?.data?.members))
        .catch(err => console.log(err.message));
    }, []);

    return {teamMembers, error}
}

export default useTeamMembers