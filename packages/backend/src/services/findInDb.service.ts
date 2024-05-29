import prisma from '../utils/db';
import { TodoType } from '@/types/todos.type';
import { prismaModels } from '../types/models.type'
import { UserType } from '@/types/user.type';
  
export default class FindInDbService {
  async getById<T>(id: string, model: keyof prismaModels): Promise<T | null> {
	const entity = await (prisma[model] as T).findUnique({
	  where: {
		id
	  }
    });
	
	if (entity) {
	  return entity;
	}
	
	return null;
  }
}
