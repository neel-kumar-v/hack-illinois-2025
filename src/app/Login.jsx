import React from 'react';
import { signInWithGoogle } from '@/firebase/firebaseConfig';

const Login = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Login with google</button>
    </div>
  );
};

export default Login;