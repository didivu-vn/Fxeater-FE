import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (req.headers.get('x-none-loader')) {
      req = req.clone({ headers: req.headers.delete('x-none-loader') });
      return next.handle(req);
    }

    this.loaderService.startLoader();
    return next.handle(req).pipe(
      finalize(() => this.loaderService.stopLoader()),
    );
  }
}