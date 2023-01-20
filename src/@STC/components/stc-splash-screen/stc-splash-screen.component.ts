import { DOCUMENT, NgIf } from '@angular/common';
import { delay, Subject, takeUntil } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'stc-splash-screen',
  templateUrl: './stc-splash-screen.component.html',
  styleUrls: ['./stc-splash-screen.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class StcSplashScreenComponent implements OnInit {
  show: boolean = true;
  unsubscribeAll: Subject<any> = new Subject<any>();
  
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  /**
   * OnInit
   */  
  ngOnInit(): void {
    this.router.events.pipe(
      delay(500),
      takeUntil(this.unsubscribeAll)
    ).subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.show = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.show = false;

          this.document.getElementsByTagName('stc-splash-screen')[0].remove();

          this.unsubscribeAll.next(null);
          this.unsubscribeAll.complete();
        }
      }
    )    
  }  
}
