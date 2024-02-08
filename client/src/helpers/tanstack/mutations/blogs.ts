import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "~/config/Axios";

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: {
      image: string;
      title: string;
      description: string;
      article: string;
    }) => {
      return await api.post("/blogs/create", {
        Image: _args.image,
        Title: _args.title,
        Description: _args.description,
        Article: _args.article,
      });
    },
    onError: (error: any) => {
      console.error("ERROR CREATE BLOG", error);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });
};
