"use client";

import { accessAlert } from "@/utils/accessAlert";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("@/components/profile/Profile"), {
  ssr: false,
});

export default function page() {
  accessAlert();
  return <Profile />;
}
