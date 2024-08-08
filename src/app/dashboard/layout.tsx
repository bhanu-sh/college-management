/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = useSession();

  const [subscribed, setSubscribed] = useState<Boolean | null>(true);

  const checkSubscription = async () => {
    try {
      const response = await axios.post("/api/college/checksub", {
        college_id: session?.user?.college_id,
      });
      setSubscribed(response.data.subscribed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      console.log(session);
      checkSubscription();
    }
  }, [session]);

  return (
    <div>
      {subscribed ? (
        <div>{children}</div>
      ) : (
        <div className="text-center text-red-500 flex flex-col gap-4 items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Subscription expired</h1>
          <Button
            variant={"warning"}
            onClick={() => {
              checkSubscription();
            }}
          >
            Refresh
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              window.location.href = "/api/auth/signout";
            }}
          >
            Logout
          </Button>
          <p>
            Please contact your college admin to renew the subscription to
            continue using the app.
          </p>
          {/* email below */}
          <Link href={`mailto:bhanu1234sharma@gmail.com`}>
            <p className="text-blue-500 underline">Email</p>
          </Link>
        </div>
      )}
    </div>
  );
}
