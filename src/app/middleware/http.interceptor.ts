import { Injectable } from '@angular/core';import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap, tap } from "rxjs/operators";
import { AuthService } from '../service';


@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private authService: AuthService
   ){ }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const userToken = this.authService.getUser()

    if(userToken && Object.keys(userToken).length === 0) {
      return next.handle(request);
    }

    request = this.addAuthenticationToken(request)

    return next.handle(request).pipe(
      catchError(
        (err: any) => {
          if(err instanceof HttpErrorResponse && err.status === 401){
            // console.log('handle 401')
            return this.handle401Error(request, next)
          }else{
            // console.log('not handle 401')
            return throwError(err)
          }
        }
      ),
    )
  }

  addAuthenticationToken(request:HttpRequest<any>) {
    // Get access token from Local Storage
    const accessToken = this.authService.getUser();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
        return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
          Authorization: `Bearer ${this.authService.getUser().access}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.isRefreshing) {
      // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
      // – which means the new token is ready and we can retry the request again
      return this.refreshTokenSubject.pipe(
        filter((result:any) => result !== null),
        take(1),
        switchMap(() => next.handle(this.addAuthenticationToken(request))));
    } else {
      // Set flag refreshing start
      this.isRefreshing = true;

      // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
      this.refreshTokenSubject.next(null);

      // Send refresh request
      return this.authService.refresh(this.authService.getUser().refresh)
        .pipe(
          tap((jwt:any) => {this.authService.updateToken(jwt)}
          ),
          switchMap((jwt:any) => {
            this.isRefreshing = false
            this.refreshTokenSubject.next(jwt)

            return next.handle(this.addAuthenticationToken(request));
          })
        )  
    }
  }
}
