import { auth } from "@/auth/auth";
import React from "react";

export default async function page() {
  const session = await auth()
  console.log(session?.user)
  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      Bienvenus sur notre page Organizer
    </section>
  );
}
