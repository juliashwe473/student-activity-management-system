import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { User } from '../core/models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title">Student Management</h2>
      <button class="btn btn-primary" (click)="newStudent()">+ Add Student</button>
    </div>

    @if (message) { <div class="alert alert-success">{{ message }}</div> }
    @if (error) { <div class="alert alert-danger">{{ error }}</div> }

    @if (editing) {
      <div class="card p-4 mb-4">
        <h4>{{ editingId ? 'Edit Student' : 'Create Student' }}</h4>
        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="row">
            <div class="col-md-6 mb-3"><label class="form-label">Name</label><input class="form-control" formControlName="name"></div>
            <div class="col-md-6 mb-3"><label class="form-label">Student ID</label><input class="form-control" formControlName="studentId"></div>
            <div class="col-md-6 mb-3"><label class="form-label">Email</label><input class="form-control" type="email" formControlName="email"></div>
            <div class="col-md-6 mb-3"><label class="form-label">Password</label><input class="form-control" type="password" formControlName="password"></div>
            <div class="col-md-6 mb-3"><label class="form-label">Department</label><input class="form-control" formControlName="department"></div>
            <div class="col-md-6 mb-3"><label class="form-label">Phone</label><input class="form-control" formControlName="phone"></div>
          </div>
          <button class="btn btn-primary me-2" [disabled]="form.invalid">Save</button>
          <button type="button" class="btn btn-secondary" (click)="editing=false">Cancel</button>
        </form>
      </div>
    }

    <div class="card p-3">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead><tr><th>Name</th><th>Student ID</th><th>Email</th><th>Department</th><th>Actions</th></tr></thead>
          <tbody>
            @for (student of students; track student.id) {
              <tr>
                <td>{{ student.name }}</td>
                <td>{{ student.studentId }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.department }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary me-2" (click)="edit(student)">Edit</button>
                  <button class="btn btn-sm btn-outline-danger" (click)="remove(student.id)">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="text-center">No students found.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class StudentsComponent {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  students: User[] = [];
  editing = false;
  editingId = '';
  message = '';
  error = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    studentId: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)],
    department: [''],
    phone: ['']
  });

  constructor() {
    this.load();
  }

  load() {
    this.api.getStudents().subscribe({
      next: data => this.students = data,
      error: err => this.error = err.error?.message || 'Could not load students'
    });
  }

  newStudent() {
    this.editingId = '';
    this.form.reset({ name:'', studentId:'', email:'', password:'', department:'', phone:'' });
    this.form.controls.password.addValidators(Validators.required);
    this.form.controls.password.updateValueAndValidity();
    this.editing = true;
  }

  edit(s: User) {
    this.editingId = s.id;
    this.form.controls.password.clearValidators();
    this.form.controls.password.updateValueAndValidity();
    this.form.patchValue({
      name: s.name,
      studentId: s.studentId || '',
      email: s.email,
      password: '',
      department: s.department || '',
      phone: s.phone || ''
    });
    this.editing = true;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Record<string, unknown> = this.form.getRawValue();
    if (!data['password']) delete data['password'];

    const request = this.editingId
      ? this.api.updateStudent(this.editingId, data)
      : this.api.createStudent(data);

    request.subscribe({
      next: () => {
        this.message = 'Student saved successfully.';
        this.editing = false;
        this.load();
      },
      error: err => this.error = err.error?.message || 'Save failed'
    });
  }

  remove(id: string) {
    if (!confirm('Delete this student?')) return;
    this.api.deleteStudent(id).subscribe({
      next: () => {
        this.message = 'Student deleted.';
        this.load();
      },
      error: err => this.error = err.error?.message || 'Delete failed'
    });
  }
}
