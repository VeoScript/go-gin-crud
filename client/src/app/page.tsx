import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  if (!cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/signin");
  return <div>Home Page</div>;
}
