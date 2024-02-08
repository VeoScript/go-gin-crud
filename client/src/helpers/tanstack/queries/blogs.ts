import { useQuery } from "@tanstack/react-query";
import api from "~/config/Axios";

export const useGetBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const blogs = await api.get("/blogs/all");
      return blogs.data;
    },
  });
};
