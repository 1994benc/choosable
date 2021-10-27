import * as React from "react";
import { pageContainer } from "../common/classNames";
import TextContent from "../components/TextContent";
import useUserStore from "../stores/useUserStore";
import Avatar from "../components/Avatar";
import { getAuth } from "@firebase/auth";
import { signOut } from "firebase/auth";
import { SecondaryButton } from "../components/SecondaryButton";
import { useRouter } from "next/dist/client/router";

export interface IProfileProps {}

export default function Profile(props: IProfileProps) {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  async function signUserOut() {
    const auth = getAuth();
    await signOut(auth);
    router.replace("/sign-in");
  }
  return (
    <div className={`${pageContainer} gap-y-6 flex flex-col`}>
      <TextContent
        text={user?.displayName}
        className="text-xl"
        placeholderHeight={"30px"}
        placeholderWidth="50%"
      />
      <Avatar photoURL={user?.photoURL} width="100px" height="100px" />
      <TextContent text={user?.email} placeholderWidth="60%" />
      <SecondaryButton text={<div>Sign out</div>} onClick={signUserOut} />
    </div>
  );
}
