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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useAuthForm from "@/hooks/usuAuthForm";

export const SignUpForm = () => {
  const {
    isLoading,
    signUpForm,
    nextButtonHandler,
    nextButtonClicked,
    setNextButtonClicked,
    keyDownHandler,
    preventEnterKeySubmission,
    debouncedSubmitHandler,
  } = useAuthForm();

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit((values, e) =>
          debouncedSubmitHandler(values, e, "signup")
        )}
        className="relative space-y-3 overflow-x-hidden"
        onKeyDown={preventEnterKeySubmission}
      >
        <div
          className={`p-2 space-y-3 transform ${
            nextButtonClicked ? "-translate-x-full" : "translate-x-0"
          } transition`}
        >
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="홍길동"
                      {...field}
                      onFocus={() => setNextButtonClicked(false)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signUpForm.control}
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
            control={signUpForm.control}
            name="phone"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>연락처</FormLabel>
                  <FormControl>
                    <Input placeholder="01000000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>역할</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger onKeyDown={keyDownHandler} name="role">
                      <SelectValue placeholder="역할을 선택해주세요" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manager">관리자</SelectItem>
                    <SelectItem value="user">일반사용자</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div
          className={`p-2 space-y-3 absolute top-0 left-0 right-0 transition transform ${
            nextButtonClicked ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      name="password"
                      onKeyDown={keyDownHandler}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button
            className={nextButtonClicked ? "hidden" : ""}
            type="button"
            onClick={nextButtonHandler}
          >
            다음 단계로
          </Button>
          <Button
            className={nextButtonClicked ? "" : "hidden"}
            type="submit"
            disabled={isLoading}
          >
            계정 등록하기
          </Button>
          <Button
            className={nextButtonClicked ? "" : "hidden"}
            type="button"
            onClick={nextButtonHandler}
          >
            이전 단계로
          </Button>
        </div>
      </form>
    </Form>
  );
};
