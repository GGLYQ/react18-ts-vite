import { InternalAxiosRequestConfig, AxiosResponse} from 'axios';
// 自定义请求返回数据的类型
interface HData<T> {
  data: T;
  returnCode: string;
  success: boolean;
}
interface InterceptorHooks {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}
interface HRequestConfig extends InternalAxiosRequestConfig {
  // showLoading?: boolean;
  // interceptorHooks?: InterceptorHooks;
}

export { HData, InterceptorHooks, HRequestConfig } 