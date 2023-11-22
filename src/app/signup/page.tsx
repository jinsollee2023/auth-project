import { SignUpForm } from "@/components/auth/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  return (
    <>
      <Card className="w-[390px] absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <CardHeader>
          <CardTitle>계정을 생성합니다</CardTitle>
          <CardDescription>필수 정보를 입력해볼게요.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </>
  );
};

export default page;
