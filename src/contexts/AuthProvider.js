import React, { useState, useEffect } from "react";
import { createContext } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Register & Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    //Update Name
    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        });
    };

    //Google Signin
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    //Logout
    const logout = () => {
        setLoading(true);
        localStorage.removeItem("truckZone-token");
        return signOut(auth);
    };

    //Login with Password
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    //Forget Password
    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    // get currently logged in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // delete user
    // const deleteUser = (uid) => {
    //     return .deleteUser(uid);
    // };

    const authInfo = {
        user,
        createUser,
        updateUserProfile,
        signInWithGoogle,
        logout,
        signIn,
        resetPassword,
        loading,
        setLoading,
        setUser,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
