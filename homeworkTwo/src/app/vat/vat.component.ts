import { Component, OnInit } from '@angular/core';

import { BsLocaleService } from 'ngx-bootstrap/datepicker'; //calendar[bootstrap]
import { listLocales } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { defineLocale } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { thBeLocale } from 'ngx-bootstrap/locale'; //calendar[bootstrap]
defineLocale('th-be', thBeLocale); //calendar[bootstrap]
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker'; //calendar[option]
import { format } from 'date-fns';
import { th } from 'date-fns/locale'; //วันที่

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit {
  dateCustomClasses?: DatepickerDateCustomClasses[];

  constructor(
    private msg: NzMessageService,
    private localeService: BsLocaleService, //calendar[bootstrap]
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

  ngOnInit(): void {
  }

  /**
   * -------------------->> Part-two  <<------------------
   */

  //Upload Document 
  uploadDocument({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  /**
   * -------------------->> Part-three <<------------------
   */

  // ข้อมูลการขออนุมัติยื่นแบบรายการรวมกัน > ขออนุมัติยื่นแบบฯ รวมกัน
  checkBoxRequestPermissionTotal(value: string[]): void {
    console.log(value);
  }

  // ข้อมูลการขออนุมัติยื่นแบบรายการรวมกัน > เดือน/ปีภาษี ที่ยื่นรวม
  varRequestChangeMonthAndYear: boolean = true;
  requestChangeMonthAndYear(checked: boolean) {
    this.varRequestChangeMonthAndYear = !checked;
  }

  /**
   * -------------------->> Part-four  <<------------------
   */

  // การพิจารณาและการตรวจสอบ
  //     |> การดำเนินการ
  radioProcess = 'A';
  //     |> วันที่พิจารณา
  input_date = new Date();
  input_date_month = new Date().getMonth()+1
  input_date_year = new Date().getFullYear()+543



  /**
   * -------------------->> Part-five  <<------------------
   */
  listDocument: any[] = [];
  listHistory: any[] = [
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "บันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
    {
      fullName: "นางสาวปัณณพร จึงเปี่ยมสุข",
      process: "เจ้าหน้าที่ลงทะเบียนรับแบบ",
      status: "รอการบันทึกผล",
      updateDate: "2024-07-25T10:21:35Z"
    },
  ];

  //  >> Pagination (table-two) <<
  currentPage = 1;
  pageSize = 10;

  // รู้เลขหน้า
  onPageChange(page: number): void {
    console.log('Current Page:', page)
    this.currentPage = page;
  }

  // รู้จำนวน row ที่ต้องแสดงแต่ละหน้า
  onPageSizeChange(newPageSize: number): void {
    console.log('Page Size:', newPageSize);
    this.pageSize = newPageSize;
  }

  // Date
  formatDate(dateString: string): string {
    // return new Date(dateString).toISOString();
    const date = new Date(dateString);
    const thaiDate = format(date, 'd MMMM yyyy', { locale: th });
    const time = format(date, 'HH:mm น.', { locale: th });
    const buddhistYear = parseInt(format(date, 'yyyy'), 10) + 543;
    return `${thaiDate.replace(format(date, 'yyyy'), buddhistYear.toString())} เวลา ${time}`;

  }






}
