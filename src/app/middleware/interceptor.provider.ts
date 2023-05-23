import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { CacheInterceptor } from "./cache.interceptor";
import { HttpRequestInterceptor } from "./http.interceptor";
import { LoaderInterceptor } from "./loader.interceptor";


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];