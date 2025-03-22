import { create } from "zustand";

import { User } from "@auth/types/user";


interface UserStore extends User {
    setUser: (user: User) => void;
    removeUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    id: '',
    username: '',
    isSuperuser: false,
    setUser: (user: User) => set((prevState) => ({
        ...prevState,
        ...user,
    })),
    removeUser: () => set(() => ({
        username: '',
        isSuperuser: false,
    })),
}));
