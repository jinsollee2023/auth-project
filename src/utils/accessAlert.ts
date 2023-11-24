"use client";

import { useToast } from "@/components/ui/use-toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const accessAlert = () => {
  const searchParams = useSearchParams();
  const alertParams = searchParams.get("alert");
  const nextParams = searchParams.get("next");

  const pathName = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  if (alertParams) {
    toast({
      variant: "destructive",
      title: alertParams,
      duration: 1000,
    });
    router.push(`${pathName}${nextParams ? `?next=${nextParams}` : ""}`);
  }
};
