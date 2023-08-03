import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://localhost:44370/api'; 
  constructor(private http: HttpClient) { }


  getTasks(): Observable<Task[]> {

    const getTasksUrl = `${this.apiUrl}/Tarefas`;
    return this.http.get<Task[]>(getTasksUrl);
  }


  deleteTask(taskId: number): Observable<void> {

    const deleteUrl = `${this.apiUrl}/Tarefas/${taskId}`;
 
    return this.http.delete<void>(deleteUrl);

  }


  createTaskOrUpdate(task: Task | null): Observable<Task> {
    const createUrl = `${this.apiUrl}/Tarefas`;
    return this.http.post<Task>(createUrl, task);

  }


}
