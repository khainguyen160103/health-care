import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User, login } from "../types/userType";
import { authService } from "../services";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: login) => Promise<{ success: boolean; userType?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Lấy user từ localStorage khi khởi tạo
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("access_token");
    // Khôi phục thông tin đăng nhập từ localStorage

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (data: login): Promise<{ success: boolean; userType?: string }> => {
      const { email, password } = data;
      try {
        setIsLoading(true);

        const response = await authService.login({ email, password });

        if (response.user && response.access) {
          // Lưu vào localStorage trước
          localStorage.setItem("user", JSON.stringify(response.user));
          localStorage.setItem("access_token", response.access);
          localStorage.setItem("refresh_token", response.refresh);

          // Update state
          setUser(response.user);
          setToken(response.access);

          toast.success("Đăng nhập thành công");

          // Trả về thông tin để component tự xử lý redirect
          return { success: true, userType: response.user.user_type };
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Đăng nhập thất bại";
        toast.error(errorMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Đăng xuất thành công");
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
