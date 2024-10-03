import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MasterService } from '../service/master.service';
import { colorEntity } from '../Entity/colorEntity';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  colorArray = ['red', 'yellow', 'green', 'blue', 'pink']
  filterOption!: Observable<string[]>
  filterOptionList!: Observable<colorEntity[]>
  formcontrol = new FormControl('')

  colorArrayList!: colorEntity[];

  constructor(
    private service: MasterService
  ) { 
    this.colorArrayList = this.service.GetColorList()
  }

  ngOnInit(): void {
    // this.filterOption = this.formcontrol.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._FITTER(value || ''))
    // )

    this.filterOptionList = this.formcontrol.valueChanges.pipe(
      startWith(''),
      map(value => this._FITTER2(value || ''))
    )
  }


  private _FITTER(value: string): string[] {
    const searchValue = value.toLowerCase()
    return this.colorArray.filter(option => option.toLowerCase().includes(searchValue))
  }

  private _FITTER2(value: string): colorEntity[] {
    const searchValue = value.toLowerCase()
    return this.colorArrayList.filter(option => option.name.toLowerCase().includes(searchValue) || option.code.toLowerCase().includes(searchValue))
  }
}