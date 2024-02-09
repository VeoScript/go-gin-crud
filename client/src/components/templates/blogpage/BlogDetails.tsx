"use client";

import { memo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useGetBlog } from "~/helpers/tanstack/queries/blogs";

function BlogDetails() {
  const router = useRouter();
  const { blogId } = useParams();

  const { data: blog, isFetching: isFetchingBlog } = useGetBlog(
    blogId as unknown as number
  );

  return (
    <>
      {isFetchingBlog ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-2xl h-full gap-y-10">
          <div className="relative flex w-full h-[40rem] bg-neutral-800">
            <Image
              fill
              className="object-contain"
              src={blog?.Image as string}
              alt={blog?.Title as string}
              sizes="(max-width: 331px) 100vw, (max-width: 331px) 50vw, 33vw"
            />
          </div>
          <div className="relative flex flex-col items-center w-full gap-y-1">
            <h1 className="font-bold text-xl">{blog?.Title}</h1>
            <h2>{blog?.Description}</h2>
            <div className="absolute top-0 right-0 flex flex-row items-center gap-x-3">
              <Link href="/edit">
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-6 h-6 text-neutral-400 transition ease-in-out duration-200 hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </Link>
              <button type="button" onClick={() => router.back()}>
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-6 h-6 text-neutral-400 transition ease-in-out duration-200 hover:scale-110"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </button>
            </div>
          </div>
          <p>{blog?.Article}</p>
        </div>
      )}
    </>
  );
}

export default memo(BlogDetails);
