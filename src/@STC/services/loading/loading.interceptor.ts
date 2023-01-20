import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { StcLoadingService } from './loading.service';

@Injectable()
export class StcLoadingInterceptor implements HttpInterceptor {
    handleRequestsAutomatically: boolean;

    constructor(private stcLoadingService: StcLoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.stcLoadingService.show();

        return next.handle(req).pipe(
            finalize(() => {
                this.stcLoadingService.hide();
            }));
    }
}
