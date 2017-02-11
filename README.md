[![Webinar](./webinar.png)](http://eepurl.com/cBBpzv)

# Todo App task

*If you are using Sublime Text as IDE it is recommended to install TypeScript support plugin.*

1. Install angular-cli with `npm install -g angular-cli`
2. Scaffold your app with `ng new my-todo`
3. Serve newly generated app and see how it works with `new serve`
4. Shutdown server with `CTRL+C`
5. Run unit tests with `ng test`
6. Shutdown watcher with `CTRL+C`
7. Generate **Todo** entity with `ng g class Todo --spec=true`
    * **PROTIP:** `--spec=true` will generate unit test file. You can set this flag to be true by default in `angular-cli.json`
8. Implement **Todo** class in `src\app\todo.ts`

  ``` TypeScript
  export class Todo {
    id: number;
    title: string = '';
    complete: boolean = false;

    constructor(value: Object = {}) {
      Object.assign(this, value);
    }
  }
  ```

9. Implement **Todo** unit test in `src\app\todo.spec.ts`

  ``` TypeScript
  import {Todo} from './todo';

  describe('Todo', () => {

    it('should create an instance', () => {
      expect(new Todo()).toBeTruthy();
    });

    it('should accept values from constructor', () => {
      let todo = new Todo({
        title: 'title1',
        complete: true
      });

      expect(todo.title).toEqual('title1');
      expect(todo.complete).toEqual(true);
    });

  })
  ```
10. Run unit tests with `ng test`

11. Generate **TodoService** with `ng g service Todo`
12. Implement **TodoService** class in `src\app\todo.service.ts`

  ``` TypeScript
  import { Injectable } from '@angular/core';
  import { Todo } from './todo';

  @Injectable()
  export class TodoService {

    lastId: number = 0;

    todos: Todo[] = [];

    constructor() { }


    addTodo(todo: Todo): TodoService {
      if (!todo.id) {
        todo.id = ++this.lastId;
      }
      this.todos.push(todo);
      return this;
    }

    deleteTodoById(id: number): TodoService {
      this.todos = this.todos
        .filter(todo => todo.id !== id);
      return this;
    }

    getAllTodos(): Todo[] {
      return this.todos;
    }

    updateTodoById(id: number, values: Object = {}): Todo {
      let todo = this.getTodoById(id);
      if (!todo) {
        return null;
      }
      Object.assign(todo, values);
      return todo;
    }

    getTodoById(id: number): Todo {
      return this.todos
        .filter(todo => todo.id === id)
        .pop();
    }

    toggleTodoComplete(todo: Todo){
      let updatedTodo = this.updateTodoById(todo.id, {
        complete: !todo.complete
      });
      return updatedTodo;
    }
  }
  ```

13. Register service as provider in `src/app/app.component.ts` **IMPORTANT!**
  ``` TypeScript
  import { Component } from '@angular/core';
  import { TodoService } from './todo.service'; // WE NEED TO ADD THIS LINE

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [TodoService] // WE NEED TO ADD THIS LINE
  })
  export class AppComponent {
    title = 'app works!';
  }
  ```
14. Generate **Todo** component with `ng g component todo`
15. Implement **Todo** compoment class
  ```TypeScript
  import { Component, OnInit } from '@angular/core';
  import { TodoService } from '../todo.service';
  import { Todo } from '../todo';

  @Component({
    selector: 'todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
  })
  export class TodoComponent {

    newTodo: Todo = new Todo();

    constructor(private todoService: TodoService) { }

    addTodo() {
      this.todoService.addTodo(this.newTodo);
      this.newTodo = new Todo();
    }

    toggleTodoComplete(todo) {
      this.todoService.toggleTodoComplete(todo);
    }

    removeTodo(todo) {
      this.todoService.deleteTodoById(todo.id);
    }

    get todos() {
      return this.todoService.getAllTodos();
    }
  }
  ```
16. Add html code to compoment view `src/app/todo.component.html`
  
  ```html
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input 
        class="new-todo" 
        placeholder="What needs to be done?" 
        [(ngModel)]="newTodo.title" 
        (keyup.enter)="addTodo()">
    </header>
    <section class="main" *ngIf="todos.length > 0">
      <ul class="todo-list">
        <li *ngFor="let todo of todos" [class.completed]="todo.complete">
          <div class="view">
            <input class="toggle" type="checkbox" (click)="toggleTodoComplete(todo)" [checked]="todo.complete">
            <label>{{todo.title}}</label>
            <button class="destroy" (click)="removeTodo(todo)"></button>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer" *ngIf="todos.length > 0">
      <span class="todo-count"><strong>{{todos.length}}</strong> {{todos.length == 1 ? 'item' : 'items'}} left</span>
    </footer>
  </section>
  ```
17. Install todomvc css styles with `npm install --save todomvc-app-css`
19. Import installed styles to `src/styles.css`
  
  ```css
  @import '../node_modules/todomvc-app-css/index.css';
  ```
20. Embed **Todo** compoment selector in main application component view `src/app/app.component.html`
  ```html
  <todo></todo>
  ```

21. Serve your app with `ng serve`