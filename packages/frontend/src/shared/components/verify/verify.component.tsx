import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as React from 'react';

import { verifyState } from '../../utils/formStates';
import FormField from '../field/field.component';
import { formFieldStyles } from '../todoDesctop/todoDesctop.styles';
import { formStyles } from './verify.styles';

import userSerivce from '../../services/user.service';
import { useUsersStore } from '~store/user.store';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Verify: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const setUser = useUsersStore(state => state.setUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleLogin = async (values: { email: string }) => {
    setMessage('')
    setIsLoading(true);

    try {
      await userSerivce.verifyUser({ email: values.email });

      setMessage('Email has been sent');
    } catch (error) {
        setMessage(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={verifyState}
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
                    {`Email: `}

                    <FormField
                        name="name"
                        type="text"
                        classname={classNames(
                            formFieldStyles(errors.email && touched && true)
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

export default Verify;
