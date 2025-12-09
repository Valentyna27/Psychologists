import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import Modal from '../Modal/Modal';
import TimeModal from '../TimeModal/TimeModal';
import icon from '../../../public/icons/icons.svg';
import css from './MakeAppointment.module.css';

export default function MakeAppointment({ onClose, name, photo }) {
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const nameId = useId();
  const phoneId = useId();
  const timeId = useId();
  const emailId = useId();
  const commentId = useId();

  const initialValues = {
    name: '',
    phone: '',
    time: '',
    email: '',
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Required'),
    phone: Yup.number()
      .min(3, 'Phone must be at least 3 characters')
      .typeError('Phone must be a number')
      .required('Required'),
    time: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    comment: Yup.string().required('Required'),
  });

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log(values);
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className={css.wrapper}>
        <div className={css.textBtnWrapper}>
          <h1 className={css.title}>
            Make an appointment with a psychologists
          </h1>
          <p className={css.text}>
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>
        <div className={css.doctorCard}>
          <div>
            <img className={css.doctorImg} src={photo} alt="photoOfADoctor" />
          </div>
          <div className={css.doctorTextWrapper}>
            <p className={css.yourPsText}>Your psychologists</p>
            <p className={css.doctorName}>{name}</p>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form>
              <div className={css.formInputsWrapper}>
                <div className={css.inputWrapper}>
                  <label htmlFor={nameId}></label>
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
                <div className={css.phoneAndTimeWrapper}>
                  <div className={css.inputWrapper}>
                    <label htmlFor={phoneId}></label>
                    <Field
                      className={css.phoneInput}
                      name="phone"
                      id={phoneId}
                      placeholder="+380"
                    />
                    <ErrorMessage
                      className={css.errorMessage}
                      name="phone"
                      component="div"
                    />
                  </div>
                  <div className={css.inputWrapper}>
                    <label htmlFor={timeId}></label>
                    <Field
                      className={css.timeInput}
                      name="time"
                      id={timeId}
                      placeholder="00:00"
                      readOnly
                      onClick={() => setIsTimeModalOpen(true)}
                    />
                    <svg className={css.icon} width={20} height={20}>
                      <use href={`${icon}#clock`}></use>
                    </svg>
                    <ErrorMessage
                      className={css.errorMessage}
                      name="time"
                      component="div"
                    />
                    {isTimeModalOpen && (
                      <div className={css.timeModalWrapper}>
                        <TimeModal
                          onSelect={time => {
                            setFieldValue('time', time);
                            setIsTimeModalOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className={css.inputWrapper}>
                  <label htmlFor={emailId}></label>
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
                <div className={css.textareaWrapper}>
                  <label htmlFor={commentId}></label>
                  <Field
                    as="textarea"
                    className={css.textarea}
                    name="comment"
                    id={commentId}
                    placeholder="Comment"
                  />
                  <ErrorMessage
                    className={css.errorMessage}
                    name="comment"
                    component="div"
                  />
                </div>
              </div>

              <button
                className={`${css.formBtn} ${
                  isSubmitting ? css.sendingBtn : ''
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
