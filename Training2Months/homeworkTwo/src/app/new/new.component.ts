import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  input_date = "";

  constructor() { }

  ngOnInit(): void {
  }

  // -------------------------
  isVisibleAll: boolean = false;
  showModalall(): void {
    this.isVisibleAll = true;
  }
  handleCancelAll(): void {
    console.log('Button cancel clicked!1');
    this.isVisibleAll = false;
  }
  // -------------------------
  isVisibleSuccess: boolean = false;
  showModalSuccess(): void {
    this.isVisibleSuccess = true;
  }
  handleCancelSuccess(): void {
    console.log('Button cancel clicked!1');
    this.isVisibleSuccess = false;
  }
  // -------------------------
  isVisibleUnSuccess: boolean = false;
  showModalUnSuccess(): void {
    this.isVisibleUnSuccess = true;
  }
  handleCancelUnSuccess(): void {
    console.log('Button cancel clicked! 2');
    this.isVisibleUnSuccess = false;
  }
  // -------------------------
  isVisibleError: boolean = false;
  showModalError(): void {
    this.isVisibleError = true;
  }
  handleCancelError(): void {
    console.log('Button cancel clicked! 2');
    this.isVisibleError = false;
  }
  // -------------------------

  allData = [
    {
      id: '1',
      invoiveNo: 'inv001',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '2',
      invoiveNo: 'inv002',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '3',
      invoiveNo: 'inv003',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '4',
      invoiveNo: 'inv004',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '5',
      invoiveNo: 'inv005',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '6',
      invoiveNo: 'inv006',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '7',
      invoiveNo: 'inv007',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '8',
      invoiveNo: 'inv008',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '9',
      invoiveNo: 'inv009',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '10',
      invoiveNo: 'inv010',
      type: 'T02',
      errorDesc: "-"
    },
  ];
  successData = [
    {
      id: '1',
      invoiveNo: 'inv001',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '2',
      invoiveNo: 'inv002',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '3',
      invoiveNo: 'inv003',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '4',
      invoiveNo: 'inv004',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '5',
      invoiveNo: 'inv005',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '6',
      invoiveNo: 'inv006',
      type: 'T02',
      errorDesc: "-"
    },
    {
      id: '7',
      invoiveNo: 'inv007',
      type: 'T02',
      errorDesc: "-"
    },
  ];

  unSuccessData= [
    {
      id: '1',
      invoiveNo: 'inv008',
      type: 'T02',
      errorDesc: "ERROR01: เลขประจำตัวผู้เสียภาษีผิดรูปแบบ"
    },
    {
      id: '2',
      invoiveNo: 'inv009',
      type: 'T02',
      errorDesc: "ERROR02: จำนวนเงินผิดรูปแบบ"
    },
  ];

  errorData= [
    {
      id: '1',
      invoiveNo: 'inv010',
      type: 'T02',
      errorDesc: "ERROR01: เลขประจำตัวผู้เสียภาษีผิดรูปแบบ"
    },
  ];
  




  listOfColumns: any[] = [
    {
      name: 'ลำดับ',
      width: '100px',
      sortFn: null,
      sortOrder: null,
      filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
    },
    {
      name: 'วันที่นำส่ง',
      width: '200px',
      sortFn: null,
      sortOrder: null,
      filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
    },
    {
      name: 'จำนวนรายการ',
      width: '200px',
      sortFn: null,
      sortOrder: null,
      filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
    },
    {
      name: 'นำส่งสำเร็จ',
      width: '200px',
      sortFn: null,
      sortOrder: null,
      filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
    },
    {
      name: 'นำส่งไม่สำเร็จ',
      width: '200px',
      sortFn: null,
      sortOrder: null,
      filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
    },
    {
      name: 'นำส่งไม่ได้',
      width: '200px',
      sortFn: null,
      sortOrder: null,
      filterFn: (address: string, item: any) => item.address.indexOf(address) !== -1
    }
  ];
  listOfData: any[] = [
    {
      id: '1',
      date: "22/07/2024",
      all: '10',
      success: '7',
      unsuccess: '2',
      error: '1',
    },
    {
      id: '2',
      date: "23/07/2024",
      all: '10',
      success: '4',
      unsuccess: '3',
      error: '0',
    },
    {
      id: '3',
      date: "24/07/2024",
      all: '10',
      success: '2',
      unsuccess: '0',
      error: '5',
    },
    {
      id: '4',
      date: "25/07/2024",
      all: '10',
      success: '2',
      unsuccess: '0',
      error: '5',
    },
  ];

  trackByName(_: number, item: any): string {
    return item.name;
  }


}
