export interface AuthStoreProps {
  isAuth: boolean;
  userId: number | null;
  setIsAuth: (value: boolean) => void;
  setUserId: (value: number) => void;
}
