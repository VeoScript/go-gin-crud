import { create } from "zustand";
import * as type from "./interfaces";

export const authStore = create<type.AuthStoreProps>((set) => ({
  isAuth: false,
  userId: null,
  setIsAuth: (value: boolean) => set(() => ({ isAuth: value })),
  setUserId: (value: number) => set(() => ({ userId: value })),
}));
