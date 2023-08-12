import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ProductsService } from "../services/products.service";

@Injectable({
    providedIn: 'any'
})

export class SingleProductResolver  {
    constructor(private service: ProductsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> {
        const id: any = route.paramMap.get('id');

        return this.service.getProduct(id);
    }
}