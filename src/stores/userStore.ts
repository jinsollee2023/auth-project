import { create } from "zustand";
import Cookies from "js-cookie";
import { getLocalStorageValue, setLocalStorageValue } from "@/utils/storage";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type Store = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  logOut: () => void;
};

export const userStore = create<Store>()((set) => ({
  user: getLocalStorageValue("user", null) || null,
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  setUser: (user) => {
    setLocalStorageValue("user", user);
    set(() => ({ user }));
  },
  setAccessToken: (accessToken) => {
    Cookies.set("accessToken", accessToken, { expires: 1 });
    set(() => ({ accessToken }));
  },
  setRefreshToken: (refreshToken) => {
    Cookies.set("refreshToken", refreshToken, { expires: 7 });
    set(() => ({ refreshToken }));
  },
  logOut: () => {
    localStorage.removeItem("user");
    Cookies.set("accessToken", "", { expires: 0 });
    Cookies.set("refreshToken", "", { expires: 0 });
    set(() => ({ user: null, accessToken: null, refreshToken: null }));
  },
}));
