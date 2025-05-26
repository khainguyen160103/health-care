import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "../services";
import { loginResponse } from "../types/userType";

export const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data: loginResponse) => {
      localStorage.setItem("token", data.access);
      localStorage.setItem("user", JSON.stringify(data.user));

      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Redirect based on role
      const role = data.user.user_type;
      switch (role) {
        case "patient":
          navigate("/patient/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "nurse":
          navigate("/nurse/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "pharmacist":
          navigate("/pharmacy/dashboard");
          break;
        case "lab_tech":
          navigate("/laboratory/dashboard");
          break;
        case "insurance":
          navigate("/insurance/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    },
  });
};

export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      localStorage.setItem("token", data.access);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    },
  });
};

export const useSignOut = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Fix: Sử dụng đúng tên key
      localStorage.clear();
      queryClient.clear();
      navigate("/signin");
    },
    onError: () => {
      // Ngay cả khi API call thất bại, vẫn clear localStorage
      localStorage.clear();
      queryClient.clear();
      navigate("/signin");
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["user", "profile"],
    queryFn: authService.getProfile,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "profile"], data);
      localStorage.setItem("user", JSON.stringify(data));
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => authService.changePassword(oldPassword, newPassword),
  });
};
