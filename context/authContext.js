import React, { createContext, useState, useContext, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

// Actions
import { me } from "redux/Auth/api"
import {meFailed, meSuccess} from "redux/Auth/actionCreators";

// Constants
import {authRoutes, homeRoute, publicRoutes} from "constants/universalConstants";
import {isEmpty} from "lodash/lang";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const user = useSelector(({ auth }) => auth.user);

    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const dispatch = useDispatch();

    const checkIfTokenIsValid = async () => {
        const $user = await dispatch(me());
        if($user) {
            dispatch(meSuccess($user))
            setLoading(false)

            // If already signed in and trying to access login/register page, then redirect to some homepage
            if(authRoutes.includes(router.pathname)){
                 return router.push(homeRoute)
            }else {
                 return router.push(router.pathname)
            }
        }

        dispatch(meFailed())
        setLoading(false)

        if(authRoutes.includes(router.pathname)){
          return router.push(router.pathname)
        }
        return router.push('/sign_in')
    }
    useEffect(() => {
        // if(publicRoutes.includes(router.pathname)) return
        checkIfTokenIsValid()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: !isEmpty(user), user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)