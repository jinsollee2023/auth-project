"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuthForm from "@/hooks/usuAuthForm";

const LoginForm = () => {
  const { loginForm, isLoading, debouncedSubmitHandler } = useAuthForm();

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit((values, e) => {
          debouncedSubmitHandler(values, e, "login");
        })}
        className="relative space-y-3 overflow-x-hidden"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="hello@sparta-devcamp.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            로그인
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
