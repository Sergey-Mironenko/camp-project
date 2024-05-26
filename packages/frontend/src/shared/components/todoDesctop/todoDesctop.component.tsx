import * as React from 'react';
import classNames from 'classnames';

import { Formik, Form, Field } from 'formik';
import { TodoType } from '~shared/services/types';

import { rowStyles, lastThStyles, buttonStyles, formContainerStyles, formStyles, formFieldStyles, checkboxContainerStyles, checkboxStyles, errorStyles } from './todoDesctop.styles';

type Props = {
  todo: TodoType,
  editingTodoId: string,
  setEditingTodoId: (id: string) => void,
  handleUpdate: (id: string, title: string, isCompleted: boolean, isDeleted: boolean) => void,
  validateTitle: (str: string) => string;
}

const TodoDesctopCard: React.FunctionComponent<Props> = ({
  todo,
  editingTodoId,
  setEditingTodoId,
  handleUpdate,
  validateTitle
}) => {
  return (
	<tr
      className={classNames(
        rowStyles(),
      )}
    >
      <th>{todo.userName}</th>
      <th>{todo.title}</th>
      <th>{todo.isCompleted ? 'Completed' : 'Active'}</th>
      <th>{todo.isPprivate ? 'true' : 'false'}</th>
      <th className={classNames(
        lastThStyles(),
      )}>
        {todo.userName === 'You' && (
          <button
            className={classNames(
              buttonStyles()
            )}
            disabled={editingTodoId !== null}
            onClick={() => setEditingTodoId(todo.id)}
          >
            Edit
          </button>
        )}
      </th>
      {editingTodoId === todo.id && (
        <th className={classNames(
          formContainerStyles(),
        )}>
          <Formik
            initialValues={{
              title: todo.title,
              completed: todo.isCompleted,
              delete: false,
            }}
            onSubmit={values => {
              handleUpdate(todo.id, values.title, values.completed, values.delete)
            }}
          >
            {({ errors, touched }) => (
              <Form className={classNames(
                formStyles()
              )}>
                <span>
                  {todo.userName}
                </span>

                <div>
                  <Field
                    className={classNames(
                      formFieldStyles(errors.title && touched && true)
                    )}
                    name="title"
                    type="text"
                    validate={validateTitle}
                  />

                  <span className={classNames(
                    errorStyles()
                  )}>
                    {errors.title}
                  </span>
                </div>

                <div className={classNames(
                  checkboxContainerStyles()
                )}>
                  <span>
                    Completed?
                  </span>

                  <Field
                    className={classNames(
                      checkboxStyles()
                    )}
                    name="completed"
                    type="checkbox"
                  />
                </div>

                <div className={classNames(
                  checkboxContainerStyles()
                )}>
                  <span>
                    Delete?
                  </span>

                  <Field
                    className={classNames(
                      checkboxStyles()
                    )}
                    name="delete"
                    type="checkbox"
                  />
                </div>

                <button
                  className={classNames(
                    buttonStyles()
                  )}
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </th>
      )}     
    </tr>
  );
};

export default TodoDesctopCard;
