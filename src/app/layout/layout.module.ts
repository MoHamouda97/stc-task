import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { LanguagesComponent } from './common/languages/languages.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LogoutComponent } from './common/logout/logout.component';
import { StcLoadingBarComponent } from '../shared/components/stc-loading-bar/stc-loading-bar.component';
import { FooterComponent } from './common/footer/footer.component';


@NgModule({
    declarations: [
        LayoutComponent,
        LanguagesComponent,
        LogoutComponent,
        FooterComponent
    ],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,        
        StcLoadingBarComponent,
        SharedModule,
    ],
    exports: []
})
export class LayoutModule {}
