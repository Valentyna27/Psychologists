import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logoutUser } from '../../redux/auth/operations';
import { clearFavorites } from '../../redux/favorites/slice';
import icon from '../../../public/icons/icons.svg';
import css from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearFavorites());
  };

  return (
    <div className={css.userMenu}>
      <div className={css.userBox}>
        <div className={css.box}>
          <svg className={css.userIcon} width={24} height={24}>
            <use href={`${icon}#person`}></use>
          </svg>
        </div>
        <p className={css.userName}>{user.displayName}</p>
      </div>
      <button className={css.btn} type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
