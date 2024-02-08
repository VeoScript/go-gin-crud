import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SigninComponent from "~/components/templates/authentication/SigninComponent";

export default function SignIn() {
  if (cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/");
  return <SigninComponent />;
}
