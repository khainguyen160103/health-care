import { authApi } from "./apiClient";
import { User, login, loginResponse } from "../types/userType";

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role:
    | "patient"
    | "doctor"
    | "nurse"
    | "admin"
    | "pharmacist"
    | "lab_tech"
    | "insurance";
}

export const authService = {
  login: async (data: login): Promise<loginResponse> =>
    await authApi.post("/login/", data),

  register: (data: SignUpRequest): Promise<loginResponse> =>
    authApi.post("/register/", data),

  logout: (): Promise<void> => authApi.post("/logout/"),

  refreshToken: (refreshToken: string): Promise<{ token: string }> =>
    authApi.post("/refresh/", { refresh_token: refreshToken }),

  forgotPassword: (email: string): Promise<{ message: string }> =>
    authApi.post("/forgot-password/", { email }),

  resetPassword: (
    token: string,
    password: string
  ): Promise<{ message: string }> =>
    authApi.post("/reset-password/", { token, password }),

  getProfile: (): Promise<User> => authApi.get("/profile/"),

  updateProfile: (data: Partial<User>): Promise<User> =>
    authApi.put("/profile/", data),

  changePassword: (oldPassword: string, newPassword: string): Promise<void> =>
    authApi.put("/change-password/", {
      old_password: oldPassword,
      new_password: newPassword,
    }),
};
