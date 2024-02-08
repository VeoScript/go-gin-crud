import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "~/config/Axios";

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_args: {
      name: string;
      email: string;
      password: string;
    }) => {
      return await api.post("/auth/signup", {
        Name: _args.name,
        Email: _args.email,
        Password: _args.password,
      });
    },
    onError: (error: any) => {
      console.error("ERROR SIGN UP", error);
    },
    onSuccess: async () => {
      queryClient.resetQueries();
    },
  });
};
