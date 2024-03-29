import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import SignupComponent from "~/components/templates/authentication/SignupComponent";

export default function SignUp() {
  if (cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/");
  return <SignupComponent />;
}
