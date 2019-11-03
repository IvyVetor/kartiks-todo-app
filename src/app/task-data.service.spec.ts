import {TestBed, async, inject} from '@angular/core/testing';
import {Task} from './task';
import {TaskDataService} from './task-data.service';

describe('TaskDataService', () => {
  let service: TaskDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskDataService]
    });
    service = TestBed.get(TaskDataService);
  });

  it('should be created with empty tasks array', () => {
    expect(service).toBeTruthy();
    expect(service.tasks).toEqual([]);
  });

  describe('#getAllTasks()', () => {
    it('should return an empty array by default', () => {
      expect(service.getAllTasks()).toEqual([]);
    });

    it('should return all tasks', () => {
      const task1 = new Task({title: 'Hello 1', complete: false});
      const task2 = new Task({title: 'Hello 2', complete: true});
      service.createNewTask(task1);
      service.createNewTask(task2);
      expect(service.getAllTasks()).toEqual([task1, task2]);
    });
  });

  describe('#createNewTask(task)', () => {
    it('should create new task', () => {
      const task = new Task({title: 'random string'});
      service.createNewTask(task);
      expect(service.tasks).toEqual([task]);
    });

    it('should trim new task title', () => {
      const task = new Task({title: '  random string   ', complete: false});
      service.createNewTask(task);
      expect(service.tasks[0].title).toEqual('random string');
    });

    it('should not create a task with null title', () => {
      const task = new Task({title: null, complete: false});
      service.createNewTask(task);
      expect(service.tasks).toEqual([]);
    });

    it('should not create a task with empty title', () => {
      const task = new Task({title: '    ', complete: false});
      service.createNewTask(task);
      expect(service.tasks).toEqual([]);
    });
  });

  describe('#toggleComplete(task)', () => {
    it('should toggle "complete" property', () => {
      const task = new Task({title: 'random String', complete: false});
      service.createNewTask(task);
      service.toggleComplete(task);
      expect(service.tasks[0].complete).toEqual(true);
    });
  });

  describe('#clearCompletedTasks()', () => {
    it('should clear completed tasks', () => {
      const task1 = new Task({title: 'random String 1', complete: false});
      const task2 = new Task({title: 'random String 2', complete: true});
      const task3 = new Task({title: 'random String 3', complete: true});
      const task4 = new Task({title: 'random String 4', complete: false});
      service.createNewTask(task1);
      service.createNewTask(task2);
      service.createNewTask(task3);
      service.createNewTask(task4);
      expect(service.tasks.length).toEqual(4);

      service.clearCompletedTasks();
      expect(service.tasks).toEqual([task1, task4]);
    });
  });
});
