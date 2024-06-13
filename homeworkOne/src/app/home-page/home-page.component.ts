import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import employeesData from '../employees.json'
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { thBeLocale } from 'ngx-bootstrap/locale';
import { NzNotificationService } from 'ng-zorro-antd/notification';
defineLocale('th-be', thBeLocale);

interface Employee {
  id: number,
  employee_id: number,
  first_name: string,
  last_name: string,
  birth_date: string,
  age: number,
  gender: string,
  update_time: string,
  update_by_name: string
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
    this.dataShowFirst()
  }

  constructor(
    private modal: NzModalService,
    private localeService: BsLocaleService,
    private notification: NzNotificationService
  ) {
    this.localeService.use(this.locale);
  }

  locale = 'th-be';
  locales = listLocales();

  user: string = 'pure';
  isCollapsed = false; //trigger menu
  employees: Employee[] = employeesData;
  isVisibleFilter = false;  //btn 'ค้นหาเพิ่มเติม'

  headData = [
    {
      id: 1,
      title: "ผู้ใช้งาน",
      active: true,
      disabled: false,
      data: this.employees
      // data: this.employees
    },
    // {
    //   id: 2,
    //   title: "test1",
    //   active: false,
    //   disabled: false,
    //   data: []
    // },
    // {
    //   id: 3,
    //   title: "test2",
    //   active: false,
    //   disabled: false,
    //   data: []
    // }
  ]
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
    this.dataEmployees = this.employees;
    this.PaginationEmployees();
  }

  PaginationEmployees(): void {
    console.log("dataEmployees", this.dataEmployees)
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
  employee_id_filter?: string;
  age_filter?: number;
  gender_filter?: string;
  update_time_filter?: string;
  update_by_name_filter?: string;

  filterEmployees(command: string) {
    console.log(this.fullname_filter, ' ', this.employee_id_filter, ' ', this.age_filter, ' ', this.gender_filter, ' ', this.update_time_filter, ' ', this.update_by_name_filter)
    this.filteredEmployees = this.employees.filter(employee => {
      return (this.fullname_filter ? employee.first_name.includes(this.fullname_filter) : true)
        && (this.employee_id_filter ? employee.employee_id.toString().includes(this.employee_id_filter) : true)
        && (this.age_filter ? employee.age === this.age_filter : true)
        && (this.gender_filter ? employee.gender === this.gender_filter : true)
        && (this.update_time_filter ? (new Date(employee.update_time).toDateString()) === (new Date(this.update_time_filter).toDateString()) : true)
        && (this.update_by_name_filter ? employee.update_by_name.includes(this.update_by_name_filter) : true);
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
    this.employee_id_filter = undefined;
    this.age_filter = undefined;
    this.gender_filter = '';
    this.update_time_filter = '';
    this.update_by_name_filter = '';
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
      this.empId = data.employee_id
      this.first_name = data.first_name;
      this.last_name = data.last_name;

      if (data.birth_date !== 'undefined') {
        this.birth_date = new Date(data.birth_date);
      }
      this.age = this.calculateAge(this.birth_date)
      this.gender = data.gender;
    }
    console.log(command, data)
    this.isVisible = true;
  }

  saveData(): void {
    if (this.modeEdit) {
      const indexToUpdate = this.employees.findIndex(employee => employee.id === this.id);
      const editData: Employee = {
        id: this.id ? this.id : 0,
        employee_id: this.empId ? this.empId : 0,
        first_name: this.first_name ? this.first_name : '',
        last_name: this.last_name ? this.last_name : '',
        birth_date: this.birth_date + '',
        age: this.age ? this.age : 0,
        gender: this.gender ? this.gender : '',
        update_time: new Date() + '',
        update_by_name: this.user
      };
      console.log("editData")
      this.employees[indexToUpdate] = editData;
      this.createNotification('success', 'แก้ไข')
      this.modeEdit = false;
    }
    else {
      const formData: Employee = {
        id: this.getId(),
        employee_id: this.getNewEmployeeId(),
        first_name: this.first_name ? this.first_name : '',
        last_name: this.last_name ? this.last_name : '',
        birth_date: this.birth_date + '',
        age: this.age ? this.age : 0,
        gender: this.gender ? this.gender : '',
        update_time: new Date() + '',
        update_by_name: this.user
      };
      this.employees.push(formData)
      this.createNotification('success', 'บันทึก')
      console.log(formData)
      console.log('save');
    }
    this.dataEmployees = this.employees;
    this.filterEmployees('');
    // this.PaginationEmployees() //รีค่า filteredEmployees
    this.cancleData()
  }

  cancleData(): void {
    this.isVisible = false;
    this.clearForm();
  }

  clearForm(): void {
    this.first_name = '';
    this.last_name = '';
    this.birth_date = undefined;
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
  first_name?: string;
  last_name?: string;
  birth_date?: Date;
  age?: number;
  gender?: string;
  message_age_error?: string;

  getNewEmployeeId(): number {
    const lastEmployee = this.employees[this.employees.length - 1];
    const lastEmployeeId = lastEmployee ? lastEmployee.employee_id : 0;
    return lastEmployeeId + 1;
  }

  getId(): number {
    const lastEmployee = this.employees[this.employees.length - 1];
    const lastEmployeeId = lastEmployee ? lastEmployee.id : 0;
    return lastEmployeeId + 1;
  }

  calculateAge(birth_date: any): any {
    if (birth_date) {
      const today = new Date();
      const birthDate = new Date(birth_date);
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

  /**
   * Delete
   */
  showDeleteConfirm(user: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this employee?',
      nzContent: `<span>รหัสพนักงาน:  ${user.employee_id}</span><br>
      <span>ชื่อ:  ${user.first_name} ${user.last_name}</span>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const indexToDelete = this.employees.findIndex(employee => employee.id === user.id);
        if (indexToDelete !== -1) {
          this.employees.splice(indexToDelete, 1);
          this.filterEmployees('delete');
          console.log("ลบข้อมูลเรียบร้อยแล้ว");
        } else {
          console.log("ไม่พบข้อมูลที่ต้องการลบ");
        }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  deleteEmployee(user: any) {
    this.showDeleteConfirm(user)
  }




}