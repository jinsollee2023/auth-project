"use client";

import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { userStore } from "@/stores/userStore";

const HeaderButtons = () => {
  const router = useRouter();
  const { logOut, user } = userStore();

  const loginButtonHandler = () => {
    router.push("/login");
  };

  const signUpButtonHandler = () => {
    router.push("/signup");
  };

  const logOutButtonHandler = () => {
    logOut();
    router.push("/");
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
