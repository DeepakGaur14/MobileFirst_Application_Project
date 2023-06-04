import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

 constructor(private http:HttpClient) {}
  addTasks(data:any) :Observable<any>{
    return this.http.post('http://localhost:3000/tasks', data);
  }

  updateTasks(id:number, data:any) :Observable<any>{
    return this.http.put(`http://localhost:3000/tasks/${id}`, data);
  }

  
  getTasksList() : Observable<any>{
    return this.http.get('http://localhost:3000/tasks');
  }

  deleteFromTaskList(id:number): Observable<any>{
    return this.http.delete(`http://localhost:3000/tasks/${id}`);

  }

}
