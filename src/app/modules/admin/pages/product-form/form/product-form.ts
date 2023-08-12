import { FormControl, FormGroup, Validators } from "@angular/forms";

export abstract class ProductForm {
    
    createProductForm(): FormGroup {
        return new FormGroup({
            title: new FormControl(null, Validators.required),
            price: new FormControl(null, Validators.required),
            description: new FormControl(null, Validators.required),
            image: new FormControl('https://i.pravatar.cc'),
            category: new FormControl(null, Validators.required),
        })
    }

}