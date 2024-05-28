import * as React from 'react';
import { Field } from 'formik';

import { addFormErrorStyles } from './field.styles';
import classNames from 'classnames';

type Props = {
  name: string,
  type: string,
  classname?: string,
  errorClassname?: string,
  validate?: (str: string) => string | void
  error?: string
}

const FormField: React.FunctionComponent<Props> = ({ name, type, classname = '', validate, error = '' }) => {
  return (
    <>
      <Field
        className={classname}
        name={name}
        type={type}
        validate={validate}
      />

      {type === 'title'} {
        <span className={classNames(
          addFormErrorStyles()
        )}>
          {error}
        </span>
      } 
    </>      
  );
};

export default FormField;
