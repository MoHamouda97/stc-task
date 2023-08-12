import { FormControl, FormGroup, Validators } from "@angular/forms";

export abstract class SignInForm {
    
    createSignInForm(): FormGroup {
        return new FormGroup({
            username: new FormControl<string>('', Validators.required),
            password: new FormControl<string>('', Validators.required),
        })
    }

}