import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  newTaskTitle = '';
  newTaskDueDate = '';
  newTaskPriority = 'Medium';
  searchQuery = '';
  filterPriority = '';
  filterStatus = '';
 userId = 0;

  constructor(private http: HttpClient, private router: Router) {}

ngOnInit() {
  this.userId = parseInt(localStorage.getItem('userId') || '1');
  this.loadTasks();
}

  loadTasks() {
    this.http.get<any[]>(`https://localhost:44349/api/task/${this.userId}`)
      .subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.applyFilters();
        },
        error: (err) => console.log('Error loading tasks', err)
      });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    const task = {
      title: this.newTaskTitle,
      isCompleted: false,
      userId: this.userId,
      dueDate: this.newTaskDueDate || null,
      priority: this.newTaskPriority
    };

    this.http.post('https://localhost:44349/api/task', task)
      .subscribe({
        next: () => {
          this.newTaskTitle = '';
          this.newTaskDueDate = '';
          this.newTaskPriority = 'Medium';
          this.loadTasks();
        },
        error: (err) => console.log('Error adding task', err)
      });
  }

  toggleTask(id: number) {
    this.http.put(`https://localhost:44349/api/task/${id}`, {})
      .subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.log('Error updating task', err)
      });
  }

  deleteTask(id: number) {
    this.http.delete(`https://localhost:44349/api/task/${id}`)
      .subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.log('Error deleting task', err)
      });
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesPriority = this.filterPriority
        ? task.priority === this.filterPriority : true;
      const matchesStatus = this.filterStatus
        ? (this.filterStatus === 'completed' ? task.isCompleted : !task.isCompleted)
        : true;
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}