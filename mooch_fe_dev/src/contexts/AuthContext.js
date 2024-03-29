import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    const newUser = await auth.createUserWithEmailAndPassword(email, password);
    return newUser.user;
  };

  const signIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut();

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const checkEmail = (email) => auth.fetchSignInMethodsForEmail(email);

  const getCurrentUser = () => currentUser;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getCurrentUser,
    signUp,
    signIn,
    signOut,
    resetPassword,
    checkEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
