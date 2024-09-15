import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../Firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext();
const ProviderContext = ({ children }) => {
  const auth = getAuth(app);
  const [User, setUser] = useState(null);
  const [Loader, setLoader] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const CreateUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const LogIn = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const LogOut = () => {
    setLoader(true);
    return signOut(auth);
  };

  const google = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const github = () => {
    return signInWithPopup(auth, githubProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
      const userEmail=currentUser?.email || User?.email;
      const loggedUser = { email: userEmail };

      setUser(currentUser);
      setLoader(false);
      //if currentUser exist issue a token
      if (currentUser) {
        axios.post(`http://localhost:9998/jwt`,loggedUser,{withCredentials:true}).then((res) => {
          console.log('token response',res.data);
        });
      }
      else{
        axios.post(`http://localhost:9998/logout`,loggedUser,{withCredentials:true}).then(res=>{
          console.log('last logged user',res.data)
        })
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth]);

  const AuthInfo = {
    CreateUser,
    User,
    LogIn,
    LogOut,
    Loader,
    google,
    github,
    auth,
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
