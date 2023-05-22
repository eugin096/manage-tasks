import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  API_URL = "https://manage-tasks-nhck.onrender.com/"
  headers = new HttpHeaders({
    'x-access-token':localStorage.getItem('AuthToken') as string
    // Add any additional headers if required
  });
  constructor(private http:HttpClient) {
  }

  getTasks() :Observable<any>{
    return this.http.get<any>(`${this.API_URL}getTasks`, {headers: this.headers})
  }
  addTasks(title: string,description: string,dueDate: Date ){
    return this.http.post<any>(`${this.API_URL}Tasks`, {title, description, dueDate}, {headers: this.headers})
  }
  updateTasks(task_id: number, taskStatus: boolean){
    return this.http.put<any>(`${this.API_URL}Tasks/${task_id}`,{taskStatus}, {headers: this.headers})
  }

  deleteTasks(task_id: number){
    return this.http.delete<any>(`${this.API_URL}Tasks/${task_id}`, {headers: this.headers}) 
  }
}
