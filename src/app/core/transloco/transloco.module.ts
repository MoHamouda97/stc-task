import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig, TranslocoModule, TranslocoService, Translation } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco.http-loader';

@NgModule({
    exports: [
        TranslocoModule
    ],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English'
                    },
                    {
                        id: 'ar',
                        label: 'Arabic'
                    }
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: true
            })
        },
        {
            provide : TRANSLOCO_LOADER,
            useClass: TranslocoHttpLoader
        },
        {
            provide: APP_INITIALIZER,
            deps: [TranslocoService],
            useFactory: (translocoService: TranslocoService): any => (): Promise<Translation> => {
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);
                return translocoService.load(defaultLang).toPromise() as any;
            },
            multi: true
        }
    ]
})
export class TranslocoCoreModule {}
