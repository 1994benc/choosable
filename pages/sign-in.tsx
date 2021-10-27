import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import React, { ReactElement, useEffect } from "react";
import { PrimaryButton } from "../components/PrimaryButton";
import { SignInIcon } from "../components/SignInIcon";

interface Props {}

function SignIn({}: Props): ReactElement {
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");
  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        console.log({ result });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const signInGoogle = () => {
    const auth = getAuth();
    signInWithRedirect(auth, googleProvider);
  };

  const signInMicrosoft = () => {
    const auth = getAuth();
    signInWithRedirect(auth, microsoftProvider);
  };

  return (
    <div className="mx-auto max-w-xl px-3 py-20">
      <div className='flex flex-col gap-y-2'>
        <PrimaryButton
          onClick={signInGoogle}
          text={
            <div className="flex items-center">
              <i className="fab fa-google"></i> <span className="pl-2">Sign in with Google</span>
            </div>
          }
        ></PrimaryButton>
        <PrimaryButton
          onClick={signInMicrosoft}
          text={
            <div className="flex items-center">
              <i className="fab fa-microsoft"></i><span className="pl-2">Sign in with Microsoft</span>
            </div>
          }
        ></PrimaryButton>
      </div>
    </div>
  );
}

export default SignIn;
