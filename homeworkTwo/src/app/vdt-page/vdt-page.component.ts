import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'; //calendar[bootstrap]
import { listLocales } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { defineLocale } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { thBeLocale } from 'ngx-bootstrap/locale'; //calendar[bootstrap]
defineLocale('th-be', thBeLocale); //calendar[bootstrap]
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker'; //calendar[option]


@Component({
  selector: 'app-vdt-page',
  templateUrl: './vdt-page.component.html',
  styleUrls: ['./vdt-page.component.scss']
})
export class VdtPageComponent implements OnInit {
  dateCustomClasses?: DatepickerDateCustomClasses[];

  constructor(
    private localeService: BsLocaleService, //calendar[bootstrap]
    private http: HttpClient,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService
  ) {
    this.localeService.use(this.locale); //calendar[bootstrap]
    const now = new Date(); //calendar[option]

    this.dateCustomClasses = [
      {
        date: now,
        classes: ['bg-custom'],
      } //calendar[option]
    ];
  }

  locale = 'th-be'; //calendar[bootstrap]
  locales = listLocales();  //calendar[bootstrap]
  user = "pure"

  ngOnInit(): void {
  }

  // -------[api]-----------------------------------
  // > Cal [response : array(Vat,TaxR,TaxA,TaxFee)]
  getCalPurchaseAmountApi(purchaseAmount: any) {
    const url = `http://localhost:8778/pure-controller/two-get-cal-purchase`
    return this.http.post<any>(url, purchaseAmount).toPromise();
  }
  // > Search by vdt_no [response : array(detail)]
  findByVdtNoApi(vdtNo: string) {
    const url = `http://localhost:8778/pure-controller/two-find-by-vdtNo`
    const body = { vdt_no: vdtNo };
    return this.http.post<any[]>(url, body).toPromise();
  }
  // > Search by date [response : array(vdt_no)]
  findByDateApi(date: string) {
    const url = `http://localhost:8778/pure-controller/two-find-by-date`
    const body = { date: date };
    return this.http.post<any[]>(url, body).toPromise();
  }
  // > Add Table [response : vdt_no]
  addTableApi(create_by: string, data: any) {
    const url = `http://localhost:8778/pure-controller/two-add-db`
    const body = {
      create_by: create_by,
      listData: data
    };
    return this.http.post<any>(url, body, { responseType: 'text' as 'json' }).toPromise();
  }
  // > Edit / Delete [response : "pass"]
  editOrDeleteTableApi(data: any) {
    const url = `http://localhost:8778/pure-controller/two-editOrDelete-db`
    const body = { listData: data };
    return this.http.post<any>(url, body, { responseType: 'text' as 'json' }).toPromise();
  }

  // -------[Model]------------------------------------
  // search
  input_vdtNo: string = "";
  input_date?: Date;

  // form
  input_noBook: string = "";
  input_noNumber: string = "";
  input_dateOfPreparation?: Date;
  input_purchaseAmount: string = "";
  input_taxId: string = "";
  input_branch: string = "";
  input_companyName: string = "";

  // back-end Cal
  cal_purchaseAmount_vat: string = "0.00";
  cal_purchaseAmount_refund_revenue: string = "0.00";
  cal_purchaseAmount_refund_agent: string = "0.00";
  cal_purchaseAmount_refund_fee: string = "0.00";

  /**
   * Pattern 
   */
  originalValue_taxId: string = "";

