import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

export type CustomAxiosConfig = InternalAxiosRequestConfig & {
    _retry: boolean;
};
export type CustomAxiosResponse<T = unknown> = Omit<AxiosResponse<T>, "config"> & {
    config: CustomAxiosConfig;
};
export const axiosInstance = axios.create({
    baseURL:
        // eslint-disable-next-line
           !(window as any).VITE_BACKEND_URL
            ? `${(window as any).VITE_BACKEND_URL}/api/`
            : "https://dikidi-booking-api.onrender.com/api/",
});
const requestInterceptor = (configRaw: AxiosRequestConfig): CustomAxiosConfig => {
    const config: CustomAxiosConfig = configRaw as CustomAxiosConfig;
    const ss = sessionStorage.getItem("token");

    if (ss) {
        config.headers.Authorization = `Bearer ${ss}`;
    }

    return config;
};
type CustomAxiosArgs =
    | { type: "get"; url: string; config?: AxiosRequestConfig }
    | { type: "delete"; url: string; config?: AxiosRequestConfig }
    | { type: "post"; url: string; body: object; config?: AxiosRequestConfig }
    | { type: "put"; url: string; body: object; config?: AxiosRequestConfig }
    | { type: "postForm"; url: string; body: object; config?: AxiosRequestConfig };

axiosInstance.interceptors.request.use(requestInterceptor);

export const createAxiosApi = () => {
    return <T>(args: CustomAxiosArgs) => {
        const config: CustomAxiosConfig = { ...(args.config || {}) } as CustomAxiosConfig;

        config._retry = false;

        const handleResponse = <T>(resp: AxiosResponse<T>): AxiosResponse<T> => {
            const { ...config } = resp as CustomAxiosResponse<T>;

            if (!config) return resp;

            return resp;
        };

        switch (args.type) {
            case "get":
                return axiosInstance.get<T>(args.url, config).then(handleResponse);
            case "delete":
                return axiosInstance.delete<T>(args.url, config).then(handleResponse);
            case "post":
                return axiosInstance.post<T>(args.url, args.body, config).then(handleResponse);
            case "put":
                return axiosInstance.put<T>(args.url, args.body, config).then(handleResponse);
            case "postForm":
                return axiosInstance.postForm<T>(args.url, args.body, config).then(handleResponse);
            default:
                return axiosInstance.get<T>("WrongUrl_FixMe!", config).then(handleResponse);
        }
    };
};
