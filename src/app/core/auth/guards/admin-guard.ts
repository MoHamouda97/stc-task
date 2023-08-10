import { Injectable } from "@angular/core";
import { Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class AdminGuard  {

    constructor(private router: Router, private toastr: ToastrService) {}

    async canActivate(router: any, state: RouterStateSnapshot) {
        const accessAs = localStorage.getItem('accessAs');

        if (accessAs === 'admin') return true;

        this.router.navigate(['/sign-in']);

        this.toastr.warning('You are not allowed to access that location!!')

        return false;
    }

}