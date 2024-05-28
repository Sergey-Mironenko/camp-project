import { HttpSerivce } from './http.service';

class TodoService extends HttpSerivce {
  constructor() {
    super();
  }

  getAllTodos() {
    return this.get({
      url: 'all',
    })
  }

  getTodoById(fields) {
    return this.post({
      url: 'get',
    })
  }

  createTodo(fields) {
    return this.put({
      url: 'create',
      data: {...fields},
    })
  }

  updateTodo(fields) {
    return this.patch({
      url: 'update',
      data: {...fields},
    })
  }

  deleteTodo(fields) {
    return this.delete({
      url: 'delete',
      data: {...fields},
    })
  }
}

export const todoSerivce = new TodoService();
export default todoSerivce;
