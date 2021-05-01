import React, { useContext, useEffect, useState } from "react"
import {auth} from "../containers/firebase"

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
} 

export function AuthProvider ({children}) {
    const [currentUser, setCurrentUser] = useState();

    const signup = (email, password) => {
        return  auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return  auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return  auth.signOut()
    }

    const resetPassword = (email) => {
        return  auth.sendPasswordResetEmail(email)
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })
        
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

