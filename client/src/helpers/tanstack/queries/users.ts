import { useQuery } from "@tanstack/react-query";
import api from "~/config/Axios";

import { UserProps } from "~/shared/interfaces/users";

export const useGetUser = () => {
  return useQuery<UserProps>({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await api.get(`/auth/validate`);
      return user.data;
    },
  });
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await api.get(`/auth/validate`);
      return users.data;
    },
  });
};
