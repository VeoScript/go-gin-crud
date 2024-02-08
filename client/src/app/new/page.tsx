"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import clsx from "clsx";
import DefaultLayout from "~/components/layouts/DefaultLayout";

import { createBlogValidation } from "~/helpers/hooks/useValidations";
import { useCreateBlogMutation } from "~/helpers/tanstack/mutations/blogs";

export default function New() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createBlogFormErrors, setCreateBlogFormErrors] = useState<any>(null);

  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [article, setArticle] = useState<string>("");

  const createBlogMutation = useCreateBlogMutation();

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlogValidation.validate(
        { image, title, description, article },
        { abortEarly: false }
      );

      setIsSubmitting(true);

      await createBlogMutation.mutateAsync(
        {
          image,
          title,
          description,
          article,
        },
        {
          onError: (error: any) => {
            setIsSubmitting(false);
            toast.error(error?.response?.data?.message);
          },
          onSuccess: () => {
            setIsSubmitting(false);
            setImage("");
            setTitle("");
            setDescription("");
            setArticle("");
            router.push("/");
          },
        }
      );
    } catch (error: any) {
      if (error?.inner) {
        const errors: any = {};
        error.inner.forEach((e: any) => {
          errors[e.path] = e.message;
        });
        setCreateBlogFormErrors(errors);
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="font-bold text-xl text-blue-500">Create Blog</h1>
        <form
          onSubmit={handleCreateBlog}
          className="flex flex-col items-center w-full max-w-xl gap-y-3"
        >
          <div className="flex flex-col items-start w-full gap-y-1">
            <label htmlFor="image" className="ml-1 text-sm">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
              value={image}
              onChange={(e) => {
                setCreateBlogFormErrors([]);
                setImage(e.currentTarget.value);
              }}
            />
            {createBlogFormErrors && createBlogFormErrors.image && (
              <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                {createBlogFormErrors.image}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-y-1">
            <label htmlFor="title" className="ml-1 text-sm">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
              value={title}
              onChange={(e) => {
                setCreateBlogFormErrors([]);
                setTitle(e.currentTarget.value);
              }}
            />
            {createBlogFormErrors && createBlogFormErrors.title && (
              <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                {createBlogFormErrors.title}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-y-1">
            <label htmlFor="description" className="ml-1 text-sm">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
              value={description}
              onChange={(e) => {
                setCreateBlogFormErrors([]);
                setDescription(e.currentTarget.value);
              }}
            />
            {createBlogFormErrors && createBlogFormErrors.description && (
              <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                {createBlogFormErrors.description}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start w-full gap-y-1">
            <label htmlFor="article" className="ml-1 text-sm">
              Article
            </label>
            <input
              type="text"
              id="article"
              className="w-full p-3 outline-none rounded-xl border border-neutral-700 bg-transparent focus:border-blue-300"
              value={article}
              onChange={(e) => {
                setCreateBlogFormErrors([]);
                setArticle(e.currentTarget.value);
              }}
            />
            {createBlogFormErrors && createBlogFormErrors.article && (
              <span className="ml-2 mt-1 text-xs font-medium text-red-500">
                {createBlogFormErrors.article}
              </span>
            )}
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className={clsx(
              isSubmitting && "opacity-50",
              "w-full p-3 outline-none rounded-xl border border-blue-400 text-white bg-blue-400 hover:opacity-50"
            )}
          >
            Create
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
