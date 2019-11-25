import {Inject, Injectable} from '@angular/core';
import {Task} from './task';
import {LOCAL_STORAGE, WebStorageService} from "angular-webstorage-service";

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
    this.storage.set(task.id.toString(), task);
    this.storage.set('tasks', this.tasks);
    return this;
  }

  getAllTasks(): Task[] {
    this.tasks = this.storage.get('tasks');
    return this.tasks;
  }

  toggleComplete(task: Task) {
    console.log('these tasks BEFORE updating', this.tasks);
    task.complete = !task.complete;
    console.log('these tasks AFTER updating', this.tasks);
    this.storage.set('tasks', this.tasks);
  }

  clearCompletedTasks() {
    this.tasks = this.storage.get('tasks').filter(task => !task.complete);
    return this.tasks.filter(task => !task.complete);
  }
}
