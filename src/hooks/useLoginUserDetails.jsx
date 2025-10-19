//to get the details of the logged in user

import { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import endpoints from "../constants/endpoints";
import { constants } from "../constants/constants";
import useAuthStore from "../zustand/useAuthStore";

function useLoginUserDetails() {

    const userId = localStorage.getItem(constants?.USER_ID);

    const addUserDetails = useAuthStore(store => store?.login )

    useEffect(() => {
        axiosInstance.get(endpoints?.GET_USER_DETAILS + `?userId=${userId}`)
        .then(resp => console.log(resp?.data?.user))
        .catch(err => setError(err))
    }, [])
    return null;
}

export default useLoginUserDetails