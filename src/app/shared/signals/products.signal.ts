import { Injectable, signal } from "@angular/core";
import { Product } from "../types/product";

@Injectable({
    providedIn: 'root'
})
export class ProductsSignals {
    products = signal<Product[]>([]);
}