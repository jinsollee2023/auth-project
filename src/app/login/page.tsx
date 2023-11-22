"use client";

import LoginForm from "@/components/auth/LogInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  return (
    <Card className="w-[390px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <CardHeader>
        <CardTitle>로그인합니다</CardTitle>
        <CardDescription>계정 정보를 입력해볼게요.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default page;
