import * as React from 'react';
import classNames from 'classnames';

import { Formik, Form, Field } from 'formik';
import { TodoType } from '~shared/services/types';

import { rowStyles, containerStyles, buttonStyles, formStyles, rowFormStyles, fieldContainerStyles, fieldStyles, errorStyles, checkboxContainerStyles, checkboxStyles } from './todoGadget.styles';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
  todo: TodoType,
  editingTodoId: string,
  setEditingTodoId: (id: string) => void,
  handleUpdate: (id: string, title: string, isCompleted: boolean, isDeleted: boolean) => void,
  validateTitle: (str: string) => string;
}

const TodoGadgetCard: React.FunctionComponent<Props> = ({
  onTablet,
  onPhone,
  todo,
  editingTodoId,
  setEditingTodoId,
  handleUpdate,
  validateTitle
}) => {
  return (
	  <div
      className={classNames(
        rowStyles((onTablet && !onPhone), todo.userName === 'You')
      )}
    >
      <div>
        <div>{todo.userName === 'You' ? 'Yours' : `${todo.userName}'s`}</div>
        <div
          className={classNames(
            containerStyles(onTablet && !onPhone)
          )}
        >
          {todo.title}
        </div>
      </div>
              
      <div>
        <div>{todo.isCompleted ? 'Completed' : 'Active'}</div>
        <div
          className={classNames(
            containerStyles(onTablet && !onPhone)
          )}
        >
          {todo.isPprivate ? 'Private' : 'Free'}
        </div>
      </div>

      {todo.userName === 'You' && (
        <button
          className={classNames(
            buttonStyles((onTablet && !onPhone))
          )}
          disabled={editingTodoId !== null}
          onClick={() => setEditingTodoId(todo.id)}
        >
          Edit
        </button>
      )}

      {editingTodoId === todo.id && (
        <div className={classNames(
          formStyles(onTablet && !onPhone)
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
                rowFormStyles(onTablet && !onPhone)
              )}>
                <div>
                  <span>
                    {todo.userName === 'You' ? 'Yours' : todo.userName}
                  </span>

                  <div className={classNames(
                    fieldContainerStyles(onTablet && !onPhone)
                  )}>
                    <Field
                      className={classNames(
                        fieldStyles(onTablet && !onPhone, errors.title && true)
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
                </div>

                <div>
                  <div className={classNames(
                    checkboxContainerStyles()
                  )}>
                    <span>
                      Completed?
                    </span>

                    <Field
                      className={classNames(
                        checkboxStyles(onTablet && !onPhone)
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
                        checkboxStyles(onTablet && !onPhone)
                      )}
                      name="delete"
                      type="checkbox"
                    />
                  </div>
                </div>

                <button
                  className={classNames(
                    buttonStyles(onTablet && !onPhone)
                  )}
                  type="submit"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default TodoGadgetCard;
