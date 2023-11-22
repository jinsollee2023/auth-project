import { AUTH_SIGNUP } from "@/components/constants/apiEndpoints";
import { useToast } from "@/components/ui/use-toast";
import { SignUpFormSchema } from "@/utils/formValidation";
import axiosInstance from "@/utils/httpClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type ServerErrorResponse = {
  message: string;
};

const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const { toast } = useToast();

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

  const nextButtonHandler = async (e: any) => {
    const validateExceptPassword = await signUpForm.trigger([
      "name",
      "email",
      "phone",
      "role",
    ]);
    if (validateExceptPassword) {
      setNextButtonClicked(!nextButtonClicked);
    }
  };

  const keyDownHandler = async (e: any) => {
    const { name } = e.target;
    const validateExceptPassword = await signUpForm.trigger([
      "name",
      "email",
      "phone",
      "role",
    ]);

    if (name === "role" && !validateExceptPassword) {
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
      }
    } else if (name === "role" && validateExceptPassword) {
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

  const onSubmitSignUp = async (
    values: z.infer<typeof SignUpFormSchema>,
    e: any
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (values.password === values.confirmPassword) {
      try {
        await axiosInstance.post(AUTH_SIGNUP, values);
        toast({
          variant: "green",
          title: "회원가입에 성공하였습니다.",
          duration: 1000,
        });
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

  return {
    isLoading,
    signUpForm,
    nextButtonHandler,
    nextButtonClicked,
    onSubmitSignUp,
    keyDownHandler,
    preventEnterKeySubmission,
  };
};

export default useAuthForm;
