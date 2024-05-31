import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as React from 'react';

import { loginState } from '../../utils/formStates';
import FormField from '../field/field.component';
import { formFieldStyles } from '../todoDesctop/todoDesctop.styles';
import { formStyles, resetStyles } from './login.styles';

import userSerivce from '../../services/user.service';
import { useUsersStore } from '~store/user.store';
import { NavLink } from 'react-router-dom';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const Login: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const setUser = useUsersStore(state => state.setUser);
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleLogin = async (values: { email: string, password: string }) => {
    setIsLoading(true);

    try {
      const response = await userSerivce.loginUser({ email: values.email, password: values.password});

      const { user, accessToken } = response.data;

      setUser(user);
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        setMessage(error.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        <Formik
        initialValues={loginState}
        onSubmit={handleLogin}
        >
        {({ errors, touched }) => (
            <Form className={classNames(
                formStyles()
            )}>
            <div>
                <h2>Login</h2>
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

        <NavLink
          to="/verify"
          className={classNames(
            resetStyles()
          )}
        >
          Reset password
        </NavLink>
    </>
  );
};

export default Login;
