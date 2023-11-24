"use client";

import React from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const HeaderButtons = dynamic(() => import("./HeaderButtons"), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();

  const homeButtonHandler = () => {
    router.push("/");
  };
  return (
    <header className="h-[10vh] bg-slate-100 dark:bg-slate-900 flex justify-end items-center">
      <div className=" w-[1200px] mx-auto flex justify-between">
        <div
          className="my-auto cursor-pointer font-semibold"
          onClick={homeButtonHandler}
        >
          DevCamp
        </div>
        <HeaderButtons />
      </div>
    </header>
  );
};

export default Header;
