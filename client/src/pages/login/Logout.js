import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { token } from 'shared/services/token';

const Logout = () => {

    useEffect(() => {
        token.setToken(null);
    })
  return (
    <Navigate to='/login' replace = {true}/>
  )
}

export default Logout;