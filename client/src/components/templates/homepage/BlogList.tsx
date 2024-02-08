"use client";

import { memo } from "react";
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
              className="flex flex-col items-start w-full max-w-[500px] overflow-hidden rounded-xl border border-neutral-300"
            >
              <div className="relative flex w-[500px] h-[300px] bg-neutral-200">
                <Image
                  fill
                  className="object-cover"
                  src={blog.Image}
                  alt="Image4"
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
    </>
  );
}

export default memo(BlogList);
