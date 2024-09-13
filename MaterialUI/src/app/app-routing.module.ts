import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'auto', component: AutocompleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
