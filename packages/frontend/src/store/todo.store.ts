import { create } from 'zustand';
import { TodoType } from '~shared/services/types';

const todos = [
  {
	id: 'AAAAAA',
    userId: '1111111',
	userName: 'kljhjklkhlh',
    title: 'BBBBBB',
    isCompleted: false,
    isPprivate: false,
  },
  {
	id: 'CCCCCC',
    userId: '1111111',
	userName: 'You',
    title: 'DDDDDD',
    isCompleted: true,
    isPprivate: false,
  },
  {
	id: 'EEEEEE',
    userId: '1111111',
	userName: 'You',
    title: 'FFFFFF',
    isCompleted: false,
    isPprivate: false,
  },
  {
	id: 'EEsggEEEE',
    userId: '111ghh1111',
	userName: 'dsfdfsdfssd',
    title: 'FFFdssgFFF',
    isCompleted: false,
    isPprivate: false,
  },
  {
	id: 'EEEEgghEE',
    userId: '111hhdd1111',
	userName: 'sdfddsfsdfs',
    title: 'FFFFsssFF',
    isCompleted: true,
    isPprivate: false,
  },
  {
	id: 'EEEEEghhhE',
    userId: '111hdd1111',
	userName: 'You',
    title: 'FFFFghhhFF',
    isCompleted: false,
    isPprivate: false,
  },
  {
	id: 'EEEEgfddEE',
    userId: '11nmhh11111',
	userName: 'sdfdsfdssdf',
    title: 'FFFbnnhFFF',
    isCompleted: true,
    isPprivate: false,
  },
  {
	id: 'EEEEwrqrEE',
    userId: '1111trw111',
	userName: 'sdfsdfdsdsf',
    title: 'FFrrtFFFF',
    isCompleted: false,
    isPprivate: false,
  },
]

interface ITodoStore {
	todos: TodoType[];
	addTodo: (offset: TodoType) => () => void;
  updateTodo: (offset: TodoType) => () => void;
  deleteTodo: (id: string) => () => void;
}

export const useTodoStore = create<ITodoStore>((set) => {
  return {
	todos: todos,
	addTodo: (todo: TodoType) => {
	  return (): void => {
		set((state) => {
		  return {
        todos: [
          todo,
          ...state.todos,
        ]
		  };
		});
	  };
	},
  updateTodo: (currentTodo: TodoType) => {
    return (): void => {
      set((state) => {
        const newTodos = state.todos.map(todo => (
          todo.id === currentTodo.id
            ? {
              ...todo,
              title: currentTodo.title,
              isCompleted: currentTodo.isCompleted,
            }
            : todo));

        return {
          todos: newTodos
        };
      });
      };
  },
  deleteTodo: (id: string) => {
	  return (): void => {
		set((state) => {
      const newTodos = state.todos.filter(todo => todo.id !== id)
		  return {
        todos: newTodos,
		  };
		});
	  };
	},
  };
});
