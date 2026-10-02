import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity, Registration, User } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private api = 'http://localhost:5000/api/v1';

  getStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/students`);
  }

  createStudent(data: Record<string, unknown>): Observable<User> {
    return this.http.post<User>(`${this.api}/students`, data);
  }

  updateStudent(id: string, data: Record<string, unknown>): Observable<User> {
    return this.http.put<User>(`${this.api}/students/${id}`, data);
  }

  deleteStudent(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.api}/students/${id}`);
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.api}/activities`);
  }

  createActivity(data: Record<string, unknown>): Observable<Activity> {
    return this.http.post<Activity>(`${this.api}/activities`, data);
  }

  updateActivity(id: string, data: Record<string, unknown>): Observable<Activity> {
    return this.http.put<Activity>(`${this.api}/activities/${id}`, data);
  }

  deleteActivity(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.api}/activities/${id}`);
  }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.api}/registrations`);
  }

  createRegistration(activityId: string): Observable<Registration> {
    return this.http.post<Registration>(`${this.api}/registrations`, { activityId });
  }

  updateRegistration(id: string, status: string): Observable<Registration> {
    return this.http.put<Registration>(`${this.api}/registrations/${id}`, { status });
  }

  deleteRegistration(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.api}/registrations/${id}`);
  }
}
