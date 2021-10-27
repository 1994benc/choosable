import { User } from "@firebase/auth";
import create from "zustand";

export interface IUserStore {
    user: User,
    setUser: (user: User) => void
}

const useUserStore = create<IUserStore>(set => ({
    user: null,
    setUser: (user) => set({user: user}),
    clearUser: () => set({user: null})
}))

export default useUserStore;