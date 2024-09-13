import { Injectable } from '@angular/core';
import { colorEntity } from '../Entity/colorEntity';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  GetColorList(): colorEntity[]{
    return[
      {code: 'c1', name: 'violet'},
      {code: 'c2', name: 'blue'},
      {code: 'c3', name: 'green'},
      {code: 'c4', name: 'yellow'},
      {code: 'c5', name: 'orange'},
      {code: 'c6', name: 'red'},
    ]
  }
}
