'use client'

import { useEffect, useState } from "react";
import { getCurrentUserInfo } from "@/app/actions/users";

export default function Me() {
  // This is an example and it should be moved to the auth context
  // to avoid having to refetch those infos.
  const [username, setUsername] = useState("Loading...");
  useEffect(() => {
    getCurrentUserInfo().then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      setUsername(res.username);
    }).catch((err)=>{
      console.log(err);
      //TODO error handling
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        Username: {username}
      </div>
    </main>
  );
}
