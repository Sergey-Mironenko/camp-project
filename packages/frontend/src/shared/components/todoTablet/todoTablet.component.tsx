import * as React from 'react';
import classNames from 'classnames';

import { Formik, Form } from 'formik';
import { TodoType } from '~shared/services/types';

import { cardStyles, buttonStyles, formStyles, rowFormStyles, fieldStyles, checkboxStyles, errorContainerStyles } from './todoTablet.styles';
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
        cardStyles()
      )}
    >
      <div>
        <div>{todo.userName === 'You' ? 'Yours' : `${todo.userName}'s`}</div>
  
        <div>
          {todo.title}
        </div>
                
        <div>
          <div>{todo.isCompleted ? 'Completed' : 'Active'}</div>
          <div>
            {todo.isPprivate ? 'Private' : 'Free'}
          </div>
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

              <span className={classNames(
                rowFormStyles()
              )}>
                {todo.userName === 'You' ? 'Yours' : todo.userName}
              </span>

              <label className={classNames(
                errorContainerStyles()
              )}>
                <FormField
                  name="title"
                  type="text"
                  validate={validateTitlePhone}
                  classname={classNames(
                    fieldStyles(onTablet && !onPhone, errors.title && true)
                  )}
                  errors={errors}
                />
              </label>

              <div className={classNames(
                  rowFormStyles()
                )}>
                <div className={classNames(
                  rowFormStyles()
                )}>
                  <label>
                    Completed?

                    <FormField
                      name="completed"
                      type="checkbox"
                      classname={classNames(
                        checkboxStyles()
                      )}
                      errors={errors}
                    />
                  </label> 
                </div>

                <div className={classNames(
                  rowFormStyles()
                )}>
                  <label>
                    Delete?

                    <FormField
                      name="delete"
                      type="checkbox"
                      classname={classNames(
                        checkboxStyles()
                      )}
                      errors={errors}
                    />
                  </label>    
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
      )}
    </div>
  );
};

export default TodoTabletCard;
