import FindInDbService from '@/services/findInDb.service';
import { TodoType } from '@/types/todos.type';
import { Response, Request, NextFunction } from 'express';
import { prismaModels } from '../types/models.type';

interface Options {
  id?: 'string',
  userId?: 'string',
  title?: 'string',
  isPrivate?: 'boolean',
  isCompleted?: 'boolean',
}

export class Middlewares {
  constructor(private findInDbService: FindInDbService) {}

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
	const findExisting = this.findInDbService.getById;

	return async function(req: Request, res: Response, next: NextFunction): Promise<TodoType | void> {
		const { id } = req.body;
	
		const entity = await findExisting(id, model);
	
		if (!entity) {
		  res.sendStatus(404);
	
		  return;
		}
		
		res.locals = {
		  entity,
		}
		
		next();
	  }
  }

};

const middlewares = new Middlewares(new FindInDbService());
export default middlewares;
