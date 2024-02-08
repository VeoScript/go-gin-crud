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
        <div>
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
                <h1 className="font-bold text-xl">{blog.Title}</h1>
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
