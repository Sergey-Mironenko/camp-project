import * as React from 'react';
import { Formik, Form, Field } from 'formik';

import todoSerivce from '~shared/services/todo.service';
import { useTodoStore } from '~store/todo.store';

import {
  todoListStyles, titleStyles, addButtonStyles, addFormStyles,
  shadowStyles, tableStyles, tableHeadStyles, rowStyles,
} from './todoList.styles';
import { tabletListStyles, TabletFormErrorStyles } from './todoListGadget.styles';
import classNames from 'classnames';

import TodoGadgetCard from '../todoGadget/todoGadget.component';
import TodoDesctopCard from '../todoDesctop/todoDesctop.component';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
}

const TodoList: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const [user, setUser] = React.useState('User');
  const [editingTodoId, setEditingTodoId] = React.useState<string | null>(null);
  const [isAddingTodo, setIsAddingTodo] = React.useState<boolean>(false);
  const todos = useTodoStore(state => state.todos);
  const addTodo = useTodoStore(state => state.addTodo);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const validateTitleDesctop = (str: string) => {
    if (!str) {
      return 'Required'
    } else if (!(/^[a-zA-ZА-Яа-яЁё]*$/.test(str))) {
      return 'Letters only'
    } else if (str.length > 12) {
      return 'Too long'
    }
  };

  const validateTitlePhone = (str: string) => {
    if (!str || !(/^[a-zA-ZА-Яа-яЁё]*$/.test(str)) || str.length > 12) {
      return '!'
    }
  };

  const handleAdd = async(title: string, isCompleted: boolean, isPrivate: boolean) => {
    setIsLoading(true);

    try {
      const response = await todoSerivce.createTodo({
        title,
        userId: 'userId',
        userName: 'userName',
        isCompleted,
        isPrivate,
      });

      addTodo(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsAddingTodo(false);
      setIsLoading(false);
    } 
  };

  const handleUpdate = async(id: string, title: string, isCompleted: boolean, isDeleted: boolean) => {
    setIsLoading(true);

    try {
      if (!isDeleted) {
        const response = await todoSerivce.updateTodo({ id, title, isCompleted });

        updateTodo(response.data);
      } else {
        await todoSerivce.deleteTodo({ id });

        deleteTodo(id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEditingTodoId(null);
      setIsLoading(false);
    } 
  };

  return (
	<div className={classNames(
      todoListStyles()
    )}>
      <h1 className={classNames(
        titleStyles(onPhone)
      )}>
        {`${user}'s todos`}
      </h1>

      <div className={classNames(
        shadowStyles((editingTodoId || isAddingTodo) && true)
      )}></div>

      {isAddingTodo ? (
        <Formik
          initialValues={{
            title: '',
            completed: false,
            private: false,
          }}
          onSubmit={values => {
            handleAdd(values.title, values.completed, values.private)
          }}
        >
          {({ errors, touched }) => (
            <Form className={classNames(
              addFormStyles(onPhone, (onTablet && !onPhone), (errors.title && touched.title) && true)
            )}>
              <div>
                <label>Title:</label>
                <div>
                  <Field
                    type="text"
                    name="title"
                    validate={(!onPhone && !onTablet) ? validateTitleDesctop : validateTitlePhone}
                  />
                  <span className={classNames(
                    TabletFormErrorStyles()
                  )}>
                    {touched.title && errors.title}
                  </span>
                </div>
              </div>
  
              <div>
                <div>
                  <label>Completed:</label>
                  <Field
                    type="checkbox"
                    name="completed"
                  />
                </div>
                <div>
                  <label>Private:</label>
                  <Field
                    type="checkbox"
                    name="private"
                  />
                </div>
              </div>
  
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      ) : (
        <button
          className={classNames(
            addButtonStyles(onPhone, (onTablet && !onPhone))
          )}
          type="button"
          onClick={() => setIsAddingTodo(true)}
        >
          Lets add something to do?
        </button>
      )}

      {(onTablet || onPhone) && (
        <div className={classNames(
          tabletListStyles(onTablet && !onPhone)
        )}>
          {todos.map(todo => (
            <TodoGadgetCard
              onTablet={onTablet}
              onPhone={onPhone}
              todo={todo}
              editingTodoId={editingTodoId}
              setEditingTodoId={setEditingTodoId}
              handleUpdate={handleUpdate}
              validateTitle={validateTitlePhone}
              key={todo.id}
            />
          ))}
        </div>
      )}

      {(!onPhone && !onTablet) && (
        <table className={classNames(
          tableStyles()
        )}>
          <thead className={classNames(
            tableHeadStyles()
          )}>
            <tr className={classNames(
              rowStyles()
            )}>
              <th>Name</th>
              <th>Title</th>
              <th>Completed</th>
              <th>Private</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TodoDesctopCard
                todo={todo}
                editingTodoId={editingTodoId}
                setEditingTodoId={setEditingTodoId}
                handleUpdate={handleUpdate}
                validateTitle={validateTitleDesctop}
                key={todo.id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodoList;
