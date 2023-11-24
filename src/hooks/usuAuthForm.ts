import { useToast } from "@/components/ui/use-toast";
import { userStore } from "@/stores/userStore";
import { SignUpFormSchema, loginFormSchema } from "@/utils/formValidation";
import axiosInstance from "@/utils/httpClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import _ from "lodash";

export type ServerErrorResponse = {
  message: string;
};

const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const { setUser, setAccessToken, setRefreshToken } = userStore.getState();
  const { toast } = useToast();

  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParams = searchParams.get("next");

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const debouncedSubmitHandler = useCallback(
    _.debounce((values: any, e: any, type: string) => {
      if (type === "login") {
        onSubmitLogin(values);
      } else if (type === "signup") {
        onSubmitSignUp(values, e);
      }
    }, 1000),
    []
  );

  const onSubmitSignUp = async (
    values: z.infer<typeof SignUpFormSchema>,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (values.password === values.confirmPassword) {
      try {
        await axiosInstance.post("/auth/signup", values);
        await onSubmitLogin({ email: values.email, password: values.password });
      } catch (error) {
        const axiosError = error as AxiosError<ServerErrorResponse>;
        toast({
          variant: "destructive",
          title: axiosError.response?.data?.message,
          duration: 1000,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "비밀번호가 일치하지 않습니다.",
        duration: 1000,
      });
    }
  };

  const onSubmitLogin = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", values);
      setUser(data.user);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      toast({
        variant: "green",
        title: "로그인되었습니다.",
        duration: 1000,
      });
      router.push(typeof nextParams === "string" ? nextParams : "/");
    } catch (error) {
      const axiosError = error as AxiosError<ServerErrorResponse>;
      toast({
        variant: "destructive",
        title: axiosError.response?.data?.message,
        duration: 1000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateExceptPassword = async () => {
    return await signUpForm.trigger(["name", "email", "phone", "role"]);
  };

  const nextButtonHandler = async () => {
    const isValid = await validateExceptPassword();
    if (isValid) {
      setNextButtonClicked(!nextButtonClicked);
    }
  };

  const keyDownHandler = async (e: any) => {
    const { name } = e.target;
    const isValid = await validateExceptPassword();

    if (name === "role" && !isValid) {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
      }
    } else if (name === "role" && isValid) {
      if (e.key === "Tab" && !e.shiftKey) {
        setNextButtonClicked(true);
      }
    } else if (name === "password" && e.key === "Tab" && e.shiftKey) {
      setNextButtonClicked(false);
    }
  };

  const preventEnterKeySubmission = async (e: any) => {
    const validateForm = await signUpForm.trigger([
      "name",
      "email",
      "phone",
      "role",
      "password",
    ]);
    if (e.key === "Enter" && !validateForm) {
      e.preventDefault();
    }
  };

  return {
    isLoading,
    loginForm,
    onSubmitLogin,
    signUpForm,
    nextButtonHandler,
    nextButtonClicked,
    setNextButtonClicked,
    onSubmitSignUp,
    keyDownHandler,
    preventEnterKeySubmission,
    debouncedSubmitHandler,
  };
};

export default useAuthForm;
