import prisma from '../utils/db';
import { TodoType } from '@/types/todos.type';
import { prismaModels } from '../types/models.type'
  
export default class FindInDbService {
  async getById(id: string, model: keyof prismaModels): Promise<TodoType | null> {
	const todo = await prisma[model].findUnique({
	  where: {
		id
	  }
    });
	
	if (todo) {
	  return todo;
	}
	
	return null;
  }
}
