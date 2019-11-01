import { Component } from '@angular/core';
import {TaskDataService} from './task-data.service';
import {Task} from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskDataService]
})
export class AppComponent {
  title = 'kartiks-todo-app';

  newTask: Task = new Task();

  constructor(private taskDataService: TaskDataService) {}

  addTask() {
    this.taskDataService.createNewTask(this.newTask);
    this.newTask = new Task();
  }

  get tasks() {
    return this.taskDataService.getAllTasks();
  }
}
