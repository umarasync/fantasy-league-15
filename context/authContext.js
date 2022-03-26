import React, { createContext, useState, useContext, useEffect } from 'react'
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";

// Actions
import { me } from "redux/Auth/api"

// Constants
import {publicRoutes} from "constants/universal";
import {loginFailed} from "../redux/Auth/actionCreators";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const dispatch = useDispatch();

    const checkIfTokenIsValid = async () => {
        const user = await dispatch(me());
        console.log("in checkIfTokenIsValid ===========", user)
          if(user) {
              setUser(user)
              setLoading(false)
              return router.push(router.pathname)
        }
        setLoading(false)
        dispatch(loginFailed(''))

        router.replace('/sign_in')
    }
    useEffect(() => {
        if(publicRoutes.includes(router.pathname)) return
        checkIfTokenIsValid()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)