  checkDigit: boolean = true;
  // [taxId] ต้องมี 13 ตัวเท่านั้น!
  onInputChange_taxId(event: any) {
    let value = event.target.value; //input
    let pattern = /^\d{0,13}$/;
    if (pattern.test(value)) {
      this.input_taxId = value;
      this.originalValue_taxId = this.input_taxId; // เซฟค่าที่ถูกต้องไว้ในกรณีที่ผู้ใช้เปลี่ยนแปลง
    } else {
      event.target.value = this.originalValue_taxId; // คืนค่าให้เป็นค่าเดิมถ้าไม่ตรงเงื่อนไข
    }

    // https://memo8.com/check-digit-thai-citizen-id-validator/
    if (value.length == 13) {
      let total: number = 0;
      for (let i = 0; i < 12; i++) {
        // console.log(value[i] * (13 - i))
        total += value[i] * (13 - i)
      }
      let digitTest = (11 - (total % 11)).toString().padStart(2, '0')[1]
      if (value[12] != digitTest) {
        this.createNotification("error", "เลขประจำตัวผู้เสียภาษีอากรไม่ถูกต้อง", "")
        this.checkDigit = false;
      } else {
        this.checkDigit = true;
      }
    }
  }

  // [branch] ต้องมี 5 ตัวเท่านั้น!
  originalValue_branch: string = "";
  onInputChange_branch(event: any) {
    let value = event.target.value;
    let pattern = /^[a-zA-Z]{0,2}\d{0,3}$/;
    if (pattern.test(value)) {
      this.input_branch = value;
      this.originalValue_branch = this.input_branch; // เซฟค่าที่ถูกต้องไว้ในกรณีที่ผู้ใช้เปลี่ยนแปลง
    } else {
      event.target.value = this.originalValue_branch; // คืนค่าให้เป็นค่าเดิมถ้าไม่ตรงเงื่อนไข
    }
  }

