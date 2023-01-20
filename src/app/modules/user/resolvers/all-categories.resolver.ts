import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoriesService } from "../services/categories.service";

@Injectable({
    providedIn: 'any'
})

export class AllCategoriesResolver implements Resolve<any> {
    constructor(private service: CategoriesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
        return this.service.getAll()
    }
}