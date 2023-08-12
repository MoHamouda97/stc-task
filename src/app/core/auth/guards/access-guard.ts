import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserType } from "src/app/shared/types/user-type";
import { getSessionInfo } from "src/app/shared/util/session-info";

export const AccessGuard: CanActivateFn = () => {
    const router: Router = inject(Router);
    const toastr: ToastrService = inject(ToastrService);
    const userType: UserType = getSessionInfo('accessAs') as UserType;

    if (userType === 'admin' || userType === 'user') return true;

    router.navigate(['/sign-in']);

    toastr.warning('You are not allowed to access that location!!')

    return false;
}