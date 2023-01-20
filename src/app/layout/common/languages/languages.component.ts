import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguagesComponent {
  availableLangs: any;
  activeLang: string;
  flagCodes: any;

  constructor(private translocoService: TranslocoService) {}  

     ngOnInit(): void {
      this.availableLangs = this.translocoService.getAvailableLangs();

      this.translocoService.langChanges$.subscribe((activeLang: any) => {
        this.activeLang = activeLang;
      });

      this.flagCodes = {
        'en': 'us',
        'ar': 'eg'
    };
  }    


  setActiveLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }  
}
