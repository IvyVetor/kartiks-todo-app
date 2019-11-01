import { Injectable } from '@angular/core';
import {Task} from './task';

@Injectable()
export class TaskDataService {
  placeholderId = 0;
  tasks: Task[] = [];

  constructor() { }

  createNewTask(task: Task): TaskDataService {
    if (!task.id) {
      task.id = ++this.placeholderId;
    }
    this.tasks.push(task);
    return this;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
