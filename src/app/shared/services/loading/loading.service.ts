import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StcLoadingService {
    private _show$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {}

    get show$(): Observable<boolean> {
        return this._show$.asObservable();
    }

    show(): void {
        this._show$.next(true);
    }

    hide(): void {
        this._show$.next(false);
    }
}
