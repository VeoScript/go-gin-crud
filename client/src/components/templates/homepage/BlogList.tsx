"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

import { BlogsProps } from "~/shared/interfaces/blogs";
import { useGetBlogs } from "~/helpers/tanstack/queries/blogs";

function BlogList() {
  const { data: blogs, isLoading } = useGetBlogs();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {blogs.map((blog: BlogsProps, key: number) => (
            <div
              key={key}
              className="flex flex-col items-start w-full max-w-[500px] overflow-hidden rounded-xl border border-neutral-700"
            >
              <div className="relative flex w-[500px] h-[300px] bg-neutral-200">
                <Image
                  fill
                  className="object-cover"
                  src={blog.Image}
                  alt={blog.Title}
                  sizes="(max-width: 331px) 100vw, (max-width: 331px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col items-start w-full p-3 gap-y-3">
                <div className="flex flex-row items-center justify-between w-full gap-x-3">
                  <h1 className="font-bold text-xl">{blog.Title}</h1>
                  <div className="flex flex-row items-center gap-x-3">
                    <Link href={`/blog/${blog.ID}`}>
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
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </Link>
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
                  </div>
                </div>
                <h2 className="text-base">{blog.Description}</h2>
                <p className="text-sm">{blog.Article}</p>
              </div>
            </div>
          ))}
        </>
      )}
      <Link
        href="/new"
        className="fixed bottom-10 right-10 p-5 outline-none rounded-full bg-blue-600 transition-all ease-in-out duration-200 transform hover:rotate-45 hover:opacity-50"
      >
        <svg
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-10 h-10 fill-current text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
    </>
  );
}

export default memo(BlogList);
