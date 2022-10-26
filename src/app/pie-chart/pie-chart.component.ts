import { Component, Input, OnChanges } from '@angular/core';
import { ApexChart, ApexDataLabels, ApexLegend, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { EmployeeResponse } from '../employee-list/employee-response';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnChanges {
  
  @Input() emp: EmployeeResponse[] = [];

  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    },
    
  };
  chartLabels: string[] = [];
  chartLegend: ApexLegend = {
    horizontalAlign: 'center',
    position: 'bottom'
  }

  constructor() { }

  ngOnChanges(): void {
    this.emp.forEach(item => {
      this.chartLabels.push(item.EmployeeName),
      this.chartSeries.push(item.Time)
    })
  }
}
