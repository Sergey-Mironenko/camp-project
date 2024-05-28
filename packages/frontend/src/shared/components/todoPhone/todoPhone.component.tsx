import * as React from 'react';
import classNames from 'classnames';

import { Formik, Form, Field } from 'formik';
import { TodoType } from '~shared/services/types';

import { rowStyles, containerStyles, buttonStyles, formStyles, rowFormStyles, fieldContainerStyles, fieldStyles, errorStyles, checkboxContainerStyles, checkboxStyles } from './todoPhone.styles';
import FormField from '../field/field.component';

import { validateTitlePhone } from '../../services/validation.service';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
  todo: TodoType,
  editingTodoId: string,
  setEditingTodoId: (id: string) => void,
  handleUpdate: (values: { id: string, title: string, isCompleted: boolean, isDeleted: boolean }) => void,
}

const TodoTabletCard: React.FunctionComponent<Props> = ({
  onTablet,
  onPhone,
  todo,
  editingTodoId,
  setEditingTodoId,
  handleUpdate,
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
              id: todo.id,
              title: todo.title,
              isCompleted: todo.isCompleted,
              isDeleted: false,
            }}
            onSubmit={handleUpdate}
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
                    <FormField
                      name="title"
                      type="text"
                      classname={classNames(
                        fieldStyles(onTablet && !onPhone, errors.title && true)
                      )}
                      validate={validateTitlePhone}
                      error={errors.title}
                    />
                  </div>
                </div>

                <div>
                  <div className={classNames(
                    checkboxContainerStyles()
                  )}>
                    <span>
                      Completed?
                    </span>

                    <FormField
                      name="completed"
                      type="checkbox"
                      classname={classNames(
                        checkboxStyles(onTablet && !onPhone)
                      )}
                    />
                  </div>

                  <div className={classNames(
                    checkboxContainerStyles()
                  )}>
                    <span>
                      Delete?
                    </span>

                    <FormField
                      name="delete"
                      type="checkbox"
                      classname={classNames(
                        checkboxStyles(onTablet && !onPhone)
                      )}
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

export default TodoTabletCard;
