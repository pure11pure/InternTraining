import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
    exports:[
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        MatToolbarModule,
        MatIconModule
    ]

})

export class MaterialModule{}