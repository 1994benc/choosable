import Head from "next/head";
import React, { useEffect } from "react";
import "tailwindcss/tailwind.css";
import { NavBar } from "../components/NavBar";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import initializeFirebaseApp from "../firebase";

initializeFirebaseApp()

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const subscription = onAuthStateChanged(getAuth(), (user) => {
      console.log(user)
    });
    
    return () => {
      subscription();
    }
  }, [])

  return (
    <>
      <Head>
        <title>Choosable</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
        {/* TODO: <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
