import {TestBed} from '@angular/core/testing';

import {TaskDataService} from './task-data.service';
import {Task} from './task';

describe('TaskDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

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
