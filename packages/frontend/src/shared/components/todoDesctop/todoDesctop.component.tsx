import * as React from 'react';
import classNames from 'classnames';

import { Formik, Form, Field } from 'formik';
import { TodoType } from '~shared/services/types';

import { rowStyles, lastThStyles, buttonStyles, formContainerStyles, formStyles, formFieldStyles, checkboxContainerStyles, checkboxStyles, errorStyles } from './todoDesctop.styles';
import FormField from '../field/field.component';

import { validateTitleDesctop } from '../../services/validation.service';

type Props = {
  todo: TodoType,
  editingTodoId: string,
  setEditingTodoId: (id: string) => void,
  handleUpdate: (values: {id: string, title: string, isCompleted: boolean, isDeleted: boolean}) => void,
}

const TodoDesctopCard: React.FunctionComponent<Props> = ({
  todo,
  editingTodoId,
  setEditingTodoId,
  handleUpdate,
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
              id: todo.id,
              title: todo.title,
              isCompleted: todo.isCompleted,
              isDeleted: false,
            }}
            onSubmit={handleUpdate}
          >
            {({ errors, touched }) => (
              <Form className={classNames(
                formStyles()
              )}>
                <span>
                  {todo.userName}
                </span>

                <div>
                  <FormField
                    name="text"
                    type="title"
                    classname={classNames(
                      formFieldStyles(errors.title && touched && true)
                    )}
                    validate={validateTitleDesctop}
                    error={errors.title}
                  />
                </div>

                <div className={classNames(
                  checkboxContainerStyles()
                )}>
                  <label>
                    Completed?

                    <FormField
                      name="completed"
                      type="checkbox"
                      classname={classNames(
                        checkboxStyles()
                      )}
                    />
                  </label>
                </div>

                <div className={classNames(
                  checkboxContainerStyles()
                )}>
                  <label>
                    Delete?

                    <FormField
                      name="delete"
                      type="checkbox"
                      classname={classNames(
                        checkboxStyles()
                      )}
                    />
                  </label>
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
