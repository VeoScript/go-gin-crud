import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import DefaultLayout from "~/components/layouts/DefaultLayout";
import BlogDetails from "~/components/templates/blogpage/BlogDetails";

export default function BlogId() {
  if (!cookies().has(`${process.env.COOKIE_NAME}`)) redirect("/signin");

  return (
    <DefaultLayout>
      <BlogDetails />
    </DefaultLayout>
  );
}
