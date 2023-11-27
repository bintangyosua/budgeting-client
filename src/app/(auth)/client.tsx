"use client";

import { Theme } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Client(props: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main>Loading...</main>;
  } else {
    if (!session) {
      redirect("/api/auth/signin");
    } else {
      return (
        <main>
          <Theme>{props.children}</Theme>
        </main>
      );
    }
  }
}
