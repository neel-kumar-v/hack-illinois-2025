import React from 'react';
import { signInWithGoogle } from '@/firebase/firebaseConfig';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={signInWithGoogle}>Login with google</button>
    </div>
  );
};

export default Login;