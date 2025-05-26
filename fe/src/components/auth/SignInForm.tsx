import { useState, useCallback, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { useAuthContext } from "../../context/AuthContext";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

const SignInForm = memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, login, isLoading: authLoading } = useAuthContext();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await login({
          email: formData.email.trim(),
          password: formData.password,
        });

        if (result.success && result.userType) {
          // Handle redirect sau khi đăng nhập thành công
          const redirectPath = `/${result.userType}/dashboard`;
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.error("Sign in failed:", error);
        setError("Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.");
      } finally {
        setIsLoading(false);
      }
    },
    [login, formData.email, formData.password, isLoading, navigate]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render form if user is already authenticated
  if (user) {
    return null;
  }

  return (
    <div className="rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="w-full">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <span className="mb-1.5 block font-medium">Bắt đầu miễn phí</span>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Đăng Nhập Vào Hệ Thống Chăm Sóc Sức Khỏe
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="6+ ký tự, 1 chữ hoa"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <span
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="mb-5">
              <Button
                variant="primary"
                className="w-full"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p>
                Chưa có tài khoản?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Đăng Ký
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

SignInForm.displayName = "SignInForm";

export default SignInForm;
