import { Task } from './task';
import any = jasmine.any;

describe('Task', () => {
  it('should create an instance', () => {
    expect(new Task('blah', false)).toBeTruthy();
  });

  it('should be constructed correctly', () => {
    const newTask = new Task('randomTitle', false)
    expect(newTask.title).toEqual('randomTitle');
    expect(newTask.complete).toBeFalsy();
  });
});
