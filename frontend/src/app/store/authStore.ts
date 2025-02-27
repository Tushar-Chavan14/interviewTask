import { AUTH_ENDPOINTS } from "@src/constants";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; email: string } | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      login: async (data: { email: string; password: string }) => {
        try {
          const req = await axios.post(AUTH_ENDPOINTS.login, {
            email: data.email,
            password: data.password,
          });

          if (req.status === 200) {
            set({
              isAuthenticated: true,
              token: req.data?.data.jwtToken,
              user: req.data?.dara?.user,
            });
          }
        } catch (error) {}
      },
      logout: () => set({ isAuthenticated: false, token: null, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
