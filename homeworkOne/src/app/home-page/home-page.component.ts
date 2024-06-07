import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import employeesData from '../employees.json'
interface Employee {
  id: number,
  employee_id: number,
  first_name: string,
  last_name: string,
  birth_date: string
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
  }

  constructor(
    private modal: NzModalService
  ) {
  }

  user: string = 'pure';
  isCollapsed = false; //trigger menu
  employees: Employee[] = employeesData;

  headData = [
    {
      id: 1,
      title: "ผู้ใช้งาน",
      active: true,
      disabled: false,
      data: this.employees
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
   * Add & Edit Employee Modal
   */
  isVisible = false;
  modeEdit: boolean = false;
  id?: number;
  empId?: number;
  modalAddAndEditEmployee(command: string, data: any) {
    if (command == 'edit') {
      this.modeEdit = true;
      this.id = data.id;
      this.empId = data.employee_id
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.birth_date = new Date(data.birth_date);
      this.calculateAge()
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
      console.log("editData", editData)
      this.employees[indexToUpdate] = editData;
      this.modeEdit = false;
    }
    else {
      console.log('save');
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
    }
    this.isVisible = false;
    this.clearForm();
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

  calculateAge() {
    if (this.birth_date) {
      const today = new Date();
      const birthDate = new Date(this.birth_date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      // condition 1 = ยังไม่ถึงเดือนเกิด
      // condition 2 = ยังไม่ถึงวันเกิด แต่เดือนเดียวกัน
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      this.age = age;

      // ถ้า age น้อยกว่า 0 
    }
  }

  formatDateDDMMYYY(data: any) {
    const date = new Date(data)
    const day = date.getDate().toString().padStart(2, '0'); // แปลงเป็นสตริงและเติมเลข 0 ถ้าจำนวนน้อยกว่า 10
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // เพิ่ม 1 เพราะเดือนเริ่มที่ 0
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  /**
   * Delete
   */
  showDeleteConfirm(user: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this employee?',
      nzContent: `<p>รหัสพนักงาน:  ${user.employee_id}</p>
      <p>ชื่อ:  ${user.first_name} ${user.last_name}</p>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const indexToDelete = this.employees.findIndex(employee => employee.id === user.id);
        if (indexToDelete !== -1) {
          this.employees.splice(indexToDelete, 1);
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