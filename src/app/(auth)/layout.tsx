"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function ({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <main>Loading...</main>;
  } else {
    if (!session) {
      redirect("/");
    } else {
      return (
        <main>
          <Theme>{children}</Theme>
        </main>
      );
    }
  }
}
