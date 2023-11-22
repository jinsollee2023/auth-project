"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

const HeaderButtons = () => {
  const router = useRouter();

  const signUpButtonHandler = () => {
    router.push("/signup");
  };

  const hiddenButton = (buttonPath: string) => {
    const pathName = usePathname();
    if (buttonPath === pathName) {
      return "hidden";
    }
  };

  return (
    <Button className={hiddenButton("/signup")} onClick={signUpButtonHandler}>
      SignUp
    </Button>
  );
};

export default HeaderButtons;
