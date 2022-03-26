import React, { createContext, useState, useContext, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

// Actions
import { me } from "redux/Auth/api"
import {meFailed, meSuccess} from "redux/Auth/actionCreators";

// Constants
import {publicRoutes} from "constants/universal";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    // const [user, setUser] = useState(null)
    const user = useSelector(({ auth }) => auth.user);

    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const dispatch = useDispatch();

    const checkIfTokenIsValid = async () => {
        const user = await dispatch(me());
        console.log("in checkIfTokenIsValid ===========", user)
          if(user) {
              dispatch(meSuccess(user))
              setLoading(false)
              return router.push(router.pathname)
        }
        dispatch(meFailed(null))
        setLoading(false)

        router.replace('/sign_in')
    }
    useEffect(() => {
        // if(publicRoutes.includes(router.pathname)) return
        checkIfTokenIsValid()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)