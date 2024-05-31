import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as React from 'react';

import { resetState } from '../../utils/formStates';
import FormField from '../field/field.component';
import { formFieldStyles } from '../todoDesctop/todoDesctop.styles';
import { formStyles } from './reset.styles';

import userSerivce from '../../services/user.service';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Reset: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleLogin = async (values: { password: string, repeatedPassword: string }) => {
    setIsLoading(true);

    try {
      await userSerivce.resetUser({ password: values.password, repeatedPassword: values.repeatedPassword });

      setMessage('Successfully reseted')
    } catch (error) {
        setMessage(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <Formik
        initialValues={resetState}
        onSubmit={handleLogin}
        >
        {({ errors, touched }) => (
            <Form className={classNames(
                formStyles()
            )}>
            <div>
                <h2>Reset</h2>
            </div>

            <div>
                <span>
                    {`Password: `}

                    <FormField
                    name="password"
                    type="password"
                    classname={classNames(
                        formFieldStyles(errors.password && touched && true)
                    )}
                    errors={errors}
                    />
                </span>
            </div>

            <div>
                <span>
                    {`Password: `}

                    <FormField
                    name="password"
                    type="password"
                    classname={classNames(
                        formFieldStyles(errors.password && touched && true)
                    )}
                    errors={errors}
                    />
                </span>
            </div>

            <button
                type="submit"
            >
                Submit
            </button>

              {message && (
                <div>{message}</div>
              )}
            </Form>
        )}
        </Formik>
    </>
  );
};

export default Reset;
