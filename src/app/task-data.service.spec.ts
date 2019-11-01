import {TestBed, async, inject} from '@angular/core/testing';
import { Task } from './task';
import { TaskDataService } from './task-data.service';

describe('TaskDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskDataService]
    });
  });

  it('should be created', () => {
    const service: TaskDataService = TestBed.get(TaskDataService);
    expect(service).toBeTruthy();
  });

  it('should return empty task array by default', () => {
    const service: TaskDataService = TestBed.get(TaskDataService);
    expect(service.tasks).toEqual([]);
  });

  it('should create new task', () => {
    const service: TaskDataService = TestBed.get(TaskDataService);
    const task = new Task();
    service.createNewTask(task);
    expect(service.tasks).toEqual([task]);
  });
});
