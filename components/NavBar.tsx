import React from "react";
import Link from "next/link";
import { SignInIcon } from "./SignInIcon";
import useUserStore from "../stores/useUserStore";
import { UserCircleIcon } from "./UserCircleIcon";


export function NavBar() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex px-12 shadow py-6 justify-between items-center w-full">
      <Link href='/'>Choosable</Link>
      <div>{user ? <UserNavLink /> : <SignInNavLink />}</div>
    </div>
  );
}

function SignInNavLink() {
  return (
    <Link href="/sign-in">
      <a href="#">
        <SignInIcon></SignInIcon>
      </a>
    </Link>
  );
}

function UserNavLink() {
  return (
    <Link href="/profile">
      <a href="#">
        <UserCircleIcon></UserCircleIcon>
      </a>
    </Link>
  );
}
