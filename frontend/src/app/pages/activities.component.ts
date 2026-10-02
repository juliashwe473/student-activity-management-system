import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Activity } from '../core/models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="page-title">Activities</h2>
      @if (auth.isAdmin()) {
        <button class="btn btn-primary" (click)="newActivity()">+ Add Activity</button>
      }
    </div>

    @if (message) { <div class="alert alert-success">{{ message }}</div> }
    @if (error) { <div class="alert alert-danger">{{ error }}</div> }

    @if (auth.isAdmin() && editing) {
      <div class="card p-4 mb-4">
        <h4>{{ editingId ? 'Edit Activity' : 'Create Activity' }}</h4>

        <form [formGroup]="form" (ngSubmit)="save()">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Title</label>
              <input class="form-control" formControlName="title">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Category</label>
              <input class="form-control" formControlName="category">
            </div>
            <div class="col-12 mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" rows="3" formControlName="description"></textarea>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Date</label>
              <input class="form-control" type="datetime-local" formControlName="date">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Location</label>
              <input class="form-control" formControlName="location">
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label">Capacity</label>
              <input class="form-control" type="number" formControlName="capacity">
            </div>
          </div>

          <button class="btn btn-primary me-2" [disabled]="form.invalid">Save</button>
          <button type="button" class="btn btn-secondary" (click)="editing = false">Cancel</button>
        </form>
      </div>
    }

    <div class="row g-4">
      @for (activity of activities; track activity._id) {
        <div class="col-md-6 col-lg-4">
          <div class="card p-4 h-100">
            <span class="badge text-bg-primary align-self-start">{{ activity.category }}</span>
            <h4 class="mt-3">{{ activity.title }}</h4>
            <p>{{ activity.description }}</p>
            <p class="mb-1"><strong>Date:</strong> {{ activity.date | date:'medium' }}</p>
            <p class="mb-1"><strong>Location:</strong> {{ activity.location }}</p>
            <p><strong>Capacity:</strong> {{ activity.capacity }}</p>

            @if (!auth.isAdmin()) {
              <button class="btn btn-success" (click)="register(activity)">Register</button>
            } @else {
              <div class="mt-auto">
                <button class="btn btn-outline-primary me-2" (click)="edit(activity)">Edit</button>
                <button class="btn btn-outline-danger" (click)="remove(activity._id)">Delete</button>
              </div>
            }
          </div>
        </div>
      } @empty {
        <div class="col-12"><div class="alert alert-info">No activities available.</div></div>
      }
    </div>
  `
})
export class ActivitiesComponent {
  private api = inject(ApiService);
  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  activities: Activity[] = [];
  editing = false;
  editingId = '';
  message = '';
  error = '';

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    location: ['', Validators.required],
    capacity: [20, [Validators.required, Validators.min(1)]],
    category: ['', Validators.required]
  });

  constructor() {
    this.load();
  }

  load() {
    this.api.getActivities().subscribe({
      next: data => this.activities = data,
      error: err => this.error = err.error?.message || 'Could not load activities'
    });
  }

  newActivity() {
    this.editingId = '';
    this.form.reset({ title: '', description: '', date: '', location: '', capacity: 20, category: '' });
    this.editing = true;
  }

  edit(a: Activity) {
    this.editingId = a._id;
    this.form.patchValue({
      title: a.title,
      description: a.description,
      date: a.date.substring(0, 16),
      location: a.location,
      capacity: a.capacity,
      category: a.category
    });
    this.editing = true;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.getRawValue();
    const request = this.editingId
      ? this.api.updateActivity(this.editingId, data)
      : this.api.createActivity(data);

    request.subscribe({
      next: () => {
        this.message = 'Activity saved successfully.';
        this.editing = false;
        this.load();
      },
      error: err => this.error = err.error?.message || 'Save failed'
    });
  }

  remove(id: string) {
    if (!confirm('Delete this activity?')) return;
    this.api.deleteActivity(id).subscribe({
      next: () => this.load(),
      error: err => this.error = err.error?.message || 'Delete failed'
    });
  }

  register(activity: Activity) {
    this.api.createRegistration(activity._id).subscribe({
      next: () => this.message = 'Registration successful.',
      error: err => this.error = err.error?.message || 'Registration failed'
    });
  }
}
