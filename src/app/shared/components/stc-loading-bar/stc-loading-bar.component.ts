import { DOCUMENT, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject, takeUntil } from 'rxjs';
import { StcLoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'stc-loading-bar',
  templateUrl: './stc-loading-bar.component.html',
  standalone: true,
  imports: [NgIf, MatProgressBarModule]
})
export class StcLoadingBarComponent implements OnInit, OnDestroy {
  progress: number = 0;
  show: boolean = false;
  unsubscribeAll: Subject<any> = new Subject<any>();

  constructor (
    @Inject(DOCUMENT) private document: any, 
    private stcLoadingService: StcLoadingService) {}
 
  ngOnInit(): void {
    // Subscribe to the service
    this.stcLoadingService.show$
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((value: any) => {
        this.show = value;

        if (this.show) {
          // Add body classes
          this.document.body.classList.add('h-screen', 'overflow-hidden');
        } else {
          // Remove body classes
          this.document.body.classList.remove('h-screen', 'overflow-hidden');
        }
    });
  }

  
 
  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }  
}
