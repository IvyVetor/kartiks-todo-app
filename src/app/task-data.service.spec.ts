import {TestBed, async, inject} from '@angular/core/testing';
import {Task} from './task';
import {TaskDataService} from './task-data.service';

describe('TaskDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskDataService]
    });
  });

  describe('#getAllTasks()', () => {
    it('should return an empty array by default', inject([TaskDataService], (service: TaskDataService) => {
      expect(service.getAllTasks()).toEqual([]);
    }));

    it('should return all tasks', inject([TaskDataService], (service: TaskDataService) => {
      const task1 = new Task({title: 'Hello 1', complete: false});
      const task2 = new Task({title: 'Hello 2', complete: true});
      service.createNewTask(task1);
      service.createNewTask(task2);
      expect(service.getAllTasks()).toEqual([task1, task2]);
    }));
  });

  it('should be created', () => {
    const service: TaskDataService = TestBed.get(TaskDataService);
    expect(service).toBeTruthy();
  });

  it('should return empty task array by default', () => {
    const service: TaskDataService = TestBed.get(TaskDataService);
    expect(service.tasks).toEqual([]);
  });

  describe('#createNewTask(task)', () => {
    it('should create new task', () => {
      const service: TaskDataService = TestBed.get(TaskDataService);
      const task = new Task({title: 'random string'});
      service.createNewTask(task);
      expect(service.tasks).toEqual([task]);
    });

    it('should trim new task title', () => {
      const service: TaskDataService = TestBed.get(TaskDataService);
      const task = new Task({title: '  random string   ', complete: false});
      service.createNewTask(task);
      expect(service.tasks[0].title).toEqual('random string');
    });

    it('should not create a task with null title', () => {
      const service: TaskDataService = TestBed.get(TaskDataService);
      const task = new Task({title: null, complete: false});
      service.createNewTask(task);
      expect(service.tasks).toEqual([]);
    });

    it('should not create a task with empty title', () => {
      const service: TaskDataService = TestBed.get(TaskDataService);
      const task = new Task({title: '    ', complete: false});
      service.createNewTask(task);
      expect(service.tasks).toEqual([]);
    });
  });

  describe('#toggleComplete(task)', () => {
    it('should toggle "complete" property', () => {
      const service: TaskDataService = TestBed.get(TaskDataService);
      const task = new Task({title: 'random String', complete: false});
      service.createNewTask(task);
      service.toggleComplete(task);
      expect(service.tasks[0].complete).toEqual(true);
    });
  });
});
