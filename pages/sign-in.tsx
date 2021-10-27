import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { useRouter } from "next/dist/client/router";
import React, { ReactElement, useEffect } from "react";
import { pageContainer } from "../common/classNames";
import { PrimaryButton } from "../components/PrimaryButton";
import { SignInIcon } from "../components/SignInIcon";
import useUserStore from "../stores/useUserStore";

interface Props {}

function SignIn({}: Props): ReactElement {
  const googleProvider = new GoogleAuthProvider();
  const microsoftProvider = new OAuthProvider("microsoft.com");
  const user = useUserStore((state) => state.user);
  const router = useRouter();
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

  useEffect(() => {
    if (user) {
      router.replace("/profile");
    }
  }, [user]);

  const signInGoogle = () => {
    const auth = getAuth();
    signInWithRedirect(auth, googleProvider);
  };

  const signInMicrosoft = () => {
    const auth = getAuth();
    signInWithRedirect(auth, microsoftProvider);
  };

  return (
    <div className={`${pageContainer}`}>
      <div className="flex flex-col gap-y-2">
        <PrimaryButton
          onClick={signInGoogle}
          text={
            <div className="flex items-center">
              <i className="fab fa-google"></i>{" "}
              <span className="pl-2">Sign in with Google</span>
            </div>
          }
        ></PrimaryButton>
        <PrimaryButton
          onClick={signInMicrosoft}
          text={
            <div className="flex items-center">
              <i className="fab fa-microsoft"></i>
              <span className="pl-2">Sign in with Microsoft</span>
            </div>
          }
        ></PrimaryButton>
      </div>
    </div>
  );
}

export default SignIn;
