import { useQuery } from "@tanstack/react-query";
import api from "~/config/Axios";

import { BlogsProps } from "~/shared/interfaces/blogs";

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const blogs = await api.get("/blogs/all");
      return blogs.data;
    },
  });
};

export const useGetBlog = (id: number) => {
  return useQuery<BlogsProps>({
    queryKey: ["blog"],
    queryFn: async () => {
      const blog = await api.get(`/blogs/${id}`);
      return blog.data;
    },
  });
};
