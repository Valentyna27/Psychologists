import Modal from '../Modal/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import * as Yup from 'yup';
import Button from '../Button/Button';
import css from './LogIn.module.css';
import icon from '../../../public/icons/icons.svg';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function LogIn({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const emailId = useId();
  const passwordId = useId();

  const initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (isLoggedIn) {
      onClose();
    }
  }, [isLoggedIn, onClose]);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Required'),
  });

  const handleSubmit = async values => {
    dispatch(loginUser(values));
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.textWrapper}>
            <h1 className={css.title}>Log In</h1>
            <p className={css.text}>
              Welcome back! Please enter your credentials to access your account
              and continue your search for a psychologist.
            </p>
          </div>
          <div className={css.inputsWrapper}>
            <div className={css.emailWrapper}>
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

          <Button>Log In</Button>
        </Form>
      </Formik>
    </Modal>
  );
}
