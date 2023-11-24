import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";
import { useToast } from "../ui/use-toast";

const HeaderButtons = () => {
  const router = useRouter();
  const { logOut, user } = userStore();
  const { toast } = useToast();

  const loginButtonHandler = () => {
    router.push("/login");
  };

  const signUpButtonHandler = () => {
    router.push("/signup");
  };

  const logOutButtonHandler = () => {
    logOut();
    toast({
      variant: "green",
      title: "로그아웃 되었습니다.",
      duration: 1000,
    });
    router.push("/");
  };

  const profileButtonHandler = () => {
    router.push("/profile");
  };

  const hiddenButton = (buttonPath: string) => {
    const pathName = usePathname();
    if (buttonPath === pathName) {
      return "hidden";
    }
  };

  return (
    <div className="flex gap-2 mr-3">
      {user ? (
        <>
          <Button
            className={hiddenButton("/profile")}
            onClick={profileButtonHandler}
          >
            Profile
          </Button>
          <Button onClick={logOutButtonHandler}>LogOut</Button>
        </>
      ) : (
        <>
          <Button
            className={hiddenButton("/login")}
            onClick={loginButtonHandler}
          >
            Login
          </Button>
          <Button
            className={hiddenButton("/signup")}
            onClick={signUpButtonHandler}
          >
            SignUp
          </Button>
        </>
      )}
    </div>
  );
};

export default HeaderButtons;
