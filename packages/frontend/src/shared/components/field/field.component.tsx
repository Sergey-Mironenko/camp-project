import * as React from 'react';
import { Field, FormikErrors } from 'formik';

import { addFormErrorStyles } from './field.styles';
import classNames from 'classnames';

type Props = {
  name: string,
  type: string,
  classname?: string,
  errorClassname?: string,
  validate?: (str: string) => string | void
  errors: FormikErrors<{
    id: string;
    title: string;
    isCompleted: boolean;
    isDeleted: boolean;
}>
}

const FormField: React.FunctionComponent<Props> = ({ name, type, classname = '', validate, errors}) => {
  return (
    <>
      <Field
        className={classname}
        name={name}
        type={type}
        validate={validate}
      />

      {type !== 'checkbox'} {
        <span className={classNames(
          addFormErrorStyles()
        )}>
          {errors[name]}
        </span>
      } 
    </>      
  );
};

export default FormField;
