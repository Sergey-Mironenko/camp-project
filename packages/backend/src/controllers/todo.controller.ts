import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response): Promise<void> {

	const todos = await this.todoService.findAll();

	res.send(todos);
  }

  async getById(_: Request, res: Response): Promise<void> {	
	const { todo } = res.locals;

	res.send(todo);
  }

  async createTodo(req: Request, res: Response): Promise<void> {
	const { title, userId, isCompleted, isPrivate = false } = req.body;

	const newTodo = await this.todoService.addTodo(title, userId, isCompleted, isPrivate);

	res.send(newTodo);
  }

  async updateTodo(req: Request, res: Response): Promise<void> {
	const { id, title, isCompleted } = req.body;

	const updatedTodo = await this.todoService.updateTodo(id, title, isCompleted);

	res.send(updatedTodo);
  }

  async deleteTodo(req: Request, res: Response): Promise<void> {
	const { id } = req.body;

	const updatedTodo = await this.todoService.deleteTodo(id);

	res.send(updatedTodo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
