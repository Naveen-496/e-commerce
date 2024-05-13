import { create } from "zustand";

type Store = {
  count: number;
  inc: () => void;
};

export const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export type UserType = {
  id: number;
  username: string;
  email: string | null;
  role: string;
};

type UserAndUserActions = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export const useAuth = create<UserAndUserActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
