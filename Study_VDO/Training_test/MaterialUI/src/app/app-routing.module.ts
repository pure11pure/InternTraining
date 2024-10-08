import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent } from './input/input.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CardComponent } from './card/card.component';
import { SliderComponent } from './slider/slider.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'auto', component: AutocompleteComponent},
  {path: 'card', component: CardComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'table', component: TableComponent},
  // {path: 'toolbar', component: ToolbarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
