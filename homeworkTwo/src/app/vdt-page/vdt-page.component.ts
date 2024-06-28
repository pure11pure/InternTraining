import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'; //calendar[bootstrap]
import { listLocales } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { defineLocale } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { thBeLocale } from 'ngx-bootstrap/locale'; //calendar[bootstrap]
defineLocale('th-be', thBeLocale); //calendar[bootstrap]
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vdt-page',
  templateUrl: './vdt-page.component.html',
  styleUrls: ['./vdt-page.component.scss']
})
export class VdtPageComponent implements OnInit {

  constructor(
    private localeService: BsLocaleService, //calendar[bootstrap]
    private http: HttpClient,
  ) {
    this.localeService.use(this.locale); //calendar[bootstrap]
  }

  locale = 'th-be'; //calendar[bootstrap]
  locales = listLocales();  //calendar[bootstrap]

  ngOnInit(): void {
  }

  getCalPurchaseAmountApi(purchaseAmount: any) {
    const url = `http://localhost:8778/pure-controller/two-get-cal-purchase`
    return this.http.post<any>(url, purchaseAmount).toPromise();
  }

  input_vdtNo: string = "";
  input_date: string = "";

  input_noBook: string = "";
  input_noNumber: string = "";
  input_dateOfPreparation: string = "";
  input_purchaseAmount: string = "";
  input_taxId: string = "";
  input_branch: string = "";
  input_companyName: string = "";

  cal_purchaseAmount_vat: string = "0.00";
  cal_purchaseAmount_refund_revenue: string = "0.00";
  cal_purchaseAmount_refund_agent: string = "0.00";
  cal_purchaseAmount_refund_fee: string = "0.00";

  /**
   * pattern
   */
  originalValue_taxId: string = "";
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

  originalValue_branch: string = "";
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
    this.cal_purchaseAmount(value); //cal_purchaseAmount
    event.target.value = this.addCommas(value);  //add comma

  }

  async cal_purchaseAmount(value: any) {
    const purchaseAmount = parseFloat(value);
    console.log(purchaseAmount)

    if (purchaseAmount > 0)
      try {
        const response = await this.getCalPurchaseAmountApi(purchaseAmount);
        console.log(response)
        this.cal_purchaseAmount_vat = response.vat.toFixed(2);
        this.cal_purchaseAmount_refund_revenue = response.refundRevenue.toFixed(2);
        this.cal_purchaseAmount_refund_agent = response.refundAgent.toFixed(2);
        this.cal_purchaseAmount_refund_fee = response.refundFee.toFixed(2);
      } catch (error) {
        console.error('get course API Error:', error);
      }
    else {
      this.cal_purchaseAmount_vat = "0.00";
      this.cal_purchaseAmount_refund_revenue = "0.00";
      this.cal_purchaseAmount_refund_agent = "0.00";
      this.cal_purchaseAmount_refund_fee = "0.00";
    }
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


  /**
   * add to table
   */
  listdata: any[] = [
    {
      noBook: "PO123",
      noNumber: "321",
      dateOfPreparation: "Tue Jun 11 2024 10:39:53 GMT+0700",
      purchaseAmount: "187,932",
      taxId: "1101501167631",
      branch: "KL832",
      companyName: "company"
    }
  ];
  addtoTable() {
    console.log('add')

    const newItem = {
      noBook: this.input_noBook,
      noNumber: this.input_noNumber,
      dateOfPreparation: this.input_dateOfPreparation, 
      companyName: this.input_companyName,
      purchaseAmount: this.input_purchaseAmount,
      vat : this.cal_purchaseAmount_vat,
      taxRefundRevenue: this.cal_purchaseAmount_refund_revenue,
      taxRefundAgent: this.cal_purchaseAmount_refund_agent,
      taxRefundFee: this.cal_purchaseAmount_refund_fee,
      taxId: this.input_taxId.substring(0,13), //เลขประจำตัวผู้เสียภาษีอากร
      branch: this.input_branch.substring(0,5), //สาขาที่
      create_by : "pure",
      create_date : new Date(),
      update_by : "pure",
      update_date : new Date()
    };

    const isComplete = Object.values(newItem).every(value => value !== null && value !== undefined && value !== "");

    if (this.input_taxId.substring(0,13).length == 13 && this.input_branch.substring(0,5).length == 5 && isComplete) {
      console.log("ครบ")
      this.listdata.push(newItem)
      console.log(this.listdata)
    }
    else if (!isComplete) {
      alert("กรอกข้อมูลให้ครบ")
    }
    else if (this.input_taxId.length < 13){
      alert("กรอกเลขประจำตัวผู้เสียภาษีอากรให้ครบ")
    }
    else if (this.input_branch.length < 5){
      alert("กรอกสาขาให้ครบ")
    }
    else{
      console.log(newItem)
    }

    // const condition = (this.input_noBook && this.input_noNumber && this.input_dateOfPreparation && this.input_purchaseAmount && this.input_taxId && this.input_branch && this.input_companyName) 

   
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
