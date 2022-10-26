export class EmployeeResponse {
    
    EmployeeName: string = '';
    Time: number = 0;

    constructor(employeeName: string, time: number){
        this.EmployeeName = employeeName;
        this.Time = time;
    }

    setTime(value: number) {
        this.Time += value;
    }
}