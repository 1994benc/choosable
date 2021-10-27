import React from "react";
import Link from "next/link";
import { SignInIcon } from "./SignInIcon";

export function NavBar() {
  return (
    <div className="flex px-12 shadow py-6 justify-between items-center w-full">
      <div>Choosable</div>
      <div>
        <Link href="/sign-in">
          <a href="#">
            <SignInIcon></SignInIcon>
          </a>
        </Link>
      </div>
    </div>
  );
}
