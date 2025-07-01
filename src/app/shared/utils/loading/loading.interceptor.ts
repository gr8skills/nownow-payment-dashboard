import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingProgressService } from './loading-progress.service';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {
  private loaderService = inject(LoadingProgressService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.set(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.loaderService.isLoading.set(false);
      })
    );
  }
}
