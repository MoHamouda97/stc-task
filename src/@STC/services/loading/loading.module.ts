import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StcLoadingInterceptor } from './loading.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: StcLoadingInterceptor,
            multi: true
        }
    ]
})
export class StcLoadingModule {}
