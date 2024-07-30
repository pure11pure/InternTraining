import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-chart6',
  templateUrl: './chart6.component.html',
  styleUrls: ['./chart6.component.scss']
})
export class Chart6Component implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "ทีม ก",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "ทีม ข",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: "ทีม ค",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        locales: [{
          "name": "th",
          "options": {
            "months": [
              "มกราคม",
              "กุมภาพันธ์",
              "มีนาคม",
              "เมษายน",
              "พฤษภาคม",
              "มิถุนายน",
              "กรกฎาคม",
              "สิงหาคม",
              "กันยายน",
              "ตุลาคม",
              "พฤศจิกายน",
              "ธันวาคม"
            ],
            "shortMonths": [
              "ม.ค.",
              "ก.พ.",
              "มี.ค.",
              "เม.ย.",
              "พ.ค.",
              "มิ.ย.",
              "ก.ค.",
              "ส.ค.",
              "ก.ย.",
              "ต.ค.",
              "พ.ย.",
              "ธ.ค."
            ],
            "days": [
              "อาทิตย์",
              "จันทร์",
              "อังคาร",
              "พุธ",
              "พฤหัสบดี",
              "ศุกร์",
              "เสาร์"
            ],
            "shortDays": ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
            "toolbar": {
              // "exportToSVG": "ดาวน์โหลด SVG",
              // "exportToPNG": "ดาวน์โหลด PNG",
              // "exportToCSV": "ดาวน์โหลด CSV",
              // "menu": "เมนู",
              "selection": "เลือก",
              "selectionZoom": "เลือกจุดที่จะซูม",
              "zoomIn": "ซูมเข้า",
              "zoomOut": "ซูมออก",
              "pan": "ปรากฎว่า",
              "reset": "รีเซ็ตการซูม"
            }
          }
        }],
        defaultLocale: 'th'
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        "2003-01-01T00:00:00.000Z",
        "2003-02-01T00:00:00.000Z",
        "2003-03-01T00:00:00.000Z",
        "2003-04-01T00:00:00.000Z",
        "2003-05-01T00:00:00.000Z",
        "2003-06-01T00:00:00.000Z",
        "2003-07-01T00:00:00.000Z",
        "2003-08-01T00:00:00.000Z",
        "2003-09-01T00:00:00.000Z",
        "2003-10-01T00:00:00.000Z",
        "2003-11-01T00:00:00.000Z"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Points"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        x: {
          formatter: function (val: number) {
            const date = new Date(val);
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const thaiDate = new Intl.DateTimeFormat('th-TH', options).format(date);
            return thaiDate;
          }
        },
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    };
  }

  ngOnInit(): void {
  }

  public generateData(count: any, yrange: any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }
}









