import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import employeesData from '../employees.json'
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thBeLocale } from 'ngx-bootstrap/locale';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
defineLocale('th-be', thBeLocale);

interface Employee {
  // id: number,
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
    private localeService: BsLocaleService,
    private notification: NzNotificationService,
    private http: HttpClient
  ) {
    this.localeService.use(this.locale);
  }

  locale = 'th-be';
  locales = listLocales();

  user: string = 'pure';
  isCollapsed = false; //trigger menu
  employees: Employee[] = [];
  isVisibleFilter = false;  //btn 'ค้นหาเพิ่มเติม'

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
        this.dataShowFirst()
      })  
  }

  deleleApi(idUsers: any ) {
    this.http.post<any>(
      'http://localhost:8778/pure-controller/jpa-delete', idUsers).toPromise().then((response) => {
        console.log("deleleApi: ", idUsers)
        this.getAll()
      })
  }

  addApi(data: any){
    console.log("addApi: ", data)
    this.http.post<any>(
      'http://localhost:8778/pure-controller/jpa-add', data).toPromise().then((response) => {
        console.log("response post [jpa-add]");
        this.getAll()
      })
  }

  editApi(data: any){
    console.log("editApi: ", data)
    this.http.post<any>(
      '  http://localhost:8778/pure-controller/jpa-edit', data).toPromise().then((response) => {
        console.log("response post [jpa-edit]");
        this.getAll()
      })
  }



  // ------------


  /**
   * Panel
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
 * filter Search
 */
  filteredEmployees: Employee[] = [];
  dataEmployees: Employee[] = [];  // filter / no_filter
  dataShowEmployees: Employee[] = []; // show 5 rows
  pageSize: number = 5;
  PageIndex: number = 1;
  TotalSize: number = 0;

  dataShowFirst(): void{
    console.log("employees dataShowFirst", this.employees)
    this.dataEmployees = this.employees;
    this.PaginationEmployees();
  }

  PaginationEmployees(): void {
    let start = (this.PageIndex - 1) * this.pageSize;
    let end = this.PageIndex * this.pageSize;
    this.dataShowEmployees = this.dataEmployees.slice(start, end);
    this.TotalSize = this.dataEmployees.length * 2;
    console.log("dataShowEmployees", this.dataShowEmployees)
  }

  handlePageIndexChange(pageIndex: number): void {
    this.PageIndex = pageIndex;
    this.PaginationEmployees()
  }

  /**
   * filter
   */
  fullname_filter?: string;
  idUsers_filter?: string;
  age_filter?: number;
  gender_filter?: string;
  createDate_filter?: string;
  createBy_filter?: string;

  filterEmployees(command: string) {
    console.log(this.fullname_filter, ' ', this.idUsers_filter, ' ', this.age_filter, ' ', this.gender_filter, ' ', this.createDate_filter, ' ', this.createBy_filter)
    this.filteredEmployees = this.employees.filter(employee => {
      return (this.fullname_filter ? employee.firstName.includes(this.fullname_filter) : true)
        && (this.idUsers_filter ? employee.idUsers.toString().includes(this.idUsers_filter) : true)
        && (this.age_filter ? employee.age === this.age_filter : true)
        && (this.gender_filter ? employee.gender === this.gender_filter : true)
        && (this.createDate_filter ? (new Date(employee.createDate).toDateString()) === (new Date(this.createDate_filter).toDateString()) : true)
        && (this.createBy_filter ? employee.createBy.includes(this.createBy_filter) : true);
    });

    console.log("command",command)

    if(!(command == 'delete')){
      this.pageSize = 5;
    this.PageIndex = 1;
    }
    this.dataEmployees = this.filteredEmployees;
    this.PaginationEmployees();
  }

  clearFormFilter() {
    this.fullname_filter = '';
    this.idUsers_filter = undefined;
    this.age_filter = undefined;
    this.gender_filter = '';
    this.createDate_filter = '';
    this.createBy_filter = '';
    this.dataEmployees = [...this.employees];
    this.PaginationEmployees()
  }

  /**
   * Add & Edit Employee Modal
   */
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

  saveData(): void {
    if (this.modeEdit) {
      // const indexToUpdate = this.employees.findIndex(employee => employee.id === this.id);
      const editData: Employee = {
        // id: this.id ? this.id : 0,
        idUsers: this.empId ? this.empId : 0,
        firstName: this.firstName ? this.firstName : '',
        lastName: this.lastName ? this.lastName : '',
        birthday: this.formatDateChange(this.birthday + ''),
        age: this.age ? this.age : 0,
        gender: this.gender ? this.gender : '',
        createDate: this.formatDateChange(new Date() + ''),
        createBy: this.user
      };
      console.log("editData")
      // this.employees[indexToUpdate] = editData;
      this.editApi(editData);
      this.createNotification('success', 'แก้ไข')
      this.modeEdit = false;
    }
    else {
      const formData: Employee = {
        // id: this.getId(),
        idUsers: 0,
        firstName: this.firstName ? this.firstName : '',
        lastName: this.lastName ? this.lastName : '',
        birthday: this.formatDateChange(this.birthday + ''),
        age: this.age ? this.age : 0,
        gender: this.gender ? this.gender : '',
        createDate: this.formatDateChange(new Date() + ''),
        createBy: this.user
      };
      // this.employees.push(formData)
      this.addApi(formData);
      this.createNotification('success', 'บันทึก')
      console.log('save');
    }
    this.dataEmployees = this.employees;
    // this.filterEmployees('');
    // this.PaginationEmployees() //รีค่า filteredEmployees
    this.cancleData()
  }

  cancleData(): void {
    this.isVisible = false;
    this.clearForm();
  }

  clearForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.birthday = undefined;
    this.age = undefined;
    this.gender = '';
  }

  // Notification
  createNotification(type: string, command: string): void {
    if (command == 'บันทึก') {
      this.notification.create(
        type,
        'บันทึกพนักงานเสร็จสิ้น',
        ''
      );
    } else if (command = 'แก้ไข') {
      this.notification.create(
        type,
        'แก้ไขพนักงานเสร็จสิ้น',
        ''
      );
    }

    setTimeout(() => {
      this.notification.remove();
    }, 3000);

  }
  /**
   * Form
   */
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  age?: number;
  gender?: string;
  message_age_error?: string;

  getNewEmployeeId(): number {
    const lastEmployee = this.employees[this.employees.length - 1];
    const lastEmployeeId = lastEmployee ? lastEmployee.idUsers : 0;
    return lastEmployeeId + 1;
  }

  // getId(): number {
  //   const lastEmployee = this.employees[this.employees.length - 1];
  //   const lastEmployeeId = lastEmployee ? lastEmployee.id : 0;
  //   return lastEmployeeId + 1;
  // }

  calculateAge(birthday: any): any {
    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      // condition 1 = ยังไม่ถึงเดือนเกิด
      // condition 2 = ยังไม่ถึงวันเกิด แต่เดือนเดียวกัน
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age
      return age;

      // เวื่อนไข ถ้า age น้อยกว่า 0 
    }
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


  formatDateChange(dateToString: string){
    // Sun Jan 01 2017 08:08:26 GMT+0700 > 2002-06-19T08:44:08.344Z
    const date = new Date(dateToString);
    // Convert to ISO 8601 format (UTC)
    const isoDate = date.toISOString();

    console.log(isoDate)

    return isoDate;
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
        // const indexToDelete = this.employees.findIndex(employee => employee.id === user.id);
        this.deleleApi(user.idUsers);
        // this.getAll();
        // this.filterEmployees('delete');

        // if (indexToDelete !== -1) {
        //   this.employees.splice(indexToDelete, 1);
        //   this.filterEmployees('delete');
        //   console.log("ลบข้อมูลเรียบร้อยแล้ว");
        // } else {
        //   console.log("ไม่พบข้อมูลที่ต้องการลบ");
        // }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}