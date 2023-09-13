import React from "react";
import '../buttons/signInGoogle.css'
const signInGoogle = () => {
  return (
    <>
      <button typeOf="button" className="login-with-google-btn">
        Sign in with Google
      </button>

      <button typeOf="button" className="login-with-google-btn" disabled>
        Sign in with Google
      </button>
    </>
  );
};

export default signInGoogle;