  // [purchase] 
  formatInputMoney(event: any) {
    let value = event.target.value; //input
    value = value.replace(/[^\d.]/g, ''); // เอาตัวเลข กับ จุด => 120.50
    let parts = value.split('.'); // แบ่งเป็น จำนวนเต็ม กับ ทศนิยม => ['120', '50']

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

  // Cal 
  async cal_purchaseAmount(value: any) {
    const purchaseAmount = parseFloat(value);
    if (purchaseAmount > 0)
      try {
        const response = await this.getCalPurchaseAmountApi(purchaseAmount);
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

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
  addCommas(value: string): string {
    const parts = value.split('.');  // ['120', '50']
    let part0 = parts[0];
    const part2 = parts.length > 1 ? '.' + parts[1] : '';
    const rgx = /(\d+)(\d{3})/; //แบ่งกลุ่ม ตัวเลข1หรือมากกว่า + ตัวเลข3ตัวท้ายติดกัน
    while (rgx.test(part0)) {
      part0 = part0.replace(rgx, '$1' + ',' + '$2');
    }
    return part0 + part2;
  }

  /**
   * Search
   */
  visibleSearchDate: boolean = false;
  listVdtNo: any[] = [];

  async search() {
    if (this.input_vdtNo && this.input_date) {
      this.createNotification("info", "กรุณากรอกอย่างใดอย่างหนึ่ง", "")
      console.log("ค้นหา 2 อย่าง")
    } else if (this.input_date) {
      this.visibleSearchDate = true;
      // Sun Jan 01 2017 08:08:26 GMT+0700 > 2002-06-19T08:44:08.344Z
      const dataString = this.formatDateChange(this.input_date.toString());
      const list = await this.findByDateApi(dataString)
      this.listVdtNo = list;
    } else if (this.input_vdtNo) {
      try {
        const list = await this.findByVdtNoApi(this.input_vdtNo)
        if (list.length == 0) {
          this.createNotification("warning", "ไม่พบข้อมูล", "")
        } else {
          this.listdata = list;
        }
      } catch (error) {
        console.error('generateRandomString Error:', error);
      }
    } else {
      this.createNotification("warning", "กรุณากรอกข้อมูล", "")
      this.listdata = []
    }
    this.set = this.listdata // [nzData]="set" > true
    this.input_vdtNo = ""
    this.input_date = undefined
  }
  // choose vdt from date
  selectVdtNo(vdt: any) {
    this.visibleSearchDate = false;
    this.input_vdtNo = vdt;
    this.search()
  }

  /**
   * add to table
   */
  listdata: any[] = [
  ];
  set: any[] = [];

  // addRow
  addtoTable() {

    // console.log('add / save')
    let editItem = {};
    let newItem = {};
    if (this.modeedit) {

      editItem = {
        id: this.listdata[this.indexEdit].id,
        noBook: this.input_noBook, //เล่มที่
        noNumber: this.input_noNumber, //เลขที่
        dateOfPreparation: this.input_dateOfPreparation, //วันที่จัดทำ ก.พ. 
        companyName: this.input_companyName, //สถานประกอบการ
        purchaseAmount: parseFloat(this.input_purchaseAmount.replace(/[^\d.]/g, '')).toFixed(2).toString(), //ยอดซื้อ
        vat: this.cal_purchaseAmount_vat, //ภาษีมูลค่าเพิ่ม
        taxRefundRevenueDepartment: this.cal_purchaseAmount_refund_revenue, //ภาษีที่ได้รับคืน (กรมสรรพากร)
        taxRefundAgent: this.cal_purchaseAmount_refund_agent, //ภาษีที่ได้รับคืน (ตัวแทน)
        taxRefundFee: this.cal_purchaseAmount_refund_fee, //ค่าธรรมเนียมในการคืน
        taxId: this.input_taxId.substring(0, 13), //[เลขประจำตัวผู้เสียภาษีอากร]
        branch: this.input_branch.substring(0, 5), //[สาขาที่]
        createBy: this.listdata[this.indexEdit].createBy, //รอบแรกครั้งเดียว
        createDate: this.listdata[this.indexEdit].createDate, //รอบแรกครั้งเดียว
        updateBy: this.user,
        updateDate: new Date(),
        vdtNo: this.listdata[this.indexEdit].vdtNo
      };

      // newItem = {};

    } else {
      newItem = {
        id: 0,
        noBook: this.input_noBook, //เล่มที่
        noNumber: this.input_noNumber, //เลขที่
        dateOfPreparation: this.input_dateOfPreparation, //วันที่จัดทำ ก.พ. 
        companyName: this.input_companyName, //สถานประกอบการ
        purchaseAmount: parseFloat(this.input_purchaseAmount.replace(/[^\d.]/g, '')).toFixed(2).toString(), //ยอดซื้อ
        vat: this.cal_purchaseAmount_vat, //ภาษีมูลค่าเพิ่ม
        taxRefundRevenueDepartment: this.cal_purchaseAmount_refund_revenue, //ภาษีที่ได้รับคืน (กรมสรรพากร)
        taxRefundAgent: this.cal_purchaseAmount_refund_agent, //ภาษีที่ได้รับคืน (ตัวแทน)
        taxRefundFee: this.cal_purchaseAmount_refund_fee, //ค่าธรรมเนียมในการคืน
        taxId: this.input_taxId.substring(0, 13), //[เลขประจำตัวผู้เสียภาษีอากร]
        branch: this.input_branch.substring(0, 5), //[สาขาที่]
        createBy: this.user, //รอบแรกครั้งเดียว
        createDate: new Date(), //รอบแรกครั้งเดียว
        updateBy: this.user,
        updateDate: new Date(),
        vdtNo: 0
      };

      // editItem = {};
    }

    // check data กรอกครบทุกตัว
    let isComplete = false
    if (newItem) {
      isComplete = Object.values(newItem).every(value => value !== null && value !== undefined && value !== "");
    } else {
      isComplete = Object.values(editItem).every(value => value !== null && value !== undefined && value !== "");
    }

    console.log(this.checkDigit)
    // check tax_id & branch & กรอกครบทุกตัว
    if (this.input_taxId.substring(0, 13).length == 13 && this.input_branch.substring(0, 5).length == 5 && isComplete) {
      // เลข ปชช. ตรง
      if (this.checkDigit) {
        if (this.modeedit) {
          this.listdata[this.indexEdit] = editItem;
          this.modeedit = false;
          this.indexEdit = -1;
        } else {
          this.listdata.push(newItem)
        }
        this.set = this.listdata
        this.clearSome();
      }
      // เลขปชช. ไม่ตรง
      else {
        this.createNotification("warning", "เลขประจำตัวผู้เสียภาษีอากรไม่ถูกต้อง", "")
      }

    }
    else if (!isComplete) {
      this.createNotification("warning", "โปรดกรอกข้อมูลให้ครบ", "")
    }
    else if (this.input_taxId.length < 13) {
      this.createNotification("warning", "โปรดกรอกเลขประจำตัวผู้เสียภาษีอากรให้ครบ", "")
    }
    else if (this.input_branch.length < 5) {
      this.createNotification("warning", "โปรดกรอกสาขาให้ครบ", "")
    }
    else {
      this.createNotification("error", "กรณีพิเศษ", "addtoTable")
    }
  }

  // > noti
  createNotification(type: string, message: string, response: string): void {
    this.notification.create(
      type,
      message,
      response
    );
  }


  // deleteRow
  deleteRow(index: number) {
    this.listdata.splice(index, 1);
    this.modeedit = false;
    this.indexEdit = -1;
  }

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(i: any): void {
    this.nzMessageService.info('click confirm');
    this.deleteRow(i);
  }

  // editRow
  modeedit: boolean = false;
  indexEdit: number = -1;
  editRow(index: number) {
    // console.log(this.listdata[index])
    this.modeedit = true;
    this.indexEdit = index;

    this.input_noBook = this.listdata[index].noBook;
    this.input_noNumber = this.listdata[index].noNumber;

    this.input_dateOfPreparation = new Date(this.listdata[index].dateOfPreparation);
    this.input_purchaseAmount = this.addCommas(this.listdata[index].purchaseAmount);
    this.input_taxId = this.listdata[index].taxId;
    this.input_branch = this.listdata[index].branch;
    this.input_companyName = this.listdata[index].companyName;
    this.cal_purchaseAmount(this.listdata[index].purchaseAmount.replace(",", ""))
  }

  /**
   * Back-end
   */
  async addTable() {
    try {
      if (this.listdata.length == 0) {
        this.createNotification("error", "กรุณาเพิ่ม/กรอกข้อมูล", "")
      } else if (this.listdata[0].vdtNo) {
        console.log("edit", this.listdata)
        const message = await this.editOrDeleteTableApi(this.listdata)
        this.createNotification("success", "แก้ไขใบสรุปเรียบร้อยแล้ว", "")
      } else if (this.listdata.length > 0) {
        console.log("add", this.listdata)
        const vdtNo = await this.addTableApi(this.user, this.listdata)
        this.createNotification("success", "เพิ่มใบสรุปเรียบร้อยแล้ว", vdtNo)
      } else {
        this.createNotification("error", "กรณีพิเศษ", "addTable")
      }
      this.clearAll()
    } catch (error) {
      console.error('generateRandomString Error:', error);
    }

  }

  clearSome() {
    this.input_noBook = '';
    this.input_noNumber = '';
    this.input_dateOfPreparation = undefined;
    this.input_purchaseAmount = '';
    this.input_taxId = '';
    this.input_branch = '';
    this.input_companyName = '';
    this.cal_purchaseAmount_vat = "0.00";
    this.cal_purchaseAmount_refund_revenue = "0.00";
    this.cal_purchaseAmount_refund_agent = "0.00";
    this.cal_purchaseAmount_refund_fee = "0.00";
  }

  clearAll() {
    this.clearSome()
    this.modeedit = false;
    this.indexEdit = -1;
    this.listdata = [];
    this.set = [];
    // this.createNotification("success", "ล้างจอภาพ", "")

  }



  // convert
  convertToBuddhistEra(dateString: any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear() + 543;
    return `${day}/${month}/${year}`;
  }

  // เปลี่ยนรูปแบบวันที่
  formatDateChange(dateToString: string) {
    const date = new Date(dateToString);
    if (isNaN(date.getTime())) {
      return "";
    } else {
      // Sun Jan 01 2017 08:08:26 GMT+0700 > 2002-06-19T08:44:08.344Z
      const date = new Date(dateToString);
      const isoDate = date.toISOString(); // Convert to ISO 8601 format (UTC)
      return isoDate;
    }
  }
}
