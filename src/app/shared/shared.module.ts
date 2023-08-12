import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { exportedModules } from './modules/modules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule,       
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule,
        ...exportedModules
    ]
})

export class SharedModule {}
