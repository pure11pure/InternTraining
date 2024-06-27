import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'; //calendar[bootstrap]
import { listLocales } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { defineLocale } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { thBeLocale } from 'ngx-bootstrap/locale'; //calendar[bootstrap]
defineLocale('th-be', thBeLocale); //calendar[bootstrap]

@Component({
  selector: 'app-vdt-page',
  templateUrl: './vdt-page.component.html',
  styleUrls: ['./vdt-page.component.scss']
})
export class VdtPageComponent implements OnInit {

  constructor(
    private localeService: BsLocaleService, //calendar[bootstrap]
  ) {
    this.localeService.use(this.locale); //calendar[bootstrap]
  }

  locale = 'th-be'; //calendar[bootstrap]
  locales = listLocales();  //calendar[bootstrap]

  ngOnInit(): void {
  }

  input_vdtNo: string = "";
  input_date : string = "";
  input_noBook : string = "";
  input_noNumber : string = "";
  input_dateOfPreparation : string = "";
  input_purchaseAmount : string = "";
  input_taxId : string = "";
  input_branch : string = "";
  input_companyName : string = "";


  
  errorMessage: string = "";

  originalValue_taxId : string = ""; 
  onInputChange_taxId(event: any) {
    let value = event.target.value;
    let pattern = /^\d{0,13}$/; // ตรวจสอบเฉพาะตัวเลขและไม่เกิน 13 ตัว
    if (pattern.test(value)) {
      this.input_taxId = value;
      this.originalValue_taxId = this.input_taxId; // เซฟค่าที่ถูกต้องไว้ในกรณีที่ผู้ใช้เปลี่ยนแปลง
    } else {
      event.target.value = this.originalValue_taxId; // คืนค่าให้เป็นค่าเดิมถ้าไม่ตรงเงื่อนไข
    }
  }

  originalValue_branch : string = ""; 
  onInputChange_branch(event: any) {
    let value = event.target.value;
    let pattern = /^[a-zA-Z]{0,2}\d{0,3}$/; // ตรวจสอบเฉพาะตัวเลขและไม่เกิน 13 ตัว
    if (pattern.test(value)) {
      this.input_branch = value;
      this.originalValue_branch = this.input_branch; // เซฟค่าที่ถูกต้องไว้ในกรณีที่ผู้ใช้เปลี่ยนแปลง
    } else {
      event.target.value = this.originalValue_branch; // คืนค่าให้เป็นค่าเดิมถ้าไม่ตรงเงื่อนไข
    }
  }

  formatInputMoney(event: any) {
      let value = event.target.value;
      // ตัดทุกตัวอักษรที่ไม่ใช่ตัวเลขหรือจุดทศนิยมออก
      value = value.replace(/[^\d.]/g, ''); // 120.50
      
      let parts = value.split('.'); // ['120', '50']

      // ตรวจสอบว่ามีจุดทศนิยมมากกว่า 1 ตัวหรือไม่
      if (parts.length > 2) {
        //  ['120', '50', '']
        parts = [parts[0], parts[1]];
      }
  
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 2); //ทศนิยม 2 ตำแหน่ง
        value = parts.join('.'); // 120.50
      }

      event.target.value = this.addCommas(value);  //add comma
  
  }

  addCommas(value: string): string {
    const parts = value.split('.');  // ['120', '50']
    let part0 = parts[0];
    const part2 = parts.length > 1 ? '.' + parts[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(part0)) {
      part0 = part0.replace(rgx, '$1' + ',' + '$2');
    }
    return part0 + part2;
  }







  listOfData: any[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
