import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { HData, InterceptorHooks } from "./type"

class HRequest {
  config: InternalAxiosRequestConfig;
  instance: AxiosInstance;
  interceptorHooks?: InterceptorHooks;
  showLoading?: boolean;
  // loading?: ILoadingInstance
  constructor(options: any,interceptorHooks:InterceptorHooks) {
    this.config = options;
    this.interceptorHooks= interceptorHooks
    this.instance = axios.create(options);
    this.setupInterceptor()
  }

  // 类型参数的作用，T决定AxiosResponse实例中data的类型
  request<T = any>(config: InternalAxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, HData<T>>(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: InternalAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: InternalAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  delete<T = any>(config: InternalAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: InternalAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
  setupInterceptor(): void {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use((config) => {
        //设置loading
      if (this.showLoading) {
        // this.loading = ElLoading.service({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
      }
      return config
    })

    this.instance.interceptors.response.use(
        // 请求完毕，关闭loading
      (res) => {
        // this.loading?.close()
        return res
      },
      (err) => {
        // this.loading?.close()
        return err
      }
    )
  }
}

export default HRequest