import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Informasi dan Pengetahuan Digital",
  description: "Platform Informasi dan Pengetahuan Digital - Sign In Page",
};

export default function SignIn() {
  return <SignInForm />;
}
