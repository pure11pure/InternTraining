import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    exports:[
        MatInputModule,
        MatFormFieldModule,
        FormsModule
    ]

})

export class MaterailModule{}