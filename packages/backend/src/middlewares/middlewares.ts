import TodoService from '@/services/todo.service';
import { TodoType } from '@/types/todos.type';
import { Response, Request, NextFunction } from 'express';
import { prismaModels } from '../types/models.type'

interface Options {
  id?: 'string',
  userId?: 'string',
  title?: 'string',
  isPrivate?: 'boolean',
  isCompleted?: 'boolean',
}

export class Middlewares {
  constructor(private todoService: TodoService) {}

  async tryCatch(action: any): Promise<(req: Request, res: Response, next: NextFunction) => void> {
	return async function(req: Request, res: Response, next: NextFunction) {
	  try {
		await action(req, res, next) 
	  } catch (e) {
		next(e);
	  }
	}
  }

  async validator(options: Options): Promise<(req: Request, res: Response, next: NextFunction) => void> {
	return function(req: Request, res: Response, next: NextFunction) {
	  for (const key in options) {
		if (!req.body[key] || (typeof req.body[key] !== options[key as keyof Options])) {
			res.sendStatus(400);
		
		  return;
		}
	  }

	  next();
	}
  }

  async isExist(model: keyof prismaModels): Promise<(req: Request, res: Response, next: NextFunction) => void> {
	const find = this.todoService.getById;

	return async function(req: Request, res: Response, next: NextFunction): Promise<TodoType | void> {
		const { id } = req.body;
	
		const todo = await find(id, model);
	
		if (!todo) {
		  res.sendStatus(404);
	
		  return;
		}
		
		res.locals = {
		  todo,
		}
		
		next();
	  }
  }

};

const middlewares = new Middlewares(new TodoService());
export default middlewares;
