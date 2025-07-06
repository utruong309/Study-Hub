import { createContext, useContext, useEffect, useState } from 'react';  
import {
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged,
} from "firebase/auth"; 
import app from "../firebase/config"; 

const AuthContext = createContext(); 
const auth = getAuth(app); 

export function AuthProvider( { children }) {
    const [user, setUser ] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const login = async () => {
        const provider = new GoogleAuthProvider(); 
        await signInWithPopup(auth, provider); 
    }; 

    const logout = async () => {
        await signOut(auth); 
    }; 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser); 
            setLoading(false); 
        });

        return () => unsubscribe(); //clean up listener 
    }, []); 

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = () => useContext(AuthContext); 