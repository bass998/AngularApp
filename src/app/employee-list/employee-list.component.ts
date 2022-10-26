import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from './employee';
import { EmployeeResponse } from './employee-response';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employeesByMonth: IEmployee[] = [];
  employeeResponse: EmployeeResponse[] = [];
  errorMessage = '';
  time: number = 0;
  sub!: Subscription;
  isLoaded:  boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.sub = this.employeeService.getEmployees().subscribe({
      next: employees => {
        this.employeesByMonth = employees.filter((emp: IEmployee) => emp.DeletedOn == null && emp.EmployeeName != null && (emp.StarTimeUtc < emp.EndTimeUtc))
        this.calculateTime(this.employeesByMonth);
        this.isLoaded = true;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  calculateTime(employees: IEmployee[]) {
    employees.forEach(item => {
      let employee = this.employeeResponse.find(obj => obj.EmployeeName == item.EmployeeName);
      let date1 = new Date(item.StarTimeUtc);
      let date2 = new Date(item.EndTimeUtc);
      let time = ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60));
      if(employee == undefined)
      {
        employee = new EmployeeResponse(item.EmployeeName, time);
        this.employeeResponse.push(employee);
      }
      else 
      {
        employee.setTime(time);
      }
    });
    this.employeeResponse.sort((a, b) => b.Time - a.Time).forEach(item => item.Time = Math.round(item.Time));
  }
  
}
