import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Gateway configuration - Port 80 (nginx container)
const GATEWAY_URL = "http://localhost:80";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - Add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - Handle auth errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Try to refresh token
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            try {
              const response = await axios.post(
                `${GATEWAY_URL}/api/auth/token/refresh/`,
                {
                  refresh: refreshToken,
                }
              );

              const newAccessToken = response.data.access;
              localStorage.setItem("accessToken", newAccessToken);

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axios(originalRequest);
            } catch (refreshError) {
              // Refresh failed, redirect to login
              this.clearAuthData();
              window.location.href = "/signin";
            }
          } else {
            // No refresh token, redirect to login
            this.clearAuthData();
            window.location.href = "/signin";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private clearAuthData() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData");
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

// API Clients - Mapped to correct Gateway routes
export const authApi = new ApiClient(`${GATEWAY_URL}/api/auth`);
export const patientApi = new ApiClient(`${GATEWAY_URL}/api/patient`);
export const doctorApi = new ApiClient(`${GATEWAY_URL}/api/doctor`);
export const appointmentApi = new ApiClient(`${GATEWAY_URL}/api/appointment`);
export const laboratoryApi = new ApiClient(`${GATEWAY_URL}/api/laboratory`);
export const pharmacyApi = new ApiClient(`${GATEWAY_URL}/api/phamarcy`); // Note: phamarcy (typo in backend)
export const billingApi = new ApiClient(`${GATEWAY_URL}/api/billing`);
export const notificationApi = new ApiClient(`${GATEWAY_URL}/api/notifications`);
export const chatbotApi = new ApiClient(`${GATEWAY_URL}/api/chatbot`);
export const chatApi = new ApiClient(`${GATEWAY_URL}/api/chat`);

// Health check
export const healthApi = new ApiClient(GATEWAY_URL);
