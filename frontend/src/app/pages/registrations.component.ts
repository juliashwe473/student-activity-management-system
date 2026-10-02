import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { Registration } from '../core/models';

@Component({
  standalone: true,
  imports: [DatePipe],
  template: `
    <h2 class="page-title mb-4">Registrations</h2>

    @if (message) { <div class="alert alert-success">{{ message }}</div> }
    @if (error) { <div class="alert alert-danger">{{ error }}</div> }

    <div class="card p-3">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              @if (auth.isAdmin()) { <th>Student</th> }
              <th>Activity</th><th>Date</th><th>Location</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            @for (r of registrations; track r._id) {
              <tr>
                @if (auth.isAdmin()) { <td>{{ r.student.name }}<br><small>{{ r.student.studentId }}</small></td> }
                <td>{{ r.activity.title }}</td>
                <td>{{ r.activity.date | date:'medium' }}</td>
                <td>{{ r.activity.location }}</td>
                <td><span class="badge" [class.text-bg-success]="r.status==='registered'" [class.text-bg-secondary]="r.status==='cancelled'">{{ r.status }}</span></td>
                <td>
                  @if (r.status === 'registered') {
                    <button class="btn btn-sm btn-outline-warning me-2" (click)="cancel(r._id)">Cancel</button>
                  }
                  <button class="btn btn-sm btn-outline-danger" (click)="remove(r._id)">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="6" class="text-center">No registrations found.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class RegistrationsComponent {
  private api = inject(ApiService);
  auth = inject(AuthService);

  registrations: Registration[] = [];
  message = '';
  error = '';

  constructor() {
    this.load();
  }

  load() {
    this.api.getRegistrations().subscribe({
      next: data => this.registrations = data,
      error: err => this.error = err.error?.message || 'Could not load registrations'
    });
  }

  cancel(id: string) {
    this.api.updateRegistration(id, 'cancelled').subscribe({
      next: () => {
        this.message = 'Registration cancelled.';
        this.load();
      },
      error: err => this.error = err.error?.message || 'Could not cancel registration'
    });
  }

  remove(id: string) {
    if (!confirm('Delete this registration?')) return;
    this.api.deleteRegistration(id).subscribe({
      next: () => this.load(),
      error: err => this.error = err.error?.message || 'Delete failed'
    });
  }
}
