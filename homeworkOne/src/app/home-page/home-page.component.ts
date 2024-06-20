import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker'; //calendar[bootstrap]
import { listLocales } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { defineLocale } from 'ngx-bootstrap/chronos'; //calendar[bootstrap]
import { thBeLocale } from 'ngx-bootstrap/locale'; //calendar[bootstrap]
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient } from '@angular/common/http'; //API
defineLocale('th-be', thBeLocale); //calendar[bootstrap]
//calendar[npm install ngx-bootstrap@7.1.2 --save]

interface Employee {
  idUsers: number,
  firstName: string,
  lastName: string,
  birthday: string,
  age: number,
  gender: string,
  createDate: string,
  createBy: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
    this.getAll();
  }

  constructor(
    private modal: NzModalService,
    private localeService: BsLocaleService, //calendar[bootstrap]
    private notification: NzNotificationService,
    private http: HttpClient
  ) {
    this.localeService.use(this.locale); //calendar[bootstrap]
  }

  locale = 'th-be'; //calendar[bootstrap]
  locales = listLocales();  //calendar[bootstrap]

  // user: string = 'jukbie';
  user: string = 'pure';
  employees: Employee[] = [];

  // Form
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  age?: number;
  gender?: string;
  message_age_error?: string;


  headData = [
    {
      id: 1,
      title: "ผู้ใช้งาน",
      active: true,
      disabled: false,
      data: ["test"]
    }
  ]

  // ------API------
  getAll() {
    this.http.get<any>(
      'http://localhost:8778/pure-controller/jpa-selectAll', {}).toPromise().then((response) => {
        this.employees = response;
        console.log("getAll: ", this.employees);
        this.getEmployees()
      })
  }

  deleleApi(idUsers: any) {
    // console.log("deleleApi: ", idUsers)
    this.http.post<any>(
      'http://localhost:8778/pure-controller/jpa-delete', idUsers).toPromise().then((response) => {
        console.log("response post[jpa-delete] ");
        this.searchEmployees('delete');
      })
  }

  addApi(data: any) {
    // console.log("addApi: ", data)
    this.http.post<any>(
      'http://localhost:8778/pure-controller/jpa-add', data).toPromise().then((response) => {
        console.log("response post [jpa-add] ");
        this.getAll();
        this.searchEmployees('add');
      })
  }

  editApi(data: any) {
    // console.log("editApi: ", data)
    this.http.post<any>(
      'http://localhost:8778/pure-controller/jpa-edit', data).toPromise().then((response) => {
        console.log("response post [jpa-edit] ");
        this.getAll();
        this.searchEmployees('edit');
      })
  }

  searchApi(data: any) {
    // console.log("searchApi: ", data)
    this.http.post<any>(
      'http://localhost:8778/pure-controller/jpa-search', data).toPromise().then((response) => {
        console.log("response post [jpa-search] ");
        this.dataEmployees = response;
        this.PaginationEmployees();
      })
  }

  calculatorApi(data: any) {
    // console.log("calculatorApi: ", data)
    this.http.post<any>(
      'http://localhost:8778/pure-controller/calculatorAge', data).toPromise().then((response) => {
        console.log("response post [calculatorAge]");
        this.age = response;
      })
  }

  // ------------

  /**
   *   panel (optional)
   */
  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    this.headData.forEach(panel => {
      if (panel.id === id) {
        panel.active = checked;
      } else {
        panel.active = false;
      }
    });
  }

  /**
   * Search & getEmployees
   */
  dataEmployees: Employee[] = [];  // filter / no_filter
  dataShowEmployees: Employee[] = []; // show 5 rows
  pageSize: number = 5;
  PageIndex: number = 1;
  TotalSize: number = 0;

  getEmployees(): void {
    console.log("employees getEmployees", this.employees)
    this.dataEmployees = this.employees;
    this.searchEmployees('');
    this.PaginationEmployees();
  }

  PaginationEmployees(): void {
    // จัดหน้า แสดงข้อมูลแบบจำกัด  row
    let start = (this.PageIndex - 1) * this.pageSize;
    let end = this.PageIndex * this.pageSize;
    this.dataShowEmployees = this.dataEmployees.slice(start, end);
    this.TotalSize = this.dataEmployees.length * 2;
    console.log("dataShowEmployees", this.dataShowEmployees)
  }

  handlePageIndexChange(pageIndex: number): void {
    // เลื่อนหน้า
    this.PageIndex = pageIndex;
    this.PaginationEmployees()
  }

  // search
  isVisibleFilter = false;  //btn 'ค้นหาเพิ่มเติม'
  fullname_filter?: string;
  idUsers_filter?: number;
  age_filter?: number;
  gender_filter?: string;
  createDate_filter?: string;
  createBy_filter?: string;
  birthday_filter?: string;

  fullname_search?: string;
  idUsers_search?: number;
  age_search?: number;
  gender_search?: string;
  createDate_search?: string;
  createBy_search?: string;
  birthday_search?: string;

  searchFilter(){
    this.fullname_search = this.fullname_filter;
    this.idUsers_search = this.idUsers_filter;
    this.age_search = this.age_filter;
    this.gender_search = this.gender_filter;
    this.createDate_search = this.createDate_filter;
    this.createBy_search = this.createBy_filter;
    this.birthday_search = this.birthday_filter;
    this.searchEmployees('');
  }

  searchEmployees(command: string) {
    const nameParts: string[] = this.fullname_search ? this.fullname_search.split(" ") : [];
    let [first_name = "", last_name = ""] = nameParts;

    const formData: Employee = {
      idUsers: this.idUsers_search ? this.idUsers_search : 0,
      firstName: first_name ? first_name : '',
      lastName: last_name ? last_name : '',
      birthday: this.formatDateChange(this.birthday_search + ''),
      age: this.age_search ? this.age_search : 0,
      gender: this.gender_search ? this.gender_search : '',
      createDate: this.formatDateChange(this.createDate_search + ''),
      createBy: this.createBy_search ? this.createBy_search : ''
    };

    this.searchApi(formData)
    console.log("command[searchEmployees]: ", command)
  }

  clearFormFilter() {
    this.fullname_filter = '';
    this.idUsers_filter = undefined;
    this.age_filter = undefined;
    this.gender_filter = '';
    this.createDate_filter = '';
    this.birthday_filter = '';
    this.createBy_filter = '';
    this.fullname_search = '';
    this.idUsers_search = undefined;
    this.age_search = undefined;
    this.gender_search = '';
    this.createDate_search = '';
    this.birthday_search = '';
    this.createBy_search = '';
    this.getEmployees();
  }

  /**
   * Add & Edit Employee Modal
   */
  capitalize(data : any, command : any) {
    const pattern = /^[A-Za-z]*$/; // ตรวจสอบเฉพาะตัวอักษร A-Z หรือ a-z เท่านั้น
    if (command == 'firstName') {
      this.firstName = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
      // if (!pattern.test(data)) {
      //   this.firstName = ''; // รีเซ็ตค่า firstName เป็นค่าว่าง
      // } 
    } else if (command == 'lastName') {
      this.lastName = data.charAt(0).toUpperCase() + data.slice(1).toLowerCase();
    }
  }

  isVisible = false;
  modeEdit: boolean = false;
  id?: number;
  empId?: number;
  modalAddAndEditEmployee(command: string, data: any) {
    this.modeEdit = false;
    if (command == 'edit') {
      this.modeEdit = true;
      this.id = data.id;
      this.empId = data.idUsers
      this.firstName = data.firstName;
      this.lastName = data.lastName;

      if (data.birthday !== 'undefined') {
        this.birthday = new Date(data.birthday);
      }
      this.age = this.calculateAge(this.birthday)
      this.gender = data.gender;
    }
    console.log(command, data)
    this.isVisible = true;
  }

  // บันทึก : addApi, editApi
  saveData(): void {
    if (this.modeEdit) {
      const editData: Employee = {
        idUsers: this.empId ? this.empId : 0,
        firstName: this.firstName ? this.firstName : '',
        lastName: this.lastName ? this.lastName : '',
        birthday: this.formatDateChange(this.birthday + ''),
        age: this.age ? this.age : 0,
        gender: this.gender ? this.gender : '',
        createDate: this.formatDateChange(new Date() + ''),
        createBy: this.user
      };
      const isValidValue = (value: any) => value !== '' && value !== null && value !== undefined;
      const allFieldsFilled = Object.values(editData).every(isValidValue);

      if (allFieldsFilled) {
        console.log("editData")
        this.editApi(editData);
        this.createNotification('success', 'แก้ไข', editData.idUsers)
        this.dataEmployees = this.employees;
        this.cancleData()
        this.modeEdit = false;
      } else {
        console.log("editData", editData)
        this.createNotification('error', 'กรอกข้อมูลให้ครบ', '')
      }

    }
    else {
      const formData: Employee = {
        idUsers: 0,
        firstName: this.firstName ? this.firstName : '',
        lastName: this.lastName ? this.lastName : '',
        birthday: this.formatDateChange(this.birthday + ''),
        age: this.age ? this.age : 0,
        gender: this.gender ? this.gender : '',
        createDate: this.formatDateChange(new Date() + ''),
        createBy: this.user
      };

      const isValidValue = (value: any) => value !== '' && value !== null && value !== undefined;
      const allFieldsFilled = Object.values(formData).every(isValidValue);

      if (allFieldsFilled) {
        console.log('save');
        this.addApi(formData);
        this.createNotification('success', 'บันทึก', '')
        this.dataEmployees = this.employees;
        this.cancleData()
      } else {
        console.log("formData", formData)
        this.createNotification('error', 'กรอกข้อมูลให้ครบ', '')
      }
    }
  }

  cancleData(): void {
    this.isVisible = false;
    this.firstName = '';
    this.lastName = '';
    this.birthday = undefined;
    this.age = undefined;
    this.gender = '';
  }

  /**
   * Notification
   */
  createNotification(type: string, command: string, detail : any): void {
    let time = 3000;
    if (command == 'บันทึก') {
      this.notification.create(
        type,
        'บันทึกพนักงานเสร็จสิ้น',
        detail
      );
    } else if (command == 'แก้ไข') {
      this.notification.create(
        type,
        'แก้ไขพนักงานเสร็จสิ้น',
        'Id: ' + detail
      );
    } else if (command == 'กรอกข้อมูลให้ครบ') {
      this.notification.create(
        type,
        'กรอกข้อมูลให้ครบ',
        detail
      );
      time = 4000;
    }

    setTimeout(() => {
      this.notification.remove();
    }, time);

  }


  /**
   * format
   */

  // คำนวณอายุ
  calculateAge(birthday: any): any {
    this.calculatorApi(birthday);
  }

  // เปลี่ยน คศ. เป็น พศ.
  formattedDate?: any;
  formatDateDDMMYYY(data: any) {
    if (data !== 'undefined') {
      const date = new Date(data)
      const day = date.getDate().toString().padStart(2, '0'); // แปลงเป็นสตริงและเติมเลข 0 ถ้าจำนวนน้อยกว่า 10
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เพราะเดือนเริ่มที่ 0
      const year = date.getFullYear() + 543;
      this.formattedDate = `${day}/${month}/${year}`;
    } else {
      this.formattedDate = ''
    }
    return this.formattedDate;
  }

  // เปลี่ยนรูปแบบวันที่
  formatDateChange(dateToString: string) {
    // console.log(dateToString)
    const date = new Date(dateToString);
    if (isNaN(date.getTime())) {
      return "";
    } else {
      // Sun Jan 01 2017 08:08:26 GMT+0700 > 2002-06-19T08:44:08.344Z
      const date = new Date(dateToString);
      const isoDate = date.toISOString(); // Convert to ISO 8601 format (UTC)
      console.log("dateChange", isoDate)
      return isoDate;
    }
  }

  /**
   * Delete
   */
  deleteEmployee(user: any) {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this employee?',
      nzContent: `<span>รหัสพนักงาน:  ${user.idUsers}</span><br>
      <span>ชื่อ:  ${user.firstName} ${user.lastName}</span>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleleApi(user.idUsers);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}