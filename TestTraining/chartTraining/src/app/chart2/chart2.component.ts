import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from "moment";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";

import { dataSeries } from "./data-series";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  fill: ApexFill;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {


  ngOnInit(): void {
  }

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "PRODUCT A",
          data: this.generateDataSets(0)
        },
        {
          name: "PRODUCT B",
          data: this.generateDataSets(1)
        },
        {
          name: "PRODUCT C",
          data: this.generateDataSets(2)
        }
      ],
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [20, 100, 100, 100]
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: "#8e8da4"
          },
          offsetX: 0,
          formatter: function (val) {
            return (val / 1000000).toFixed(2);
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      xaxis: {
        type: "datetime",
        tickAmount: 8,
        min: new Date("01/01/2014").getTime(),
        max: new Date("01/20/2014").getTime(),
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function(val, timestamp: any) {
            return moment(new Date(timestamp)).format("DD MMM YYYY");
          }
        }
      },
      title: {
        text: "Irregular Data in Time Series",
        align: "left",
        offsetX: 14
      },
      tooltip: {
        shared: true
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetX: -10
      }
    };
  }

  public generateDataSets = function(t: number) {
    var ts1 = 1388534400000;
    var ts2 = 1388620800000;
    var ts3 = 1389052800000;

    var dataSet: [number, number][][] = [[], [], []];

    for (let i = 0; i < 12; i++) {
      ts1 = ts1 + 86400000;
      const innerArr: [number, number] = [ts1, dataSeries[2][i].value];
      dataSet[0].push(innerArr);
    }
    for (let i = 0; i < 18; i++) {
      ts2 = ts2 + 86400000;
      const innerArr: [number, number] = [ts2, dataSeries[1][i].value];
      dataSet[1].push(innerArr);
    }
    for (let i = 0; i < 12; i++) {
      ts3 = ts3 + 86400000;
      const innerArr: [number, number] = [ts3, dataSeries[0][i].value];
      dataSet[2].push(innerArr);
    }

    if (t === 0) {
      return dataSet[0];
    } else if (t === 1) {
      return dataSet[1];
    } else {
      return dataSet[2];
    }
  };

}
