import {Inject, Injectable} from '@angular/core';
import {Task} from './task';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class TaskDataService {
  placeholderId = 0;
  tasks: Task[] = [];

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {
  }

  createNewTask(task: Task): TaskDataService {
    if (!task.title || !task.title.trim()) {
      return this;
    }
    if (!task.id) {
      task.id = ++this.placeholderId;
    }
    task.title = task.title.trim();
    this.tasks.push(task);
    this.storage.set('tasks', this.tasks);
    return this;
  }

  getAllTasks(): Task[] {
    if (this.storage.get('tasks') != null) {
      this.tasks = this.storage.get('tasks');
    }
    return this.tasks;
  }

  toggleComplete(task: Task) {
    this.tasks = this.storage.get('tasks');
    this.tasks.find(taskInList => taskInList.id === task.id).complete = !task.complete;
    this.storage.set('tasks', this.tasks);
  }

  clearCompletedTasks() {
    this.tasks = this.tasks.filter(task => !task.complete);
    this.storage.set('tasks', this.tasks);
    return this.tasks;
  }
}
