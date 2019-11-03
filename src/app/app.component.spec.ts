import {TestBed, async, ComponentFixture} from '@angular/core/testing';
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

  it('should have a newTask task', () => {
    expect(app.newTask instanceof Task).toBeTruthy();
  });

  describe('addTask()', () => {
    let taskInput: Element;
    let toggleInput;
    let label: Element;

    beforeEach(async(() => {
      app.newTask.title = 'some task';
      taskInput = fixture.debugElement
        .query(By.css('input')).nativeElement
        .dispatchEvent(new KeyboardEvent('keyup', {key: 'Enter'}));
      fixture.detectChanges();
      label = fixture.debugElement.query(By.css('label')).nativeElement;
      toggleInput = fixture.debugElement.query(By.css('.toggle')).nativeElement;
    }));

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
});
