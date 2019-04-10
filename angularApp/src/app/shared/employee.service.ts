import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  readonly baseURL = "http://localhost:3000/api/employees";
  constructor(private http: HttpClient) { }
  // post employee in database
  postEmployee(emp: Employee){
      return this.http.post(this.baseURL, emp);
  }
 // get employees from database
  getEmployeeList(){
    return this.http.get(this.baseURL);
  }
  // edit employess in database
  putEmployee(emp: Employee) {
    return this.http.put("http://localhost:3000/api" + `/${emp._id}`, emp);
  }
  // delete employee in database
  deleteEmployee(_id: string) {
    return this.http.delete("http://localhost:3000/api/employee" + `/${_id}`);
  }
}
