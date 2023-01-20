import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule()
export class IconsModule {

    constructor(
        private domSanitizer: DomSanitizer,
        private matIconRegistry: MatIconRegistry) {
        // Register icon sets
        this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('mat_outline', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('mat_solid', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-solid.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('feather', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/feather.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-outline.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-solid.svg'));
    }
}
