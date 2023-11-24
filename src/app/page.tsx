"use client";

import { accessAlert } from "@/utils/accessAlert";

export default function Home() {
  accessAlert();

  return (
    <div className="flex h-[90vh] justify-center items-center">
      <h1>HOME</h1>
    </div>
  );
}
