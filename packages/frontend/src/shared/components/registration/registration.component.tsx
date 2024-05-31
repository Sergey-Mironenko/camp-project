import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as React from 'react';

import { registrationState } from '../../utils/formStates';
import FormField from '../field/field.component';
import { formFieldStyles } from '../todoDesctop/todoDesctop.styles';
import { formStyles } from './registration.styles';

import userSerivce from '../../services/user.service';
import { useUsersStore } from '~store/user.store';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Registration: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const setUser = useUsersStore(state => state.setUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleLogin = async (values: { name: string, email: string, password: string }) => {
    setMessage('')
    setIsLoading(true);

    try {
      const response = await userSerivce.registerUser({ name: values.name, email: values.email, password: values.password});

      setUser(response.data);
    } catch (error) {
        setMessage(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={registrationState}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form className={classNames(
             formStyles()
          )}>
            <div>
                <h2>Registration</h2>
            </div>

            <div>
                <span>
                    {`Name: `}

                    <FormField
                        name="name"
                        type="text"
                        classname={classNames(
                            formFieldStyles(errors.name && touched && true)
                        )}
                        errors={errors}
                    />
                </span>
            </div>

            <div>
                <span>
                    {`Email: `}

                    <FormField
                        name="email"
                        type="text"
                        classname={classNames(
                            formFieldStyles(errors.email && touched && true)
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

export default Registration;
