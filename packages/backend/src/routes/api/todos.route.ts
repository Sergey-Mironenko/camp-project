import authMiddlewares from '@/middlewares/auth.middleware';
import { TodoType } from '@/types/todos.type';
import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import middlewares from '../../middlewares/middlewares';

const todosRouter: Router = Router();

todosRouter.post(
  '/all',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.isExist.bind(middlewares)<TodoType>,
  todoController.getAllTodo.bind(todoController)
);

todosRouter.post(
  '/find',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.validator.bind(middlewares, {id: 'string'}),
  middlewares.isExist.bind(middlewares)<TodoType>,
  todoController.getById.bind(todoController)
);

todosRouter.put(
  '/create',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.validator.bind(
    middlewares,
    {title: 'string', userId: 'string', isCompleted: 'boolean', isPrivate: 'boolean'},
  ),
  todoController.createTodo.bind(todoController)
);

todosRouter.patch(
  '/update',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.validator.bind(middlewares, {id: 'string', title: 'string', isCompleted: 'boolean'}),
  middlewares.isExist.bind(middlewares)<TodoType>,
  todoController.updateTodo.bind(todoController)
);

todosRouter.delete(
  '/delete',
  middlewares.tryCatch.bind(middlewares),
  authMiddlewares.checkAuthorization,
  middlewares.validator.bind(middlewares, {id: 'string'}),
  middlewares.isExist.bind(middlewares)<TodoType>,
  todoController.deleteTodo.bind(todoController)
);

export default todosRouter;
