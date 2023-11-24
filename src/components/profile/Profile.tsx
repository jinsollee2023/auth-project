"use client";

import { userStore } from "@/stores/userStore";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Profile = () => {
  const { user } = userStore();
  return (
    <Card className="w-[390px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <CardHeader>
        <CardTitle>개인페이지</CardTitle>
        <CardDescription>{user?.name}님 환영합니다.</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Profile;
