import LogIn from '../LogIn/LogIn';
import Registration from '../Registration/Registration';
import { useState } from 'react';

import css from './AuthNav.module.css';

export default function AuthNav() {
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  return (
    <div className={css.btnsWrapper}>
      <button
        className={css.logBtn}
        type="button"
        onClick={() => setIsLogInModalOpen(true)}
      >
        Log In
      </button>
      <button
        className={css.regisBtn}
        type="button"
        onClick={() => setIsRegistrationModalOpen(true)}
      >
        Registration
      </button>

      {isLogInModalOpen && <LogIn onClose={() => setIsLogInModalOpen(false)} />}

      {isRegistrationModalOpen && (
        <Registration onClose={() => setIsRegistrationModalOpen(false)} />
      )}
    </div>
  );
}
