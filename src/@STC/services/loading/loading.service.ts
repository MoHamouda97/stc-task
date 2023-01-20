import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StcLoadingService {
    private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {}

    /**
     * Getter for show
     */
    get show$(): Observable<boolean> {
        return this._show$.asObservable();
    }

    /**
     * Show the loading bar
     */
    show(): void {
        this._show$.next(true);
    }

    /**
     * Hide the loading bar
     */
    hide(): void {
        this._show$.next(false);
    }
}
