import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as React from 'react';

import { changeData } from '../../utils/formStates';
import FormField from '../field/field.component';
import { formFieldStyles } from '../todoDesctop/todoDesctop.styles';
import { formStyles } from './changePassword.styles';

import userSerivce from '../../services/user.service';
import { useUsersStore } from '~store/user.store';

type Props = {
  onTablet: boolean,
  onPhone: boolean,
};

const ChangePaswword: React.FunctionComponent<Props> = ({ onTablet, onPhone }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const user = useUsersStore(state => state.user);
  const changeName = async (values: { name: string, password: string }) => {
    setIsLoading(true);

    try {
      await userSerivce.changeData({ id: user.id, name: user.name, password: values.name });

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
        initialValues={changeData}
        onSubmit={changeName}
      >
        {({ errors, touched }) => (
            <Form className={classNames(
                formStyles()
            )}>
            <div>
                <h2>Change password</h2>
            </div>

            <div>
                <span>
                    {`New password: `}

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

export default ChangePaswword;
