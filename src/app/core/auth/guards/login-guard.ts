import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

export const LoginGuard: CanActivateFn = () => {
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);
    const accessAs = sessionStorage.getItem('accessAs');

    if (!accessAs) return true;

    router.navigate([`/app/${accessAs}`]);

    toastr.warning('You are already logged in!!')

    return false;
}