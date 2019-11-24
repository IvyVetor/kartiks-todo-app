import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Task} from './task';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app with app title', () => {
    expect(app).toBeTruthy();
    expect(app.title).toEqual('kartiks-todo-app');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Header');
  });

  describe('taskFunctions', () => {
    let taskInput: Element;
    let toggleInput;
    let label: Element;

    beforeEach(async(() => {
      app.newTask.title = 'some task';
      taskInput = fixture.debugElement
        .query(By.css('input')).nativeElement
        .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
      fixture.detectChanges();
      label = fixture.debugElement.query(By.css('.task-title')).nativeElement;
      toggleInput = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    }));

    describe('addTask()', () => {
      it('should have a newTask task', () => {
        expect(app.newTask instanceof Task).toBeTruthy();
      });

      it('should list tasks', () => {
        expect(label.textContent).toContain('some task');
        expect(toggleInput.checked).toBeFalsy();
      });

      it('should toggle task', () => {
        expect(toggleInput.checked).toBeFalsy();
        toggleInput.click();
        fixture.detectChanges();
        expect(toggleInput.checked).toBeTruthy();
      });
    });

    describe('clearAllTasks()', () => {
      let taskInput2;
      let taskInput3;

      beforeEach(async(() => {
        app.newTask.title = 'another task';
        taskInput2 = fixture.debugElement
          .query(By.css('input')).nativeElement
          .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
        app.newTask.title = 'third task';
        taskInput3 = fixture.debugElement
          .query(By.css('input')).nativeElement
          .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
        fixture.detectChanges();
        label = fixture.debugElement.query(By.css('.task-title')).nativeElement;
      }));

      it('should clear all completed tasks', () => {
        const toggles = fixture.debugElement.queryAll(By.css('.toggle'));
        toggles[1].nativeElement.click();
        toggles[2].nativeElement.click();
        let tasks = fixture.debugElement.queryAll(By.css('.task-title'));
        expect(tasks.length).toBe(3);

        fixture.debugElement.query(By.css('.clear-tasks')).nativeElement.click();
        fixture.detectChanges();

        tasks = fixture.debugElement.queryAll(By.css('.task-title'));
        expect(tasks.length).toBe(1);
      });
    });

    describe('countUncompletedTasks', () => {
      let taskInput2;
      let taskInput3;

      beforeEach(async(() => {
        app.newTask.title = 'another task';
        taskInput2 = fixture.debugElement
          .query(By.css('input')).nativeElement
          .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
        app.newTask.title = 'third task';
        taskInput3 = fixture.debugElement
          .query(By.css('input')).nativeElement
          .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
        fixture.detectChanges();
        label = fixture.debugElement.query(By.css('.task-title')).nativeElement;
      }));

      it('should count uncompleted tasks', () => {
        const toggles = fixture.debugElement.queryAll(By.css('.toggle'));
        toggles[1].nativeElement.click();
        toggles[2].nativeElement.click();
        const tasks = fixture.debugElement.queryAll(By.css('.task-title'));
        expect(tasks.length).toBe(3);

        fixture.debugElement.query(By.css('.tasks-left'));
        fixture.detectChanges();

        const uncompleteTasks = fixture.debugElement.query(By.css('.tasks-left')).nativeElement.textContent;
        expect(uncompleteTasks).toBe('1 of 3 tasks left');
      });
    });

    // describe('edit text inline', () => {
    //
    //   it('should change text on click and enter', () => {
    //     const task = fixture.debugElement.query(By.css('.task-title'));
    //     task.nativeElement
    //       .click()
    //       .sendKeys('walk the doggy')
    //       .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
    //
    //     fixture.debugElement.query(By.css('.task-title'));
    //     fixture.detectChanges();
    //
    //     const editedTask = fixture.debugElement.query(By.css('.task-title')).nativeElement.textContent;
    //     expect(editedTask).toBe('walk the doggy');
    //   });
    //
    //   it('should not change text on click and enter when empty', () => {
    //     const task = fixture.debugElement.query(By.css('.task-title'));
    //     task.nativeElement
    //       .click()
    //       .sendKeys('delete')
    //       .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
    //
    //     fixture.debugElement.query(By.css('.task-title'));
    //     fixture.detectChanges();
    //
    //     const editedTask = fixture.debugElement.query(By.css('.task-title')).nativeElement.textContent;
    //     expect(editedTask).toBe('something');
    //   });
    // });
  });
});
