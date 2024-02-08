import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DefaultLayout from "~/components/layouts/DefaultLayout";
import BlogList from "~/components/templates/homepage/BlogList";

export default function Home() {
  if (!cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/signin");

  return (
    <DefaultLayout>
      <BlogList />
    </DefaultLayout>
  );
}
