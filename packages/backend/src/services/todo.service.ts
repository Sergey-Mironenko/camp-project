import prisma from '../utils/db';
import { TodoType } from '@/types/todos.type';
import { prismaModels } from '../types/models.type'
  
export default class TodoService {
  async findAll(): Promise<string> {
	return 'Todos';
  }

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

  async addTodo(title: string, userId: string, isCompleted: boolean, isPprivate: boolean): Promise<TodoType | null> {
	const newTodo = await prisma.todo.create({
	  data: {
		title,
	    userId,
	    isCompleted,
	    isPprivate,
	  },
	});

	return newTodo;
  };

  async updateTodo(id: string, title: string, isCompleted: boolean): Promise<TodoType | null> {
	const newTodo = await prisma.todo.update({
	  where: {
		id
	  },
	  data: {
        title,
		isCompleted,
	  }
	});

	return newTodo;
  };

  async deleteTodo(id: string): Promise<TodoType | null> {
	const newTodo = await prisma.todo.delete({
	  where: {
		id
	  },
	});

	return newTodo;
  };
}
