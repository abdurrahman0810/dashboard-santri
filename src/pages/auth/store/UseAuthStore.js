import { create } from "zustand";
import { persist } from "zustand/middleware";

const MOCK_USERS = [
  {
    id: 1,
    email: "admintest@gmail.com",
    password: 123,
    name: "budi",
    role: "admin",
  },
  {
    id: 2,
    email: "user@gmail.com",
    password: 123,
    name: "josss",
    role: "user",
  },
];

export const UseAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,

      login: (email, password) => {
        console.log(email, password);
        // const founduser = MOCK_USERS;
        const founduser = MOCK_USERS.find(
          (u) => u.email === email && u.password == password,
        );
        console.log(founduser);

        if (founduser) {
          set({
            user: {
              id: founduser.id,
              email: founduser.email,
              name: founduser.name,
              role: founduser.role,
            },
            error: null,
          });
          return true;
        } else {
          set({
            error: "email Atau Password Antum Salah Harap DI PERIKSA Dua Kali",
          });
          return false;
        }
      },

      logout: () => {
        set({ user: null, error: null });
      },
    }),
    {
      name: "auth-store",
    },
  ),
);
