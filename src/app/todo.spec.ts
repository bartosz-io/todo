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