import Modal from '../Modal/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import * as Yup from 'yup';
import Button from '../Button/Button';
import css from './Registration.module.css';
import icon from '../../../public/icons/icons.svg';

export default function Registration({ onClose }) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Required'),
  });

  const handleSubmit = (values, actions) => {
    dispatch(registerUser(values)).then(() => {
      actions.resetForm();
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={css.box}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form}>
            <div className={css.textWrapper}>
              <h1 className={css.title}>Registration</h1>
              <p className={css.text}>
                Thank you for your interest in our platform! In order to
                register, we need some information. Please provide us with the
                following information.
              </p>
            </div>
            <div className={css.inputsWrapper}>
              <div>
                <label className={css.label} htmlFor={nameId}></label>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  id={nameId}
                  placeholder="Name"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="name"
                  component="div"
                />
              </div>
              <div>
                <label className={css.label} htmlFor={emailId}></label>
                <Field
                  className={css.input}
                  type="email"
                  name="email"
                  id={emailId}
                  placeholder="Email"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="email"
                  component="div"
                />
              </div>
              <div className={css.pwdWrapper}>
                <label htmlFor={passwordId}></label>
                <Field
                  className={css.input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id={passwordId}
                  placeholder="Password"
                />

                <ErrorMessage
                  className={css.errorMessage}
                  name="password"
                  component="div"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className={css.eyeIcon} width={20} height={20}>
                      <use href={`${icon}#eye`}></use>
                    </svg>
                  ) : (
                    <svg className={css.eyeIcon} width={20} height={20}>
                      <use href={`${icon}#eye-off`}></use>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <Button>Sing Up</Button>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}
