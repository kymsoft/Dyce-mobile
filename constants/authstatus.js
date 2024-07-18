// authStatus.js
import { useEffect, useState } from 'react';
import {FIREBASE_AUTH} from '../FirebaseConfig'

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      
    });

    return () => unsubscribe();
  }, []);

  return { isLoggedIn};
};

export default useAuthStatus;
