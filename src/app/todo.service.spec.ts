/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from './todo';

describe('TodoService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TodoService]
		});
	});

	it('should return emply list by default', inject([TodoService], (service: TodoService) => {
		expect(service.getAllTodos()).toEqual([]);
	}));

	it('should return newly added todo', inject([TodoService], (service: TodoService) => {
		let todo1 = new Todo({title: 'todo1'});
		service.addTodo(todo1);
		expect(service.getAllTodos()).toEqual([todo1]);
	}));

	it('should auto-assign id when needed', inject([TodoService], (service: TodoService) => {
		let todo1 = new Todo({ title: 't1' });
		let todo2 = new Todo({ title: 't2' });
		service.addTodo(todo1);
		service.addTodo(todo2);
		expect(service.getTodoById(1)).toEqual(todo1);
		expect(service.getTodoById(2)).toEqual(todo2);
	}));

	it('should remove todo by id', inject([TodoService], (service: TodoService) => {
		let todo1 = new Todo({ title: 't1' });
		let todo2 = new Todo({ title: 't2' });
		service.addTodo(todo1);
		service.addTodo(todo2);
		expect(service.getAllTodos()).toEqual([todo1, todo2]);
		service.deleteTodoById(1);
		expect(service.getAllTodos()).toEqual([todo2]);
	}));

});
